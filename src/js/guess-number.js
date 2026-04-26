const guessNumberRoot = document.querySelector('#guess-number-root');

if (guessNumberRoot) {
  guessNumberRoot.innerHTML = '';

  const section = document.createElement('div');
  section.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px 0;
        // font-family: 'Montserrat', sans-serif;
        width: 100%;
    `;

  const title = document.createElement('h2');
  title.textContent = 'Вгадай число, яке загадав комп’ютер';
  title.style.cssText = `
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 25px;
        color: #000;
        text-align: center;
    `;

  const gameRow = document.createElement('div');
  gameRow.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        width: 100%;
    `;

  const inputGroup = document.createElement('div');
  inputGroup.style.cssText = `
        display: flex;
        background: #E0E0E0;
        border-radius: 25px;
        overflow: hidden;
        height: 40px;
        width: 260px;
    `;

  const input = document.createElement('input');
  input.type = 'number';
  input.placeholder = 'Введіть число';
  input.style.cssText = `
        flex: 1;
        border: none;
        background: transparent;
        padding: 0 15px;
        outline: none;
        font-size: 14px;
    `;

  const button = document.createElement('button');
  button.style.cssText = `
        width: 45px;
        background: #000;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
  button.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    `;

  const result = document.createElement('p');
  result.style.cssText = `
        margin: 0;
        font-size: 16px;
        min-width: 280px;
        height: 40px;
        display: flex;
        align-items: center;
    `;

  const bottomDivider = document.createElement('div');
  bottomDivider.style.cssText = `
        width: 536px;
        height: 0;
        border-top: 1px solid #000;
        margin-top: 36px;
    `;

  inputGroup.append(input, button);
  gameRow.append(inputGroup, result);
  section.append(title, gameRow, bottomDivider);
  guessNumberRoot.appendChild(section);

  let computerNumber = Math.floor(Math.random() * 10) + 1;

  function check() {
    const userNumber = Number(input.value);

    if (!input.value) {
      result.textContent = 'Введіть число від 1 до 10';
      result.style.color = '#999';
      return;
    }

    if (userNumber === computerNumber) {
      result.textContent = `Вітаю, ви вгадали! (${computerNumber})`;
      result.style.color = '#54B435';
      setTimeout(() => {
        computerNumber = Math.floor(Math.random() * 10) + 1;
        input.value = '';
        result.textContent = '';
      }, 2000);
    } else {
      result.textContent = `Програш, було загадано (${computerNumber})`;
      result.style.color = '#FF1E1E';
      computerNumber = Math.floor(Math.random() * 10) + 1;
    }
  }

  button.addEventListener('click', check);
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') check();
  });
}
