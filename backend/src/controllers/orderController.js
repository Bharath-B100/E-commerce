const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { asyncHandler } = require('../middleware/validationMiddleware');
const { sendOrderConfirmation } = require('../services/emailService');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = asyncHandler(async (req, res) => {
    const { shippingAddress, paymentMethod, items } = req.body;

    let orderItems = [];
    let itemsPrice = 0;

    if (items && items.length > 0) {
        // Create order from provided items (for direct checkout)
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product not found: ${item.product}`
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`
                });
            }

            orderItems.push({
                product: item.product,
                name: product.name,
                image: product.images[0]?.url || '',
                price: product.price,
                quantity: item.quantity
            });

            itemsPrice += product.price * item.quantity;
        }
    } else {
        // Create order from cart
        const cart = await Cart.findOne({ user: req.user.id })
            .populate('items.product', 'name images stock price');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No items in cart'
            });
        }

        // Check stock and prepare order items
        for (const cartItem of cart.items) {
            const product = cartItem.product;

            if (product.stock < cartItem.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`
                });
            }

            orderItems.push({
                product: product._id,
                name: product.name,
                image: product.images[0]?.url || '',
                price: product.price,
                quantity: cartItem.quantity
            });

            itemsPrice += product.price * cartItem.quantity;
        }
    }

    // Calculate prices
    const taxPrice = itemsPrice * 0.18; // 18% GST
    const shippingPrice = itemsPrice > 1000 ? 0 : 50; // Free shipping above 1000
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    // Create order
    const order = await Order.create({
        user: req.user.id,
        items: orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });

    // Update product stock
    for (const item of orderItems) {
        await Product.findByIdAndUpdate(item.product, {
            $inc: { stock: -item.quantity }
        });
    }

    // Clear cart if order was created from cart
    if (!items || items.length === 0) {
        await Cart.findOneAndUpdate(
            { user: req.user.id },
            { items: [] }
        );
    }

    await order.populate('user', 'name email');
    await order.populate('items.product', 'name');

    // Send order confirmation email
    sendOrderConfirmation(order, req.user).catch(console.error);

    res.status(201).json({
        success: true,
        message: 'Order created successfully',
        order
    });
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name email')
        .populate('items.product', 'name images');

    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found'
        });
    }

    // Check if user owns the order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied'
        });
    }

    res.json({
        success: true,
        order
    });
});

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id })
        .populate('items.product', 'name images')
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        count: orders.length,
        orders
    });
});

// @desc    Get all orders - Admin
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
        .populate('user', 'name email')
        .sort({ createdAt: -1 });

    const totalAmount = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.json({
        success: true,
        count: orders.length,
        totalAmount,
        orders
    });
});

// @desc    Update order status - Admin
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found'
        });
    }

    if (order.orderStatus === 'delivered') {
        return res.status(400).json({
            success: false,
            message: 'You have already delivered this order'
        });
    }

    order.orderStatus = status;

    if (status === 'delivered') {
        order.deliveredAt = Date.now();
    }

    await order.save();

    res.json({
        success: true,
        message: 'Order status updated successfully',
        order
    });
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found'
        });
    }

    // Check if user owns the order
    if (order.user.toString() !== req.user.id) {
        return res.status(403).json({
            success: false,
            message: 'Access denied'
        });
    }

    // Check if order can be cancelled
    if (['delivered', 'cancelled'].includes(order.orderStatus)) {
        return res.status(400).json({
            success: false,
            message: `Order cannot be cancelled. Current status: ${order.orderStatus}`
        });
    }

    order.orderStatus = 'cancelled';
    order.cancelledAt = Date.now();

    // Restore product stock
    for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
            $inc: { stock: item.quantity }
        });
    }

    await order.save();

    res.json({
        success: true,
        message: 'Order cancelled successfully',
        order
    });
});