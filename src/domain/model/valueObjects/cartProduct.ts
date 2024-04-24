export class CartProduct {
  constructor(
    readonly productId: string,
    readonly sellerId: string,
    readonly amount: number,
  ) {}
}
