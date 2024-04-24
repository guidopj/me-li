export class EmailNotValidException extends Error {
  constructor() {
    super();
    this.message = 'email not valid';
  }
}
