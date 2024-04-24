import { Schema } from 'mongoose';
import Product from './product.schema';

const SellerSchema = new Schema({
  businessName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  publishedProducts: [
    {
      type: [Product],
      ref: 'Product',
      default: [],
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default SellerSchema;
