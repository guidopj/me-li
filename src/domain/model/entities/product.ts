import { Price } from '../valueObjects/Price';

export class Product {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  readonly price: Price = new Price(0, '');
  readonly stock: number;
  readonly sellerId: string;
}
