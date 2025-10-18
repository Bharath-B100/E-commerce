const Review = require('../models/Review');
const Product = require('../models/Product');
const { asyncHandler } = require('../middleware/validationMiddleware');

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
exports.getProductReviews = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const reviews = await Review.find({
        product: req.params.productId,
        isApproved: true
    })
    .populate('user', 'name')
    .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const total = await Review.countDocuments({
        product: req.params.productId,
        isApproved: true
    });

    res.json({
        success: true,
        reviews,
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / limit)
    });
});

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
        return res.status(404).json({
            success: false,
            message: 'Review not found'
        });
    }

    // Check if user owns the review
    if (review.user.toString() !== req.user.id) {
        return res.status(403).json({
            success: false,
            message: 'Access denied'
        });
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    // Update product rating
    await updateProductRating(review.product);

    res.json({
        success: true,
        message: 'Review updated successfully',
        review
    });
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
        return res.status(404).json({
            success: false,
            message: 'Review not found'
        });
    }

    // Check if user owns the review or is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied'
        });
    }

    const productId = review.product;
    await Review.findByIdAndDelete(req.params.id);

    // Update product rating
    await updateProductRating(productId);

    res.json({
        success: true,
        message: 'Review deleted successfully'
    });
});

// @desc    Get recent reviews
// @route   GET /api/reviews/recent
// @access  Public
exports.getRecentReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ isApproved: true })
        .populate('user', 'name')
        .populate('product', 'name images')
        .sort({ createdAt: -1 })
        .limit(10);

    res.json({
        success: true,
        reviews
    });
});

// Helper function to update product rating
const updateProductRating = async (productId) => {
    const reviews = await Review.find({ product: productId, isApproved: true });
    
    if (reviews.length === 0) {
        await Product.findByIdAndUpdate(productId, {
            rating: 0,
            numOfReviews: 0
        });
        return;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / reviews.length).toFixed(1);

    await Product.findByIdAndUpdate(productId, {
        rating: averageRating,
        numOfReviews: reviews.length
    });
};