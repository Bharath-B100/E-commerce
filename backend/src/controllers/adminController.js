const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/Category');
const { asyncHandler } = require('../middleware/validationMiddleware');

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard/stats
// @access  Private/Admin
exports.getDashboardStats = asyncHandler(async (req, res) => {
    const [
        totalUsers,
        totalProducts,
        totalOrders,
        totalCategories,
        recentOrders,
        lowStockProducts
    ] = await Promise.all([
        User.countDocuments(),
        Product.countDocuments(),
        Order.countDocuments(),
        Category.countDocuments(),
        Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name'),
        Product.find({ stock: { $lt: 10 } }).limit(5)
    ]);

    // Calculate total revenue
    const revenueResult = await Order.aggregate([
        {
            $match: {
                paymentStatus: 'completed',
                orderStatus: { $ne: 'cancelled' }
            }
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' }
            }
        }
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    res.json({
        success: true,
        stats: {
            totalUsers,
            totalProducts,
            totalOrders,
            totalCategories,
            totalRevenue,
            recentOrders: recentOrders.length,
            lowStockProducts: lowStockProducts.length
        },
        recentOrders,
        lowStockProducts
    });
});

// @desc    Get sales analytics
// @route   GET /api/admin/analytics/sales
// @access  Private/Admin
exports.getSalesAnalytics = asyncHandler(async (req, res) => {
    const { period = 'month' } = req.query; // day, week, month, year

    let groupByFormat, dateFilter;

    // Set date range and group format based on period
    const now = new Date();
    switch (period) {
        case 'day':
            dateFilter = new Date(now.setDate(now.getDate() - 30)); // Last 30 days
            groupByFormat = '%Y-%m-%d';
            break;
        case 'week':
            dateFilter = new Date(now.setDate(now.getDate() - 90)); // Last 90 days
            groupByFormat = '%Y-%U';
            break;
        case 'month':
            dateFilter = new Date(now.setFullYear(now.getFullYear() - 1)); // Last 12 months
            groupByFormat = '%Y-%m';
            break;
        case 'year':
            dateFilter = new Date(now.setFullYear(now.getFullYear() - 5)); // Last 5 years
            groupByFormat = '%Y';
            break;
        default:
            dateFilter = new Date(now.setFullYear(now.getFullYear() - 1));
            groupByFormat = '%Y-%m';
    }

    const salesData = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: dateFilter },
                paymentStatus: 'completed',
                orderStatus: { $ne: 'cancelled' }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: groupByFormat,
                        date: '$createdAt'
                    }
                },
                totalSales: { $sum: '$totalPrice' },
                orderCount: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);

    const orderStatusStats = await Order.aggregate([
        {
            $group: {
                _id: '$orderStatus',
                count: { $sum: 1 }
            }
        }
    ]);

    res.json({
        success: true,
        salesData,
        orderStatusStats
    });
});

// @desc    Get top products
// @route   GET /api/admin/analytics/top-products
// @access  Private/Admin
exports.getTopProducts = asyncHandler(async (req, res) => {
    const { limit = 10 } = req.query;

    const topProducts = await Order.aggregate([
        {
            $match: {
                paymentStatus: 'completed',
                orderStatus: { $ne: 'cancelled' }
            }
        },
        { $unwind: '$items' },
        {
            $group: {
                _id: '$items.product',
                totalSold: { $sum: '$items.quantity' },
                totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: '_id',
                as: 'product'
            }
        },
        {
            $unwind: '$product'
        },
        {
            $project: {
                _id: 1,
                name: '$product.name',
                image: { $arrayElemAt: ['$product.images.url', 0] },
                totalSold: 1,
                totalRevenue: 1
            }
        },
        {
            $sort: { totalSold: -1 }
        },
        {
            $limit: parseInt(limit)
        }
    ]);

    res.json({
        success: true,
        topProducts
    });
});

// @desc    Get user statistics
// @route   GET /api/admin/analytics/user-stats
// @access  Private/Admin
exports.getUserStats = asyncHandler(async (req, res) => {
    const userRegistrations = await User.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: '%Y-%m',
                        date: '$createdAt'
                    }
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 }
        },
        {
            $limit: 12
        }
    ]);

    const userRoleStats = await User.aggregate([
        {
            $group: {
                _id: '$role',
                count: { $sum: 1 }
            }
        }
    ]);

    const topCustomers = await Order.aggregate([
        {
            $match: {
                paymentStatus: 'completed',
                orderStatus: { $ne: 'cancelled' }
            }
        },
        {
            $group: {
                _id: '$user',
                totalOrders: { $sum: 1 },
                totalSpent: { $sum: '$totalPrice' }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                _id: 1,
                name: '$user.name',
                email: '$user.email',
                totalOrders: 1,
                totalSpent: 1
            }
        },
        {
            $sort: { totalSpent: -1 }
        },
        {
            $limit: 10
        }
    ]);

    res.json({
        success: true,
        userRegistrations,
        userRoleStats,
        topCustomers
    });
});