const { body } = require('express-validator');

exports.createOrderValidation = [
    body('shippingAddress.street')
        .notEmpty()
        .withMessage('Street address is required'),
    
    body('shippingAddress.city')
        .notEmpty()
        .withMessage('City is required'),
    
    body('shippingAddress.state')
        .notEmpty()
        .withMessage('State is required'),
    
    body('shippingAddress.zipCode')
        .notEmpty()
        .withMessage('Zip code is required'),
    
    body('paymentMethod')
        .isIn(['cod', 'razorpay', 'stripe', 'paypal'])
        .withMessage('Invalid payment method')
];

exports.updateOrderStatusValidation = [
    body('status')
        .isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'])
        .withMessage('Invalid order status')
];