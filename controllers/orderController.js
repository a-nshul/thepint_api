const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { user, products, status } = req.body;

    // Validate products
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: 'Products must be a non-empty array' });
    }

    for (const item of products) {
      if (!item.product || !item.quantity || typeof item.quantity !== 'number') {
        return res.status(400).json({
          success: false,
          message: 'Each product must include "product" (ObjectId) and "quantity" (number)',
        });
      }

      // Check stock availability
      const product = await Product.findById(item.product);
      if (!product || product.isDeleted) {
        return res.status(404).json({ success: false, message: 'Product not found or deleted' });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product ${product.name}`,
        });
      }
    }

    // Deduct stock
    for (const item of products) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    // Create order
    const newOrder = await Order.create({ user, products, status });
    const populatedOrder = await newOrder.populate([
      { path: 'user', select: 'name email' },
      { path: 'products.product', select: 'name price stock' },
    ]);

    res.status(201).json({ success: true, message: 'Order created successfully', data: populatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating order', error: error.message });
  }
};

// Get all orders
const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({ path: 'user', select: 'name email' })
      .populate({ path: 'products.product', select: 'name price stock' });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching orders', error: error.message });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { products, status } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // If products are updated, validate and adjust stock
    if (products) {
      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ success: false, message: 'Products must be a non-empty array' });
      }

      for (const item of products) {
        if (!item.product || !item.quantity || typeof item.quantity !== 'number') {
          return res.status(400).json({
            success: false,
            message: 'Each product must include "product" (ObjectId) and "quantity" (number)',
          });
        }

        const product = await Product.findById(item.product);
        if (!product || product.isDeleted) {
          return res.status(404).json({ success: false, message: 'Product not found or deleted' });
        }

        if (product.stock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for product ${product.name}`,
          });
        }
      }

      // Revert previous stock changes
      for (const item of order.products) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } });
      }

      // Deduct new stock
      for (const item of products) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
      }

      order.products = products;
    }

    if (status) order.status = status;

    const updatedOrder = await order.save();
    const populatedOrder = await updatedOrder.populate([
      { path: 'user', select: 'name email' },
      { path: 'products.product', select: 'name price stock' },
    ]);

    res.status(200).json({ success: true, message: 'Order updated successfully', data: populatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating order', error: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Revert stock changes
    for (const item of order.products) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } });
    }

    await order.remove();
    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting order', error: error.message });
  }
};

module.exports = { createOrder, getAllOrder, updateOrder, deleteOrder };
