const express      = require('express');
const router       = express.Router();
const productCtrl  = require('../controllers/productController');
const categoryCtrl = require('../controllers/categoryController');

// Public: access to all commodities
router.get('/products',      productCtrl.getAllProducts);

// Public: Get a single product by ID
router.get('/products/:id',  productCtrl.getProductById);

// Public: access to all classifications
router.get('/categories',    categoryCtrl.getAllCategories);

// Public: Get a single category by ID
router.get('/categories/:id',categoryCtrl.getCategoryById);

module.exports = router;
