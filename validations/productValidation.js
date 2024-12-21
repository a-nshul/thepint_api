const Joi = require('joi');

// Create Product Validation
const createProductValidation = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Product name is required.',
        'any.required': 'Product name is required.',
    }),
    description: Joi.string().allow('').messages({
        'string.base': 'Description must be a string.',
    }),
    price: Joi.number().required().messages({
        'number.base': 'Price must be a number.',
        'any.required': 'Price is required.',
    }),
    stock: Joi.number().required().messages({
        'number.base': 'Stock must be a number.',
        'any.required': 'Stock is required.',
    }),
});

// Update Product Validation (ID included for validation)
const updateProductValidation = Joi.object({
    id: Joi.string().required().messages({
        'string.base': 'Product ID must be a string.',
        'any.required': 'Product ID is required for updating.',
    }),
    price: Joi.number().messages({
        'number.base': 'Price must be a number.',
    }),
    stock: Joi.number().messages({
        'number.base': 'Stock must be a number.',
    }),
    description: Joi.string().allow('').messages({
        'string.base': 'Description must be a string.',
    }),
}).or('price', 'stock', 'description').messages({
    'object.missing': 'At least one field (price, stock, or description) must be updated.',
});

// Delete Product Validation
const deleteProductValidation = Joi.object({
    id: Joi.string().required().messages({
        'string.base': 'Product ID must be a string.',
        'any.required': 'Product ID is required for deletion.',
    }),
});

module.exports = { createProductValidation, updateProductValidation, deleteProductValidation };
