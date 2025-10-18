const express = require('express');
const {
    getDashboardStats,
    getSalesAnalytics,
    getTopProducts,
    getUserStats
} = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(isAuthenticated, isAdmin);

router.get('/dashboard/stats', getDashboardStats);
router.get('/analytics/sales', getSalesAnalytics);
router.get('/analytics/top-products', getTopProducts);
router.get('/analytics/user-stats', getUserStats);

module.exports = router;