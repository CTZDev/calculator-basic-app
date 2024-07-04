class Calculator {
  display = null;

  constructor(display) {
    this.display = display;
  }

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
    if (b === 0) return 'Error matemático';
    return a / b;
  }

  operation(a, b, sign) {
    if (sign === '+') return this.sum(a, b);
    if (sign === '-') return this.substract(a, b);
    if (sign === 'x') return this.product(a, b);
    if (sign === '/') return this.division(a, b);
  }

  operationFirstOrder() {
    const firstOrder = ['x', '/'];
    const size = this.display.length;
    const regexNumbers = /^[0-9.]$/;
    let result = '';
    let groupInit = '';
    let groupEnd = '';
    let sign = '';

    if (this.display[0] === '-') groupInit += '-';
    for (let i = groupInit.length; i < size; i++) {
      let j = i;

      while (j < size && regexNumbers.test(this.display[j])) {
        groupInit += this.display[j];
        j++;
      }

      sign = this.display[j];
      let ans = '';
      let hasGroupEnd = false;
      /* Significa que es signo de primer orden */
      while (firstOrder.includes(sign)) {
        while (j < size && regexNumbers.test(this.display[++j])) {
          groupEnd += this.display[j];
        }

        const prev = parseFloat(groupInit);
        const last = parseFloat(groupEnd);
        ans = this.operation(prev, last, sign);
        sign = this.display[j];
        groupInit = ans;
        groupEnd = '';
        hasGroupEnd = true;
      }

      if (hasGroupEnd) {
        i = j - 1;
        groupInit = '';
        groupEnd = '';
        result += ans;
        hasGroupEnd = false;
        continue;
      }

      if (groupInit === '') {
        result += sign;
      } else {
        result += groupInit;
        groupInit = '';
        i = j - 1;
      }
    }

    return result;
  }

  /* Aqui operar de izquierda a derecha (+/-) */
  operationSecondOrder() {
    const op = this.operationFirstOrder();
    let groupInit = '';
    let groupEnd = '';
    const size = op.length;
    const regexNumbers = /^[0-9.]$/;
    let sign = '';
    let isActiveGroups = false;

    const firstValue = op[0];
    if (firstValue === '-') groupInit += firstValue;

    /* 13500-10+40 */
    /* -13500-10+40 */
    for (let i = groupInit.length; i < size; i++) {
      let j = i;
      while (j < size && regexNumbers.test(op[j])) {
        groupInit += op[j];
        j++;
        isActiveGroups = true;
      }

      sign = op[j];
      while (j < size && regexNumbers.test(op[++j])) {
        groupEnd += op[j];
        isActiveGroups = true;
      }

      const prev = parseFloat(groupInit);
      const last = parseFloat(groupEnd);
      let ans = this.operation(prev, last, sign);
      groupInit = ans;
      groupEnd = '';

      if (isActiveGroups) {
        isActiveGroups = false;
        i = j - 1;
      }
    }

    return groupInit;
  }

  calculate() {
    const resultFirstOrder = this.operationFirstOrder();
    /* Si ya existe un resultado, retorna el valor */
    if (!isNaN(resultFirstOrder)) return resultFirstOrder;

    const resultSecondOrder = this.operationSecondOrder();
    return resultSecondOrder;
  }
}

export default Calculator;

// const calc = new Calculator('375.1/5');
// calc.calculate();
