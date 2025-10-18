const mongoose = require('mongoose');
const Category = require('../models/Category');
const connectDatabase = require('../config/database');

const categories = [
    {
        name: 'Electronics',
        description: 'Latest electronic gadgets and devices'
    },
    {
        name: 'Fashion',
        description: 'Trendy clothing and accessories'
    },
    {
        name: 'Home & Kitchen',
        description: 'Home appliances and kitchen essentials'
    },
    {
        name: 'Beauty & Personal Care',
        description: 'Beauty products and personal care items'
    },
    {
        name: 'Sports & Outdoors',
        description: 'Sports equipment and outdoor gear'
    },
    {
        name: 'Books & Stationery',
        description: 'Books, notebooks, and stationery items'
    },
    {
        name: 'Toys & Games',
        description: 'Toys, games, and entertainment'
    },
    {
        name: 'Health & Wellness',
        description: 'Health supplements and wellness products'
    }
];

const seedCategories = async () => {
    try {
        await connectDatabase();

        // Clear existing categories
        await Category.deleteMany({});

        // Insert new categories
        await Category.insertMany(categories);

        console.log('Categories seeded successfully');
        console.log(`Created ${categories.length} categories`);
    } catch (error) {
        console.error('Error seeding categories:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run if called directly
if (require.main === module) {
    seedCategories();
}

module.exports = seedCategories;