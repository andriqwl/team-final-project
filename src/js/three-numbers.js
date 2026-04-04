// СЕКЦИЯ "Введіть 3 числа"
const biggestNumberRoot = document.querySelector('#three-numbers-root');

if (biggestNumberRoot) {
  const ensureStyles = () => {
    if (document.querySelector('style[data-dom-section="three-numbers"]')) return;
    const style = document.createElement('style');
    style.setAttribute('data-dom-section', 'three-numbers');
    // CSS
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400&display=swap');
      .bn-wrap{max-width:760px;margin:24px auto;padding:36px 0 0;background:transparent}
      .bn-title{
        margin:0 0 36px;
        color:#000;
        font-family:"Montserrat Alternates", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-size:16px;
        font-style:normal;
        font-weight:400;
        line-height:normal;
        text-align:center;
      }
      .bn-form{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-start;justify-content:center}
      .bn-input{
        display:inline-flex;
        padding:10px 20px;
        align-items:flex-start;
        gap:10px;
        border:0;
        border-radius:20px;
        background:#D7D7D7;
        box-shadow:3px 3px 0 0 rgba(0,0,0,.25);
        color:#7E7E7E;
        font-family:"Montserrat Alternates", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-size:12px;
        font-style:normal;
        font-weight:400;
        line-height:normal;
        outline:none;
        min-width:160px;
      }
      .bn-input::placeholder{color:#7E7E7E;opacity:1}
      .bn-result{
        margin:36px 0 0;
        color:#000;
        font-family:"Montserrat Alternates", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-size:12px;
        font-style:normal;
        font-weight:400;
        line-height:normal;
        text-align:center;
      }
      .bn-divider{width:536px;height:0;border-top:1px solid #000;margin:36px auto 0}
    `;
    document.head.appendChild(style);
  };
// создание элемента с классом и текстом
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  ensureStyles();
  // чистка контейнера
  biggestNumberRoot.textContent = '';

  const wrap = el('div', 'bn-wrap');
  const title = el('h2', 'bn-title', 'Введіть 3 числа');

  // инпуты тайп-текст
  const form = el('form', 'bn-form');
  const inputA = document.createElement('input');
  inputA.className = 'bn-input';
  inputA.type = 'text';
  inputA.inputMode = 'decimal';
  inputA.placeholder = 'Введіть число';

  const inputB = document.createElement('input');
  inputB.className = 'bn-input';
  inputB.type = 'text';
  inputB.inputMode = 'decimal';
  inputB.placeholder = 'Введіть число';

  const inputC = document.createElement('input');
  inputC.className = 'bn-input';
  inputC.type = 'text';
  inputC.inputMode = 'decimal';
  inputC.placeholder = 'Введіть число';

  const result = el('p', 'bn-result', '');
  result.hidden = true;
  const divider = el('div', 'bn-divider');

  form.append(inputA, inputB, inputC);
  wrap.append(title, form, result, divider);
  biggestNumberRoot.appendChild(wrap);

  // фильтр ввода
  const parseNum = (raw) => {
    const s = String(raw ?? '').trim().replace(',', '.');
    if (!s) return null;
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  };

  // обновление результата
  const update = () => {
    const values = [parseNum(inputA.value), parseNum(inputB.value), parseNum(inputC.value)].filter((v) => v != null);
    if (values.length === 0) {
      result.hidden = true;
      result.textContent = '';
      return;
    }
    const maxValue = Math.max(...values);
    result.hidden = false;
    result.textContent = `Найбільше число, яке ви ввели - "${maxValue}"`;
  };

  // максимум обновляется мгновенно
  for (const inp of [inputA, inputB, inputC]) inp.addEventListener('input', update);
  form.addEventListener('submit', (e) => e.preventDefault());
  // запуск
  update();
}
