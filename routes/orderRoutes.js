const express = require('express');
const router = express.Router();
const {
    createOrder,
    getAllOrder,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const {
    createOrderValidation,
    updateOrderValidation,
    deleteOrderValidation,
} = require('../validations/orderValidation');

// Route to create a new product (requires authentication and validation)
router.post('/create', protect, validate(createOrderValidation), createOrder);

// Route to get all products (with optional filters)
router.get('/', protect, getAllOrder);

// Route to update a product (requires authentication and validation)
router.put('/:id', protect, validate(updateOrderValidation), updateOrder);

// Route to delete a product (requires authentication and validation)
router.delete('/:id', protect, validate(deleteOrderValidation), deleteOrder);

module.exports = router;
