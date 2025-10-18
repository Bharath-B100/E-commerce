const express = require('express');
const {
    addToWishlist,
    getWishlist
} = require('../controllers/userController');

const router = express.Router();

router.post('/wishlist', addToWishlist);
router.get('/wishlist', getWishlist);

module.exports = router;