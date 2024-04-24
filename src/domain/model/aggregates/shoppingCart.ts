import { CartProduct } from '../valueObjects/cartProduct';

export class ShoppingCart {
  constructor(
    readonly buyerId: string,
    readonly cartProducts: CartProduct[],
  ) {}
}
