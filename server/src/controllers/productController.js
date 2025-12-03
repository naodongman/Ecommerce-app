const Product  = require('../models/product');
const Category = require('../models/category');

exports.getAllProducts = async (req, res, next) => {
  try {
    /* ---------- 读取查询参数 ---------- */
    const {
      page  = 1,
      limit = 8,
      q     = '',
    } = req.query;

    const pageNum  = Math.max(1, parseInt(page, 10));
    const perPage  = Math.max(1, parseInt(limit, 10));

    /* ---------- 构建过滤条件 ---------- */
    const filter = q
      ? {
          $or: [
            { name:        new RegExp(q, 'i') },
            { description: new RegExp(q, 'i') },
          ],
        }
      : {};

    /* ---------- 查询 & 统计 ---------- */
    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .populate('category')
      .skip((pageNum - 1) * perPage)
      .limit(perPage);

    /* ---------- 返回 ---------- */
    res.status(200).json({
      data: products,
      pagination: {
        total,
        page:   pageNum,
        limit:  perPage,
        pages:  Math.ceil(total / perPage),
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product
      .findById(req.params.id)
      .populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    // Verify that the classification exists
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    // If the category field is included in the update, validate it too!
    if (req.body.category) {
      const cat = await Category.findById(req.body.category);
      if (!cat) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }
    }
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).json({ message: 'Delete successful' });
  } catch (err) {
    next(err);
  }
};
