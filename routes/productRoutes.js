const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const {
    createProductValidation,
    updateProductValidation,
    deleteProductValidation,
} = require('../validations/productValidation');

// Route to create a new product (requires authentication and validation)
router.post('/create', protect, validate(createProductValidation), createProduct);

// Route to get all products (with optional filters)
router.get('/', protect, getAllProducts);

// Route to update a product (requires authentication and validation)
router.put('/:id', protect, validate(updateProductValidation), updateProduct);

// Route to delete a product (requires authentication and validation)
router.delete('/:id', protect, validate(deleteProductValidation), deleteProduct);

module.exports = router;
