class Calculator {
  firstValue = null;
  secondValue = null;
  op = null;

  constructor(firstValue, secondValue, op) {
    this.firstValue = firstValue;
    this.secondValue = secondValue;
    this.op = op;
  }

  /* Arreglar */
  sum(a, b) {
    return a + b;
  }

  substract(a, b) {
    return a - b;
  }

  product(a, b) {
    return a * b;
  }

  division(a, b) {
    if (b === 0) return "You can't divide for zero";
    return a / b;
  }
}
