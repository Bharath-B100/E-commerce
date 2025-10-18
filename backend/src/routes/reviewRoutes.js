const express = require('express');
const {
    getProductReviews,
    updateReview,
    deleteReview,
    getRecentReviews
} = require('../controllers/reviewController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/product/:productId', getProductReviews);
router.get('/recent', getRecentReviews);

// Protected routes
router.put('/:id', isAuthenticated, updateReview);
router.delete('/:id', isAuthenticated, deleteReview);

module.exports = router;