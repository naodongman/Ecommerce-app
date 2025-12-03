const express = require('express');
const auth    = require('../middleware/auth');
const cartController  = require('../controllers/cartController');

const router = express.Router();
router.use(auth);

router.get('/',      cartController.getCart);
router.post('/',     cartController.addItem);
router.delete('/:id', cartController.removeItem);
router.put('/',  cartController.updateItem);
router.delete('/', cartController.deleteCart); // added delete card since A2

module.exports = router;
