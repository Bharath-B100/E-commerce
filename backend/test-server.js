const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Test MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

console.log('🔗 Testing MongoDB connection...');

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('✅ MongoDB Connected Successfully');
    
    // Test if we can require the models
    try {
        const User = require('./models/User');
        const Product = require('./models/Product');
        console.log('✅ Models loaded successfully');
        
        // Simple route to test
        app.get('/', (req, res) => {
            res.json({
                success: true,
                message: 'Test server is working!',
                models: ['User', 'Product'],
                database: 'Connected'
            });
        });
        
        const PORT = 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Test server running on http://localhost:${PORT}`);
        });
        
    } catch (modelError) {
        console.log('❌ Error loading models:', modelError.message);
        process.exit(1);
    }
})
.catch(err => {
    console.log('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
});