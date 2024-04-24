export class Price {
  constructor(
    readonly amount: number,
    readonly currency: string,
  ) {
    this.amount = amount;
    this.currency = currency;
  }
}
