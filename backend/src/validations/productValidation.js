const { body } = require('express-validator');

exports.createProductValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Product name is required')
        .isLength({ max: 100 })
        .withMessage('Product name cannot exceed 100 characters'),
    
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Product description is required'),
    
    body('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    
    body('stock')
        .isInt({ min: 0 })
        .withMessage('Stock must be a non-negative integer'),
    
    body('category')
        .notEmpty()
        .withMessage('Category is required')
        .isMongoId()
        .withMessage('Invalid category ID')
];

exports.updateProductValidation = [
    body('name')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Product name cannot exceed 100 characters'),
    
    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    
    body('stock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Stock must be a non-negative integer'),
    
    body('category')
        .optional()
        .isMongoId()
        .withMessage('Invalid category ID')
];