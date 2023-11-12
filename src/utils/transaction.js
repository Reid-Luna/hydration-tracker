export default class Transaction {
  time;
  amount;
  measurement;
  log;

  validate() {
    if (
      this.log &&
      this.time &&
      this.amount &&
      this.measurement &&
      this.amount > 0 &&
      this.formattedString
    )
      return true;
    else
      throw new Error(
        "transaction must have a log to write to, an amount greater than 0 and a measurement"
      );
  }

  get formattedString() {
    return `${this.time.toLocaleString()}•${this.amount}•${
      this.measurement.full
    }\n`;
  }

  constructor(log, amount, measurement, time = Date.now()) {
    this.time = new Date(time);
    this.amount = amount;
    this.measurement = measurement;
    this.log = log;

    this.validate();
  }

  async Save() {
    return this.log.Write(this.formattedString);
  }
}
