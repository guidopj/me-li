export class AmountNotEnoughException extends Error {
  constructor(stock: number, amount: number) {
    super();
    this.message = `amount ${amount} exceeds available stock ${stock}`;
  }
}
