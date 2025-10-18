const express = require('express');
const {
    createOrder,
    getOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder
} = require('../controllers/orderController');
const {
    createOrderValidation,
    updateOrderStatusValidation
} = require('../validations/orderValidation');
const { validate } = require('../middleware/validationMiddleware');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// User routes
router.post('/', isAuthenticated, createOrderValidation, validate, createOrder);
router.get('/my-orders', isAuthenticated, getMyOrders);
router.get('/:id', isAuthenticated, getOrder);
router.put('/:id/cancel', isAuthenticated, cancelOrder);

// Admin routes
router.get('/', isAuthenticated, isAdmin, getAllOrders);
router.put('/:id/status', isAuthenticated, isAdmin, updateOrderStatusValidation, validate, updateOrderStatus);

module.exports = router;