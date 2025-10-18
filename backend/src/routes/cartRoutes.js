const express = require('express');
const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} = require('../controllers/cartController');
const { isAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', isAuthenticated, getCart);
router.post('/items', isAuthenticated, addToCart);
router.put('/items/:itemId', isAuthenticated, updateCartItem);
router.delete('/items/:itemId', isAuthenticated, removeFromCart);
router.delete('/', isAuthenticated, clearCart);

module.exports = router;