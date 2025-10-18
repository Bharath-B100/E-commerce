const Category = require('../models/Category');
const Product = require('../models/Product');
const { asyncHandler } = require('../middleware/validationMiddleware');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({ isActive: true })
        .populate('parentCategory', 'name');

    res.json({
        success: true,
        count: categories.length,
        categories
    });
});

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
exports.getCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)
        .populate('parentCategory', 'name');

    if (!category) {
        return res.status(404).json({
            success: false,
            message: 'Category not found'
        });
    }

    res.json({
        success: true,
        category
    });
});

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
exports.createCategory = asyncHandler(async (req, res) => {
    // Handle image upload
    if (req.file) {
        const result = await uploadToCloudinary(req.file, 'ecommerce/categories');
        req.body.image = {
            public_id: result.public_id,
            url: result.url
        };
    }

    const category = await Category.create(req.body);

    res.status(201).json({
        success: true,
        message: 'Category created successfully',
        category
    });
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
exports.updateCategory = asyncHandler(async (req, res) => {
    let category = await Category.findById(req.params.id);

    if (!category) {
        return res.status(404).json({
            success: false,
            message: 'Category not found'
        });
    }

    // Handle image upload
    if (req.file) {
        // Delete old image if exists
        if (category.image && category.image.public_id) {
            await deleteFromCloudinary(category.image.public_id);
        }

        const result = await uploadToCloudinary(req.file, 'ecommerce/categories');
        req.body.image = {
            public_id: result.public_id,
            url: result.url
        };
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.json({
        success: true,
        message: 'Category updated successfully',
        category
    });
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return res.status(404).json({
            success: false,
            message: 'Category not found'
        });
    }

    // Check if category has products
    const productsCount = await Product.countDocuments({ category: category._id });
    if (productsCount > 0) {
        return res.status(400).json({
            success: false,
            message: 'Cannot delete category with existing products'
        });
    }

    // Delete image from cloudinary
    if (category.image && category.image.public_id) {
        await deleteFromCloudinary(category.image.public_id);
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        message: 'Category deleted successfully'
    });
});

// @desc    Get categories with product count
// @route   GET /api/categories/with-counts
// @access  Public
exports.getCategoriesWithCounts = asyncHandler(async (req, res) => {
    const categories = await Category.aggregate([
        {
            $match: { isActive: true }
        },
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: 'category',
                as: 'products'
            }
        },
        {
            $project: {
                name: 1,
                description: 1,
                image: 1,
                parentCategory: 1,
                productCount: { $size: '$products' }
            }
        },
        {
            $sort: { productCount: -1 }
        }
    ]);

    res.json({
        success: true,
        categories
    });
});