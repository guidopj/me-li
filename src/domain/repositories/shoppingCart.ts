import { CartProduct } from '../model/valueObjects/cartProduct';
import { ShoppingCart } from '../model/aggregates/shoppingCart';

export interface IShoppingCartRepository {
  create(buyerId: string): Promise<ShoppingCart>;
  delete(buyerId: string): Promise<ShoppingCart>;
  addProduct(buyerId: string, product: CartProduct): Promise<CartProduct>;
  getProductsByBuyer(buyerId: string): Promise<Array<CartProduct>>;
  updateCart(buyerId: string, product: CartProduct): Promise<CartProduct>;
  deleteProductFromBuyer(
    buyerId: string,
    product: CartProduct,
  ): Promise<CartProduct>;
  getCartByBuyerId(buyerId: string): Promise<ShoppingCart>;
}

export const IShoppingCartRepository = Symbol('IShoppingCartRepository');
