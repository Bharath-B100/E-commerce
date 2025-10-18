const Product = require('../models/Product');

// Search products with filters
exports.searchProducts = async (searchParams) => {
    const {
        keyword,
        category,
        minPrice,
        maxPrice,
        brand,
        rating,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        page = 1,
        limit = 12
    } = searchParams;

    let query = { isActive: true };

    // Keyword search (name, description, brand)
    if (keyword) {
        query.$or = [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
            { brand: { $regex: keyword, $options: 'i' } }
        ];
    }

    // Category filter
    if (category) {
        query.category = category;
    }

    // Price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
        query.price = {};
        if (minPrice !== undefined) query.price.$gte = parseFloat(minPrice);
        if (maxPrice !== undefined) query.price.$lte = parseFloat(maxPrice);
    }

    // Brand filter
    if (brand) {
        query.brand = { $regex: brand, $options: 'i' };
    }

    // Rating filter
    if (rating) {
        query.rating = { $gte: parseFloat(rating) };
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const products = await Product.find(query)
        .populate('category', 'name')
        .sort(sortOptions)
        .limit(limit * 1)
        .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    return {
        products,
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / limit)
    };
};

// Get search suggestions
exports.getSearchSuggestions = async (keyword, limit = 5) => {
    if (!keyword || keyword.length < 2) {
        return [];
    }

    const products = await Product.find({
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { brand: { $regex: keyword, $options: 'i' } }
        ],
        isActive: true
    })
    .select('name brand category images price')
    .populate('category', 'name')
    .limit(limit);

    return products;
};