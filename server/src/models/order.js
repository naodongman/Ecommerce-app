const mongoose = require('mongoose');
const { Schema } = mongoose;

//  Embedded subdocument: represents an order item
const OrderItemSchema = new Schema({
  product:  { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1, min: 1 }
});

// Order Master Model
const OrderSchema = new Schema({
  items:    [ OrderItemSchema ],  // One order contains multiple order items (many-to-many relationship)
  total:    { type: Number, required: true, min: 0 },
  status:   { type: String, default: 'pending' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
