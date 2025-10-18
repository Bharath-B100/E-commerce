const Razorpay = require('razorpay');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay order
exports.createRazorpayOrder = async (amount, currency = 'INR') => {
    try {
        const options = {
            amount: amount * 100, // amount in paise
            currency,
            receipt: `receipt_${Date.now()}`
        };
        
        const order = await razorpay.orders.create(options);
        return order;
    } catch (error) {
        throw new Error(`Razorpay order creation failed: ${error.message}`);
    }
};

// Verify Razorpay payment
exports.verifyRazorpayPayment = async (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
    try {
        const crypto = require('crypto');
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generated_signature = hmac.digest('hex');
        
        return generated_signature === razorpay_signature;
    } catch (error) {
        throw new Error(`Razorpay payment verification failed: ${error.message}`);
    }
};

// Create Stripe payment intent
exports.createStripePaymentIntent = async (amount, currency = 'inr') => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // amount in cents
            currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        
        return paymentIntent;
    } catch (error) {
        throw new Error(`Stripe payment intent creation failed: ${error.message}`);
    }
};

// Verify Stripe payment
exports.verifyStripePayment = async (paymentIntentId) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        return paymentIntent.status === 'succeeded';
    } catch (error) {
        throw new Error(`Stripe payment verification failed: ${error.message}`);
    }
};