const Product = require('../models/product');  
const Order   = require('../models/order'); 

// Get all orders
exports.getAllOrders = async (req, res, next) => {
  try {
    // Depending on the role, the filter: admin sees everything, customer sees only himself.
    const filter = req.user.role === 'admin'
      ? {}
      : { createdBy: req.user.id };

    const page  = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = 10;
    const skip  = (page - 1) * limit;

    const total = await Order.countDocuments(filter);

    const orders = await Order.find(filter)
      .populate('items.product')
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: orders,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order
      .findById(req.params.id)
      .populate('items.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

// Create a new order and calculate the total price
exports.createOrder = async (req, res, next) => {
  try {
    const items = req.body.items;
    // New checksum: make sure items exists and is an array
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: 'The order items must be an array.' });
    }

    let total = 0;
    const processedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: `Invalid Product ID ${item.product}` });
      }
      total += product.price * item.quantity;
      processedItems.push({
        product: product._id,
        quantity: item.quantity
      });
    }

    const order = new Order({
      items:     processedItems,
      total,
      createdBy: req.user.id
    });
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};


// Update Order: Supports updating items and/or status and recalculating the total price when items change.
exports.updateOrder = async (req, res, next) => {
  try {
    const update = { ...req.body };

    if (update.items) {
      let total = 0;
      const processed = [];

      for (const item of update.items) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(400).json({ message: `Invalid product ID ${item.product}` });
        }
        total += product.price * item.quantity;
        processed.push({ product: product._id, quantity: item.quantity });
      }
      update.items = processed;
      update.total = total;
    }

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete order
exports.deleteOrder = async (req, res, next) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(204).json({ message: 'Delete successful' });
  } catch (err) {
    next(err);
  }
};
