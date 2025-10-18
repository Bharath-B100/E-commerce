const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [8, 'Price cannot exceed 8 characters'],
        default: 0.0
    },
    comparePrice: {
        type: Number,
        maxLength: [8, 'Compare price cannot exceed 8 characters']
    },
    category: {
        type: String,
        required: [true, 'Please select category for product'],
        enum: ['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Sports', 'Books', 'Toys', 'Health']
    },
    brand: {
        type: String,
        trim: true
    },
    images: [{
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    }],
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Stock cannot exceed 5 characters'],
        default: 0
    },
    features: [String],
    tags: [String],
    isActive: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
