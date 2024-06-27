const regexNumbers = /^[0-9]$/;
const signals = ['+', '-', 'x', '/'];

const convertOperation = () => {};

const disabledButtons = () => {};

const calculatorApp = (screen) => {
  const $screen = document.getElementById(screen);
  let activeSignal = false;

  document.addEventListener('click', (e) => {
    const $val = e.target.value;
    const $display = $screen.textContent;

    if ($val === 'AC') {
      $screen.textContent = '0';
      activeSignal = false;
      return;
    }

    if ($val === '+/-' && !isNaN(parseFloat($display))) {
      const parserValue = parseFloat($display);
      $screen.textContent = parserValue * -1;
    }

    if ($val === '%' && !isNaN(parseFloat($display))) {
      let percentaje = 100;
      const ans = parseFloat($display) / percentaje;
      $screen.textContent = ans;
    }

    if ($val === 'DEL') {
      const sizeDisplay = $screen.textContent.length;
      const lastValue = $screen.textContent.at(-1);
      const newDisplay = $display.slice(0, sizeDisplay - 1);
      /* (1) For validate in cases with ..-e10, etc. */
      if ((lastValue === '-' && !newDisplay.includes('-')) || signals.includes(lastValue)) {
        activeSignal = false;
      }
      if (sizeDisplay === 1 && $screen.textContent !== '-') return ($screen.textContent = '0');
      $screen.textContent = newDisplay;
    }

    /* All numbers */
    if (regexNumbers.test($val)) {
      if ($display[0] === '0' && $display.length === 1) $screen.textContent = '';
      $screen.textContent += $val;
      activeSignal = false;
      return;
    }
    h;
    /* All signals */
    if (signals.includes($val)) {
      if ($display.length === 1 && $val === '-') {
        $screen.textContent = $val;
        return;
      }

      /* Just active signals when not exist */
      if (!activeSignal && signals.includes($val)) {
        activeSignal = true;
        $screen.textContent += $val;
      }
    }

    if ($val === '=') {
      if (signals.includes($display.at(-1))) return alert('Error en la operación');
    }
  });
};

document.addEventListener('DOMContentLoaded', (e) => {
  calculatorApp('screen');
});
