const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const requireRole = require('../middleware/role');
const categoryCtrl = require('../controllers/categoryController');

// Get all categories
router.get('/', categoryCtrl.getAllCategories);

// Get Categories by ID
router.get('/:id', categoryCtrl.getCategoryById);

// Create a new category
router.post('/', auth, requireRole(['admin']), categoryCtrl.createCategory);

// Update Categories
router.put('/:id', auth, requireRole(['admin']), categoryCtrl.updateCategory);

// Delete Category
router.delete('/:id', auth, requireRole(['admin']), categoryCtrl.deleteCategory);

// Nested routing: get all items under a category
router.use('/:categoryId/products',  auth, (req, res, next) => {
  req.categoryId = req.params.categoryId;
  next();
}, require('./products'));

module.exports = router;
