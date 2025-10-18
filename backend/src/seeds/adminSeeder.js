const mongoose = require('mongoose');
const User = require('../models/User');
const connectDatabase = require('../config/database');

const createAdminUser = async () => {
    try {
        await connectDatabase();

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@shopeasy.com' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }

        // Create admin user
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@shopeasy.com',
            password: 'admin123',
            role: 'admin'
        });

        console.log('Admin user created successfully:', {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role
        });
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run if called directly
if (require.main === module) {
    createAdminUser();
}

module.exports = createAdminUser;