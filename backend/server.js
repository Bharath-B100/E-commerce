const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

console.log('🔗 Connecting to MongoDB...');

mongoose.connect(MONGODB_URI)
.then(async () => {
    console.log('✅ MongoDB Connected Successfully');
    
    // Import models after successful connection
    const User = require('./models/User');
    const Product = require('./models/Product');
    console.log('✅ Models loaded successfully');
    
    // ===== ROUTES =====
    
    // Home route
    app.get('/', (req, res) => {
        res.json({
            success: true,
            message: '🎉 E-Commerce API is running!',
            timestamp: new Date().toISOString(),
            database: 'Connected'
        });
    });
    
    // Health check
    app.get('/api/health', (req, res) => {
        res.json({
            success: true,
            message: 'Server is healthy ✅',
            database: 'Connected',
            uptime: process.uptime()
        });
    });
    
    // Auth Routes
    app.post('/api/auth/register', async (req, res) => {
        try {
            const { name, email, password } = req.body;
    
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exists with this email'
                });
            }
    
            const user = await User.create({ name, email, password });
    
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    });
    
    // Simple products route
    app.get('/api/products', async (req, res) => {
        try {
            const products = await Product.find({ isActive: true }).limit(10);
            res.json({
                success: true,
                products
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    });
    
    // Create sample data
    app.post('/api/setup/sample-data', async (req, res) => {
        try {
            const sampleProducts = [
                {
                    name: "Wireless Headphones",
                    description: "High-quality wireless headphones",
                    price: 2999,
                    category: "Electronics",
                    brand: "SoundMax",
                    stock: 50,
                    rating: 4.5
                },
                {
                    name: "Smart Watch",
                    description: "Fitness tracker with heart rate monitoring",
                    price: 5999,
                    category: "Electronics", 
                    brand: "FitTech",
                    stock: 30,
                    rating: 4.2
                }
            ];
    
            await Product.deleteMany({});
            await Product.insertMany(sampleProducts);
    
            res.json({
                success: true,
                message: 'Sample data created',
                products: sampleProducts.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    });
    
    const PORT = process.env.PORT || 5000;
    
    app.listen(PORT, () => {
        console.log('🚀 Server started successfully!');
        console.log(`📍 Port: ${PORT}`);
        console.log(`🔗 API URL: http://localhost:${PORT}`);
    });
    
})
.catch(err => {
    console.log('❌ MongoDB Connection Error:', err.message);
    console.log('💡 Make sure MongoDB is running');
    process.exit(1);
});