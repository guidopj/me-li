import mongoose, { Schema } from 'mongoose';
import CartProduct from './cartProduct.schema';

const schema = mongoose.Schema;

const ShoppingCartSchema = new Schema({
  buyerId: {
    type: schema.Types.ObjectId,
    ref: 'Buyer',
    required: true,
  },
  cartProducts: {
    type: [CartProduct],
    ref: 'CartProduct',
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default ShoppingCartSchema;
