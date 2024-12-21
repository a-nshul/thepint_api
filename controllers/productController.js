const Product = require('../models/productModel');

// Create Product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, product,message:'Product created successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, updatedProduct,message:"product updated successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const { search, minPrice, maxPrice, stockAvailable } = req.query;
        const query = {};

        if (search) query.name = { $regex: search, $options: 'i' };
        if (minPrice) query.price = { $gte: minPrice };
        if (maxPrice) query.price = { ...query.price, $lte: maxPrice };
        if (stockAvailable) query.stock = { $gte: 1 };

        const products = await Product.find(query);
        res.json({ success: true, products });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { createProduct, updateProduct, getAllProducts, deleteProduct };