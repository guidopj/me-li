import mongoose from 'mongoose';

import { Price } from './model/valueObjects/Price';

const possibleCurrencies = ['$', 'u$S'];

export const validateEmail = (email: string): boolean => {
  const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return expression.test(email); // true
};

export const validatePrice = (price: Price) => {
  return price.amount > 0 && possibleCurrencies.includes(price.currency);
};

export const validateStock = (stock: number) => {
  return stock > 0;
};

export const validateObjectId = (objectId: string) => {
  return mongoose.Types.ObjectId.isValid(objectId);
};
