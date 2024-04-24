import { validatePrice, validateStock } from 'src/domain/validations';
import { Product } from '../entities/product';

export const isProductValid = (product: Product | Partial<Product>) => {
  return validatePrice(product.price) && validateStock(product.stock);
};
