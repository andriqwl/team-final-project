const yearRoot = document.querySelector('#super-section');

if (yearRoot) {
  if (!document.querySelector('style[data-dom-section="year-check"]')) {
    const style = document.createElement('style');
    style.setAttribute('data-dom-section', 'year-check');
    style.textContent = `
      .yr-container{width:720px;max-width:100%;margin:0 auto;box-sizing:border-box}
      .yr-wrap{max-width:720px;margin:36px auto 0;font-family:"Montserrat Alternates",sans-serif}
      .yr-title{margin:0 0 36px;text-align:center;font-size:16px;font-weight:400;line-height:1;color:#000}
      .yr-row{display:flex;align-items:center;justify-content:space-between;gap:24px;width:100%}
      .yr-controls{display:flex;align-items:center;filter:drop-shadow(3px 3px 0 rgba(0,0,0,.25))}
      .yr-input{
        box-sizing:border-box;width:215px;height:35px;padding:0 10px;border:none;border-radius:20px 0 0 20px;
        background:#d7d7d7;color:#000;font-size:12px;line-height:1;outline:none
      }
      .yr-input::placeholder{color:#7e7e7e}
      .yr-input[type=number]::-webkit-outer-spin-button,
      .yr-input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
      .yr-btn{box-sizing:border-box;width:35px;height:35px;border:none;border-radius:0 20px 20px 0;background:#000;cursor:pointer;position:relative}
      .yr-btn::before{content:"";position:absolute;left:10px;top:9px;width:8px;height:8px;border:2px solid #fff;border-radius:50%}
      .yr-btn::after{content:"";position:absolute;left:19px;top:18px;width:6px;height:2px;background:#fff;transform:rotate(45deg);transform-origin:left center}
      .yr-result{min-height:15px;margin:0;font-size:12px;line-height:1;text-align:right}
      .yr-divider{width:536px;height:0;border-top:1px solid #000;margin:36px auto 0}
    `;
    document.head.appendChild(style);
  }

  yearRoot.innerHTML = `
    <div class="yr-container">
      <div class="yr-wrap">
        <h2 class="yr-title">Перевір в який рік ти народився</h2>
        <div class="yr-row">
          <div class="yr-controls">
            <input class="yr-input" type="number" placeholder="Введіть рік народження" />
            <button class="yr-btn" type="button"></button>
          </div>
          <p class="yr-result"></p>
        </div>
        <div class="yr-divider"></div>
      </div>
    </div>
  `;

  const input = yearRoot.querySelector('.yr-input');
  const button = yearRoot.querySelector('.yr-btn');
  const result = yearRoot.querySelector('.yr-result');

  function checkYear() {
    const value = input.value.trim();
    const year = Number(value);

    if (!value || Number.isNaN(year) || !Number.isInteger(year) || year < 1) {
      result.style.color = '#D11A2A';
      result.textContent = 'Введіть коректний рік.';
      return;
    }

    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    if (isLeap) {
      result.style.color = '#039900';
      result.textContent = 'Ви народилися у високосний рік!';
    } else {
      result.style.color = '#D11A2A';
      result.textContent = 'Ви народилися не у високосний рік.';
    }
  }

  button.addEventListener('click', checkYear);
  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      checkYear();
    }
  });
}
