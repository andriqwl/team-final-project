(function () {
  const root = document.getElementById('calc-root');
  root.setAttribute('data-category', 'numerical');

  let selectedOp = '+';
<<<<<<< HEAD
=======

  root.style.display = 'flex';
  root.style.flexDirection = 'column';
  root.style.alignItems = 'center';
  root.style.backgroundColor = 'rgba(255, 255, 255, 0.85)'; // Білий прозорий фон
  root.style.borderRadius = '30px';
  root.style.margin = '36px auto 36px auto';
  // root.style.paddingBottom = '40px';
  root.style.maxWidth = '1100px';
  root.style.backdropFilter = 'blur(10px)';

>>>>>>> a3b54ef7c4ce2c37b2f4a72a13a9fa16bd6291d7
  const spinnerStyle = document.createElement('style');
  spinnerStyle.textContent =
    'input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0;}input[type=number]{-moz-appearance:textfield;}';
  document.head.appendChild(spinnerStyle);

  const title = document.createElement('h1');
  title.id = 'calc-title'; // ТУТ
  title.textContent = 'Калькулятор';
  title.style.fontFamily = 'var(--font-family)';
  title.style.fontWeight = '400';
  title.style.fontSize = '16px';
  title.style.color = '#000';
<<<<<<< HEAD
  title.style.margin = '36px 0';
  title.style.textAlign = 'center';
  title.style.width = '100%';
=======
  title.style.margin = '0 0 36px 0';
>>>>>>> a3b54ef7c4ce2c37b2f4a72a13a9fa16bd6291d7

  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.alignItems = 'center';
  row.style.justifyContent = 'center';
  row.style.padding = '0 20px 0px';

  function styleInput(el) {
    el.style.width = '135px';
    el.style.height = '35px';
    el.style.borderRadius = '999px';
    el.style.border = 'none';
    el.style.background = '#d7d7d7';
    el.style.fontSize = '12px';
    el.style.textAlign = 'center';
    el.style.padding = '0 16px';
    el.style.outline = 'none';
    el.style.boxSizing = 'border-box';
    el.style.fontFamily = 'var(--font-family)';
    el.style.color = '#333';
    el.style.boxShadow = '3px 3px 0 0 rgba(0,0,0,0.25)';
  }

  function inputEl(placeholder) {
    const el = document.createElement('input');
    el.type = 'number';
    el.placeholder = placeholder;
    styleInput(el);
    return el;
  }

  const a = inputEl('Введіть число');
  const b = inputEl('Введіть число');

  const ops = document.createElement('div');
  ops.style.display = 'grid';
  ops.style.gridTemplateColumns = '1fr 1fr';
  ops.style.gap = '10px';
  ops.style.marginLeft = '40px';
  ops.style.marginRight = '40px';

  const shadowOn = '3px 3px 0 0 rgba(0,0,0,0.25)';
  const shadowPressed = '1px 1px 0 0 rgba(0,0,0,0.25)';

  function styleBtn(btn) {
    btn.style.width = '25px';
    btn.style.height = '25px';
    btn.style.borderRadius = '50%';
    btn.style.border = 'none';
    btn.style.background = '#111';
    btn.style.color = '#fff';
    btn.style.fontSize = '12px';
    btn.style.cursor = 'pointer';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.fontFamily = 'var(--font-family)';
    btn.style.boxShadow = shadowOn;
    btn.style.transition = 'transform 0.1s, box-shadow 0.1s';
    btn.style.userSelect = 'none';
  }

  function pressAnim(btn) {
    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'translate(2px, 2px)';
      btn.style.boxShadow = shadowPressed;
    });
    btn.addEventListener('mouseup', () => {
      btn.style.transform = 'translate(0, 0)';
      btn.style.boxShadow = shadowOn;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btn.style.boxShadow = shadowOn;
    });
  }

  const opBtns = {};
  ['+', '*', '-', '/'].forEach(sym => {
    const btn = document.createElement('button');
    btn.textContent = sym;
    styleBtn(btn);
    pressAnim(btn);
    btn.addEventListener('click', () => {
      selectedOp = sym;
    });
    opBtns[sym] = btn;
    ops.appendChild(btn);
  });

  const eq = document.createElement('button');
  eq.textContent = '=';
  styleBtn(eq);
  pressAnim(eq);
  eq.style.marginLeft = '40px';
  eq.style.marginRight = '40px';

  const result = document.createElement('div');
  result.id = 'calc-result-box';
  result.textContent = 'Результат';
  result.style.width = '135px';
  result.style.height = '35px';
  result.style.borderRadius = '999px';
  result.style.border = 'none';
  result.style.background = '#d7d7d7';
  result.style.fontSize = '12px';
  result.style.textAlign = 'center';
  result.style.display = 'flex';
  result.style.alignItems = 'center';
  result.style.justifyContent = 'center';
  result.style.color = '#999';
  result.style.fontFamily = 'var(--font-family)';
  result.style.boxShadow = '3px 3px 0 0 rgba(0,0,0,0.25)';

  eq.addEventListener('click', () => {
    const va = parseFloat(a.value);
    const vb = parseFloat(b.value);
    if (isNaN(va) || isNaN(vb)) {
      result.textContent = 'Помилка';
      result.style.color = '#c00';
      return;
    }
    let res;
    if (selectedOp === '+') res = va + vb;
    else if (selectedOp === '-') res = va - vb;
    else if (selectedOp === '*') res = va * vb;
    else res = vb !== 0 ? va / vb : null;
    if (res === null) {
      result.textContent = 'Помилка';
      result.style.color = '#c00';
      return;
    }
    result.style.color = '#333';
    result.textContent = parseFloat(res.toFixed(10)).toString();
  });

  row.appendChild(a);
  row.appendChild(ops);
  row.appendChild(b);
  row.appendChild(eq);
  row.appendChild(result);

  root.appendChild(title);
  root.appendChild(row);

  const dividerrr = document.createElement('div');
  dividerrr.id = 'calc-divider';
  dividerrr.style.width = '536px';
  dividerrr.style.height = '0';
  dividerrr.style.borderTop = '1px solid #000';
  dividerrr.style.margin = '36px auto 0';

  root.appendChild(dividerrr);
})();
