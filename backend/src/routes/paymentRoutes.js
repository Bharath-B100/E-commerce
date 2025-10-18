const express = require('express');
const {
    createRazorpayOrder,
    verifyRazorpayPayment,
    createStripePaymentIntent,
    confirmStripePayment
} = require('../controllers/paymentController');
const { isAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

// Razorpay routes
router.post('/razorpay/create-order', isAuthenticated, createRazorpayOrder);
router.post('/razorpay/verify', isAuthenticated, verifyRazorpayPayment);

// Stripe routes
router.post('/stripe/create-payment-intent', isAuthenticated, createStripePaymentIntent);
router.post('/stripe/confirm', isAuthenticated, confirmStripePayment);

module.exports = router;