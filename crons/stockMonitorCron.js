const cron = require('node-cron');
const Product = require('../models/productModel');
const sendNotification = require('../utils/notificationService');

// Define the stock monitoring cron job
cron.schedule('0 9 * * *', async () => {
  console.log('Running stock monitor cron job at 9:00 AM...');

  try {
    // Fetch products with stock below the threshold
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } });
    
    if (lowStockProducts.length) {
      lowStockProducts.forEach((product) => {
        console.log(`Low stock alert for product: ${product.name}, Stock: ${product.stock}`);
        sendNotification(
          'admin@example.com', 
          'Low Stock Alert', 
          `The stock for ${product.name} is critically low (${product.stock}).`
        );
      });
    } else {
      console.log('No products with low stock.');
    }
  } catch (error) {
    console.error('Error in stock monitor cron job:', error);
  }
});

console.log('Stock monitor cron job initialized.');
