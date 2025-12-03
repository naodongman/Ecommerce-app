const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const requireRole = require('../middleware/role');
const productCtrl = require('../controllers/productController');

// Get all products
router.get('/', productCtrl.getAllProducts);

// Get products by ID
router.get('/:id', productCtrl.getProductById);

// Create a new product
router.post('/', auth, requireRole(['admin']), productCtrl.createProduct);

// Update the product
router.put('/:id', auth,requireRole(['admin']), productCtrl.updateProduct);

// Delete Product
router.delete('/:id', auth, requireRole(['admin']), productCtrl.deleteProduct);

module.exports = router;
