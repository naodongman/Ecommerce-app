const express = require('express');
const router = express.Router();

// A simple logging middleware example
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// New: Authentication Routing
router.use('/auth', require('./auth'));

// Mount individual subroutes
router.use('/products', require('./products'));
router.use('/categories', require('./categories'));
router.use('/orders', require('./orders'));
router.use('/cart', require('./cart'));   

module.exports = router;
