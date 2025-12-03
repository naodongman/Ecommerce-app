const Category = require('../models/category');
const Product  = require('../models/product');

async function getAllCategories(req, res, next) {
  try {
    const page  = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = 5;
    const skip  = (page - 1) * limit;

    const total = await Category.countDocuments();

    const categories = await Category.find()
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: categories,
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


async function getCategoryById (req, res, next) {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const products = await Product.find({ category: category._id });

    res.status(200).json({
      category,
      products,
    });
  } catch (err) {
    next(err);
  }
};

async function createCategory (req, res, next)  {
  try {
    const newCategory = new Category(req.body);
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

async function updateCategory (req, res, next)  {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

async function deleteCategory  (req, res, next) {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Category not found' });
    }
    // 204 give Delete successful
    res.status(204).json({ message: 'Delete successful' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
  };