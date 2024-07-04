import Calculator from './class/Calculator.js';

const calculatorApp = (screen) => {
  const $screen = document.getElementById(screen);
  const regexNumbers = /^[0-9]$/;
  const signs = ['+', '-', 'x', '/'];
  let activeSignSubstract = false;
  let activeDot = false;

  document.addEventListener('click', (e) => {
    const $btnSelected = e.target.value;
    const $display = $screen.textContent;

    if ($btnSelected === 'AC') {
      $screen.textContent = '0';
      activeSignSubstract = false;
      activeDot = false;
      return;
    }

    if ($btnSelected === '+/-' && !isNaN(parseFloat($display))) {
      const parserValue = parseFloat($display);
      $screen.textContent = parserValue * -1;
      return;
    }

    if ($btnSelected === '%' && !isNaN(parseFloat($display))) {
      let percentaje = 100;
      const ans = parseFloat($display) / percentaje;
      const ansToString = ans.toString();
      if (ansToString.includes('.')) activeDot = true;
      $screen.textContent = ans;
      return;
    }

    if ($btnSelected === 'DEL') {
      const sizeDisplay = $screen.textContent.length;
      const lastValue = $screen.textContent.at(-1);
      const prevLastValue = $screen.textContent.at(-2);
      const newDisplay = $display.slice(0, sizeDisplay - 1);

      /* Validate when the length is equal to one o screen is zero */
      if ($display === '0') return;
      if ($display.length === 1) return ($screen.textContent = '0');

      /* Control sign substract, for no repeat */
      if (regexNumbers.test(lastValue) && prevLastValue === '-') {
        activeSignSubstract = true;
      }

      if (lastValue === '-') {
        activeSignSubstract = false;
      }

      /* Control sign dot, for no repeat */
      if (lastValue === '.') {
        activeDot = false;
      }

      /* If there is sign in last value and activeDot is false, will change */
      if (signs.includes(lastValue) && !activeDot) {
        activeDot = true;
      }

      $screen.textContent = newDisplay;
      return;
    }

    /* All numbers */
    if (regexNumbers.test($btnSelected)) {
      if ($display === '0' && $display.length === 1) $screen.textContent = '';
      $screen.textContent += $btnSelected;
      activeSignSubstract = false;
      return;
    }

    /* All signs */
    if (signs.includes($btnSelected)) {
      /* Active dot */
      activeDot = false;

      /* Sign Substract */
      if ($display.length === 1 && $btnSelected === '-' && $display === '0') {
        $screen.textContent = $btnSelected;
        return;
      }

      /* Just active sign substract when not exist */
      if (!activeSignSubstract) {
        activeSignSubstract = true;
        $screen.textContent += $btnSelected;
        return;
      }
    }

    if ($btnSelected === '.' && !activeDot) {
      activeDot = true;
      $screen.textContent += $btnSelected;
    }

    if ($btnSelected === '=') {
      if (signs.includes($display.at(-1))) {
        alert('Error en la operación');
        $screen.textContent = $display.slice(0, -1);
        activeSignSubstract = false;
        return;
      }

      if (!/[+x/-]/.test($display)) return;

      const calc = new Calculator($screen.textContent);
      const res = calc.calculate();
      if (!res) return alert('Corrige tu operación!!!');
      /* Active dot for decimal results */
      activeDot = res.toString().includes('.');
      $screen.textContent = res;
    }
  });
};

document.addEventListener('DOMContentLoaded', (e) => {
  calculatorApp('screen');
});
