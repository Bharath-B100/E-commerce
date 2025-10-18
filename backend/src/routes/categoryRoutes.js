const express = require('express');
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoriesWithCounts
} = require('../controllers/categoryController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const { uploadSingle, handleUploadError } = require('../middleware/uploadMiddleware');

const router = express.Router();

// Public routes
router.get('/', getCategories);
router.get('/with-counts', getCategoriesWithCounts);
router.get('/:id', getCategory);

// Admin routes
router.post(
    '/',
    isAuthenticated,
    isAdmin,
    uploadSingle('image'),
    handleUploadError,
    createCategory
);

router.put(
    '/:id',
    isAuthenticated,
    isAdmin,
    uploadSingle('image'),
    handleUploadError,
    updateCategory
);

router.delete('/:id', isAuthenticated, isAdmin, deleteCategory);

module.exports = router;