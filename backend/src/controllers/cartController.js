const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { asyncHandler } = require('../middleware/validationMiddleware');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = asyncHandler(async (req, res) => {
    let cart = await Cart.findOne({ user: req.user.id })
        .populate('items.product', 'name price images stock');

    if (!cart) {
        // Create empty cart if not exists
        cart = await Cart.create({ user: req.user.id, items: [] });
    }

    res.json({
        success: true,
        cart
    });
});

// @desc    Add item to cart
// @route   POST /api/cart/items
// @access  Private
exports.addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity = 1 } = req.body;

    // Check if product exists and has stock
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }

    if (product.stock < quantity) {
        return res.status(400).json({
            success: false,
            message: 'Insufficient stock'
        });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
        // Create new cart if not exists
        cart = await Cart.create({
            user: req.user.id,
            items: [{
                product: productId,
                quantity,
                price: product.price
            }]
        });
    } else {
        // Check if item already in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (existingItemIndex > -1) {
            // Update quantity if item exists
            const newQuantity = cart.items[existingItemIndex].quantity + quantity;
            
            if (product.stock < newQuantity) {
                return res.status(400).json({
                    success: false,
                    message: 'Insufficient stock for requested quantity'
                });
            }

            cart.items[existingItemIndex].quantity = newQuantity;
        } else {
            // Add new item to cart
            cart.items.push({
                product: productId,
                quantity,
                price: product.price
            });
        }

        await cart.save();
    }

    await cart.populate('items.product', 'name price images stock');

    res.json({
        success: true,
        message: 'Item added to cart',
        cart
    });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/items/:itemId
// @access  Private
exports.updateCartItem = asyncHandler(async (req, res) => {
    const { quantity } = req.body;

    if (quantity < 1) {
        return res.status(400).json({
            success: false,
            message: 'Quantity must be at least 1'
        });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
        return res.status(404).json({
            success: false,
            message: 'Cart not found'
        });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
        return res.status(404).json({
            success: false,
            message: 'Cart item not found'
        });
    }

    // Check stock
    const product = await Product.findById(item.product);
    if (product.stock < quantity) {
        return res.status(400).json({
            success: false,
            message: 'Insufficient stock'
        });
    }

    item.quantity = quantity;
    await cart.save();

    await cart.populate('items.product', 'name price images stock');

    res.json({
        success: true,
        message: 'Cart item updated',
        cart
    });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:itemId
// @access  Private
exports.removeFromCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
        return res.status(404).json({
            success: false,
            message: 'Cart not found'
        });
    }

    cart.items.pull(req.params.itemId);
    await cart.save();

    await cart.populate('items.product', 'name price images stock');

    res.json({
        success: true,
        message: 'Item removed from cart',
        cart
    });
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
exports.clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
        return res.status(404).json({
            success: false,
            message: 'Cart not found'
        });
    }

    cart.items = [];
    await cart.save();

    res.json({
        success: true,
        message: 'Cart cleared',
        cart
    });
});