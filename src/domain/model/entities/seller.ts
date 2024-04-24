import { Product } from './product';

export class Seller {
  constructor(
    readonly _id: string,
    readonly businessName: string,
    readonly email: string,
    readonly publishedProducts: Product[],
  ) {}
}
