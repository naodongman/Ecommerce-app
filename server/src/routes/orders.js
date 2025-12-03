const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const requireRole = require('../middleware/role');
const orderCtrl = require('../controllers/orderController');

//Must be logged in
router.use(auth);

// Get all orders
router.get('/', orderCtrl.getAllOrders);

// Get orders by ID
router.get('/:id', orderCtrl.getOrderById);

// Create an order
router.post('/', orderCtrl.createOrder);

// Update orders
router.put('/:id',
    requireRole(['admin']),   // ← Only admin can update
    orderCtrl.updateOrder
  );

// Delete Order
router.delete('/:id',
    requireRole(['admin']),   // ← Only admin can update
    orderCtrl.deleteOrder
  );
  

module.exports = router;
