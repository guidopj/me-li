export class ShoppingCartNotFoundException extends Error {
  constructor() {
    super();
    this.message = 'shopping cart not found';
  }
}
