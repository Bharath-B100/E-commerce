const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');
const connectDatabase = require('../config/database');

const seedProducts = async () => {
    try {
        await connectDatabase();

        // Get categories and admin user
        const categories = await Category.find({});
        const adminUser = await User.findOne({ role: 'admin' });

        if (!adminUser) {
            console.error('No admin user found. Please run admin seeder first.');
            return;
        }

        const products = [
            {
                name: 'Wireless Bluetooth Headphones',
                description: 'High-quality wireless headphones with noise cancellation',
                price: 2999,
                comparePrice: 3999,
                category: categories.find(c => c.name === 'Electronics')._id,
                brand: 'SoundMax',
                stock: 50,
                features: ['Noise Cancellation', '30hrs Battery', 'Fast Charging'],
                specifications: {
                    'Connectivity': 'Bluetooth 5.0',
                    'Battery': '500mAh',
                    'Weight': '250g'
                },
                tags: ['headphones', 'wireless', 'bluetooth', 'audio'],
                createdBy: adminUser._id
            },
            {
                name: 'Smart Fitness Watch',
                description: 'Advanced fitness tracker with heart rate monitoring',
                price: 5999,
                comparePrice: 7999,
                category: categories.find(c => c.name === 'Electronics')._id,
                brand: 'FitTech',
                stock: 30,
                features: ['Heart Rate Monitor', 'GPS', 'Water Resistant'],
                specifications: {
                    'Display': '1.3 inch AMOLED',
                    'Battery': '7 days',
                    'Compatibility': 'Android & iOS'
                },
                tags: ['smartwatch', 'fitness', 'tracker', 'health'],
                createdBy: adminUser._id
            },
            {
                name: 'Cotton T-Shirt',
                description: 'Comfortable cotton t-shirt for everyday wear',
                price: 799,
                comparePrice: 999,
                category: categories.find(c => c.name === 'Fashion')._id,
                brand: 'ComfortWear',
                stock: 100,
                features: ['100% Cotton', 'Machine Washable', 'Premium Quality'],
                specifications: {
                    'Material': '100% Cotton',
                    'Fit': 'Regular',
                    'Care': 'Machine Wash'
                },
                tags: ['tshirt', 'cotton', 'casual', 'fashion'],
                createdBy: adminUser._id
            },
            {
                name: 'Non-Stick Cookware Set',
                description: 'Complete non-stick cookware set for modern kitchen',
                price: 3499,
                comparePrice: 4999,
                category: categories.find(c => c.name === 'Home & Kitchen')._id,
                brand: 'KitchenPro',
                stock: 25,
                features: ['Non-Stick Coating', 'Heat Resistant', 'Easy to Clean'],
                specifications: {
                    'Material': 'Aluminum',
                    'Pieces': '5',
                    'Warranty': '2 years'
                },
                tags: ['cookware', 'kitchen', 'non-stick', 'utensils'],
                createdBy: adminUser._id
            },
            {
                name: 'Vitamin C Serum',
                description: 'Anti-aging vitamin C serum for glowing skin',
                price: 1299,
                comparePrice: 1799,
                category: categories.find(c => c.name === 'Beauty & Personal Care')._id,
                brand: 'GlowSkin',
                stock: 60,
                features: ['Anti-Aging', 'Brightening', 'Hydrating'],
                specifications: {
                    'Volume': '30ml',
                    'Skin Type': 'All',
                    'Cruelty Free': 'Yes'
                },
                tags: ['skincare', 'serum', 'vitamin-c', 'beauty'],
                createdBy: adminUser._id
            }
        ];

        // Clear existing products
        await Product.deleteMany({});

        // Insert new products
        await Product.insertMany(products);

        console.log('Products seeded successfully');
        console.log(`Created ${products.length} products`);
    } catch (error) {
        console.error('Error seeding products:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run if called directly
if (require.main === module) {
    seedProducts();
}

module.exports = seedProducts;