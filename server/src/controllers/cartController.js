// src/controllers/cartController.js  (CommonJS)

const Cart    = require('../models/cart');      // Mongoose Cart 模型
const Product = require('../models/product');   // 如果想验证商品存在，可引入

/** GET /cart  —— 返回当前用户购物车 */
async function getCart(req, res, next) {
  try {
    // Try to find the cart for the current user
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

    // If no cart exists, create an empty one
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
      // Populate after creation to match return format
      await cart.populate('items.product');
    }

    // Return the cart
    res.json(cart);
  } catch (err) {
    next(err);
  }
}

/** POST /cart  —— body: { productId, qty } */
async function addItem(req, res, next) {
  try {
    const { productId, qty = 1 } = req.body;

    // 可选：先校验产品是否存在
    // const exists = await Product.exists({ _id: productId });
    // if (!exists) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (item) item.qty += qty;
    else cart.items.push({ product: productId, qty });

    await cart.save();
    res.json({ message: 'Added', items: cart.items });
  } catch (err) {
    next(err);
  }
}

/** DELETE /cart/:id —— 删除一个商品 */
async function removeItem(req, res, next) {
  try {
    const { id } = req.params;                 // productId
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = cart.items.filter((i) => i.product.toString() !== id);
      await cart.save();
    }
    res.json({ message: 'Removed' });
  } catch (err) {
    next(err);
  }
}

/** PUT /cart  —— 更新某一商品数量 { productId, qty } */
async function updateItem(req, res, next) {
  try {
    const { productId, qty } = req.body;

    if (!productId || typeof qty !== 'number') {
      return res.status(400).json({ message: 'Invalid input' });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Product not found in cart' });

    item.qty = qty;
    await cart.save();

    res.json({ message: 'Updated', items: cart.items });
  } catch (err) {
    next(err);
  }
}

/** DELETE /cart —— 清空整个购物车 (added after A2) */
async function deleteCart(req, res, next) {
  try {
    const result = await Cart.deleteOne({ user: req.user.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Cart not found or already empty' });
    }
    res.json({ message: 'Cart deleted successfully' });
  } catch (err) {
    next(err);
  }
}


/* 导出 */
module.exports = {
  getCart,
  addItem,
  removeItem,
  updateItem,
  deleteCart,
};
