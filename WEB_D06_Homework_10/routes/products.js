var express = require('express');
var router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { getProducts, createProduct, createReview, getProductById, deleteProductById, updateProductById, getTopProducts } = require('../controller/productController');

// 1.
// @desc: Get all products
// @route: GET /api/products
// @access: Public
router.get('/', getProducts);

// 2.
// @desc: Create a product
// @route: POST /api/products
// @access: Private/Admin
router.post('/', protect, isAdmin, createProduct);

// 3.
// @desc: Create a revirew for product
// @route: POST /api/products/:id/reviews
// @access: Private
router.post('/:id/reviews', protect, createReview);

// 4.
// @desc: Get product by ID
// @route: GET /api/products/:id
// @access: Public
router.get('/:id', getProductById);

// 5.
// @desc: Delete product by ID
// @route: DELETE /api/products/:id
// @access: Private/Admin
router.delete('/:id', protect, isAdmin, deleteProductById);

// 6.
// @desc: Update product by ID
// @route: PUT /api/products/:id
// @access: Private/Admin
router.put('/:id', protect, isAdmin, updateProductById);

// 7. 
// @desc: Get top 10 products 
// @route: GET /api/products/top
// @access: Public
router.get('/reviews/top', getTopProducts);

module.exports = router;