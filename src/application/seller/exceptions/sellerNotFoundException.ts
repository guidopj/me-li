export class SellerNotFoundException extends Error {
  constructor() {
    super();
    this.message = 'seller not found';
  }
}
