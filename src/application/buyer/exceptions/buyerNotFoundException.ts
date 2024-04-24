export class BuyerNotFoundException extends Error {
  constructor() {
    super();
    this.message = "Specified buyer wasn't found";
  }
}
