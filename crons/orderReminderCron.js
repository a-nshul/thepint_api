const cron = require('node-cron');
const Order = require('../models/orderModel'); 
const sendEmail = require('../utils/emailService');

// Define the order reminder cron job
cron.schedule('0 12 * * *', async () => {
  console.log('Running order reminder cron job at 12:00 PM...');

  try {
    // Fetch pending orders
    const pendingOrders = await Order.find({ status: 'Pending' });
    
    if (pendingOrders.length) {
      pendingOrders.forEach((order) => {
        console.log(`Sending reminder for order: ${order._id}`);
        sendEmail(
          order.customerEmail,
          'Order Reminder',
          `Dear ${order.customerName},\n\nYour order with ID ${order._id} is still pending. Please complete your payment to proceed.\n\nThank you!`
        );
      });
    } else {
      console.log('No pending orders to remind.');
    }
  } catch (error) {
    console.error('Error in order reminder cron job:', error);
  }
});

console.log('Order reminder cron job initialized.');
