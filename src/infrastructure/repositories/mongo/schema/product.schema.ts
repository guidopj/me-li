import mongoose, { Schema } from 'mongoose';

const schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 32,
  },
  description: {
    type: String,
    required: true,
    maxLength: 255,
  },
  price: {
    type: new Schema({
      amount: {
        type: Number,
        required: true,
        default: 0,
      },
      currency: {
        type: String,
        required: true,
        currency: '$',
      },
    }),
    required: true,
    min: 1,
  },
  stock: {
    type: Number,
    required: true,
    min: 1,
  },
  sellerId: {
    type: schema.Types.ObjectId,
    ref: 'Seller',
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default ProductSchema;
