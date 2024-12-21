const Joi = require('joi');

// Validation for creating a new order
const createOrderValidation = Joi.object({
  user: Joi.string().required().messages({
    "any.required": "User is required",
    "string.empty": "User cannot be empty",
  }),
  products: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required().messages({
          "any.required": "Product ID is required",
          "string.empty": "Product ID cannot be empty",
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          "any.required": "Quantity is required",
          "number.base": "Quantity must be a number",
          "number.min": "Quantity must be at least 1",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "At least one product is required",
    }),
  status: Joi.string()
    .valid("Pending", "Processing", "Shipped", "Delivered", "Cancelled")
    .optional(),
});

// Validation for updating an order
const updateOrderValidation = Joi.object({
  status: Joi.string()
    .valid("Pending", "Processing", "Shipped", "Delivered", "Cancelled")
    .required()
    .messages({
      "any.required": "Status is required",
      "string.empty": "Status cannot be empty",
    }),
});

// Validation for deleting an order
const deleteOrderValidation = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Order ID is required",
    "string.empty": "Order ID cannot be empty",
  }),
});

module.exports = {
  createOrderValidation,
  updateOrderValidation,
  deleteOrderValidation,
};
