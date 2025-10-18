module.exports = {
    ROLES: {
        USER: 'user',
        ADMIN: 'admin'
    },
    ORDER_STATUS: {
        PENDING: 'pending',
        CONFIRMED: 'confirmed',
        PROCESSING: 'processing',
        SHIPPED: 'shipped',
        DELIVERED: 'delivered',
        CANCELLED: 'cancelled'
    },
    PAYMENT_METHODS: {
        COD: 'cod',
        RAZORPAY: 'razorpay',
        STRIPE: 'stripe',
        PAYPAL: 'paypal'
    },
    PAYMENT_STATUS: {
        PENDING: 'pending',
        COMPLETED: 'completed',
        FAILED: 'failed',
        REFUNDED: 'refunded'
    }
};  