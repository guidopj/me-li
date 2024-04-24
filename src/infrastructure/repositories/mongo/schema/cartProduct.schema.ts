import mongoose, { Schema } from 'mongoose';

const schema = mongoose.Schema;

const CartProductSchema = new Schema({
  sellerId: {
    type: schema.Types.ObjectId,
    ref: 'Seller',
    required: true,
  },
  productId: {
    type: schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default CartProductSchema;
