export class ProductNotValidException extends Error {
  constructor() {
    super();
    this.message = 'product not valid';
  }
}
