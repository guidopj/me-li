export class ProductNotFoundException extends Error {
  constructor() {
    super();
    this.message = 'product not found';
  }
}
