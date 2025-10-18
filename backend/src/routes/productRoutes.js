const express = require('express');
const {
    getProducts,
    getProduct,
    createProduct,
    getFeaturedProducts
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);

module.exports = router;