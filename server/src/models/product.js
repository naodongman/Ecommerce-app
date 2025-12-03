const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name:       { type: String, required: true },
  description:{ type: String },
  price:      { type: Number, required: true, min: 0 },
  image:      { type: String},
  // One-to-many: each item belongs to a certain category
  category:   { type: Schema.Types.ObjectId, ref: 'Category', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
