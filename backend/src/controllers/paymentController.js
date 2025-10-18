const Order = require('../models/Order');
const { asyncHandler } = require('../middleware/validationMiddleware');
const { createRazorpayOrder, verifyRazorpayPayment, createStripePaymentIntent, verifyStripePayment } = require('../utils/paymentHelpers');

// @desc    Create Razorpay order
// @route   POST /api/payments/razorpay/create-order
// @access  Private
exports.createRazorpayOrder = asyncHandler(async (req, res) => {
    const { amount, orderId } = req.body;

    if (!amount || !orderId) {
        return res.status(400).json({
            success: false,
            message: 'Amount and order ID are required'
        });
    }

    // Verify order exists and belongs to user
    const order = await Order.findOne({
        _id: orderId,
        user: req.user.id
    });

    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found'
        });
    }

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder(amount);

    res.json({
        success: true,
        order: razorpayOrder
    });
});

// @desc    Verify Razorpay payment
// @route   POST /api/payments/razorpay/verify
// @access  Private
exports.verifyRazorpayPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // Verify payment
    const isValid = await verifyRazorpayPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (!isValid) {
        return res.status(400).json({
            success: false,
            message: 'Payment verification failed'
        });
    }

    // Update order payment status
    const order = await Order.findByIdAndUpdate(
        orderId,
        {
            paymentStatus: 'completed',
            paymentResult: {
                id: razorpay_payment_id,
                status: 'completed',
                update_time: Date.now()
            }
        },
        { new: true }
    );

    res.json({
        success: true,
        message: 'Payment verified successfully',
        order
    });
});

// @desc    Create Stripe payment intent
// @route   POST /api/payments/stripe/create-payment-intent
// @access  Private
exports.createStripePaymentIntent = asyncHandler(async (req, res) => {
    const { amount, orderId } = req.body;

    if (!amount || !orderId) {
        return res.status(400).json({
            success: false,
            message: 'Amount and order ID are required'
        });
    }

    // Verify order exists and belongs to user
    const order = await Order.findOne({
        _id: orderId,
        user: req.user.id
    });

    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found'
        });
    }

    // Create Stripe payment intent
    const paymentIntent = await createStripePaymentIntent(amount);

    res.json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
    });
});

// @desc    Confirm Stripe payment
// @route   POST /api/payments/stripe/confirm
// @access  Private
exports.confirmStripePayment = asyncHandler(async (req, res) => {
    const { paymentIntentId, orderId } = req.body;

    // Verify payment
    const isValid = await verifyStripePayment(paymentIntentId);

    if (!isValid) {
        return res.status(400).json({
            success: false,
            message: 'Payment verification failed'
        });
    }

    // Update order payment status
    const order = await Order.findByIdAndUpdate(
        orderId,
        {
            paymentStatus: 'completed',
            paymentResult: {
                id: paymentIntentId,
                status: 'completed',
                update_time: Date.now()
            }
        },
        { new: true }
    );

    res.json({
        success: true,
        message: 'Payment confirmed successfully',
        order
    });
});