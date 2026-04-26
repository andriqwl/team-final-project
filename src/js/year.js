const yearRoot = document.getElementById('year');

// Очищаємо root, щоб нічого не дублювалося
yearRoot.innerHTML = '';

// 1. Контейнер секції (центрування)
const yearContainer = document.createElement('div');
yearContainer.style.cssText = `
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  font-family: var(--font-family);
  width: 100%;
`;

// 2. Заголовок
const yearTitle = document.createElement('h2');
yearTitle.textContent = 'Перевір в який рік ти народився';
yearTitle.style.cssText = `
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 25px;
  color: #000;
  text-align: center;
`;

// 3. Ряд для інпуту та результату
const controlsWrapper = document.createElement('div');
controlsWrapper.style.cssText = `
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

// 4. Поле введення (компактне)
const inputGroup = document.createElement('div');
inputGroup.style.cssText = `
  display: flex;
  background: #E0E0E0;
  border-radius: 25px;
  overflow: hidden;
  height: 40px;
  width: 260px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
`;

const yearInput = document.createElement('input');
yearInput.type = 'number';
yearInput.placeholder = 'Введіть рік';
yearInput.style.cssText = `
  flex: 1;
  border: none;
  background: transparent;
  padding: 0 15px;
  outline: none;
  font-size: 14px;
  font-family: var(--font-family);
`;

const searchBtn = document.createElement('button');
searchBtn.style.cssText = `
  width: 45px;
  background: #000;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
searchBtn.innerHTML = `
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
`;

// 5. Текст результату
const resultDisplay = document.createElement('p');
resultDisplay.style.cssText = `
  margin: 0;
  font-size: 16px;
  min-width: 250px;
  height: 40px;
  display: flex;
  align-items: center;
  color: #FF1E1E;
  font-family: var(--font-family);
`;

// 6. Нижній розділювач (Divider)
const divider = document.createElement('div');
divider.style.cssText = `
  width: 536px;
  height: 0;
  border-top: 1px solid #000;
  margin-top: 36px;
`;

// ЗБІРКА
inputGroup.append(yearInput, searchBtn);
controlsWrapper.append(inputGroup, resultDisplay);

yearContainer.appendChild(yearTitle);
yearContainer.appendChild(controlsWrapper);
yearContainer.appendChild(divider); // Додаємо лінію в самий ніч секції

yearRoot.appendChild(yearContainer);

// 7. Логіка
function checkLeapYear() {
  const year = parseInt(yearInput.value);

  if (!yearInput.value) {
    resultDisplay.textContent = 'Введіть рік';
    resultDisplay.style.color = '#999';
    return;
  }

  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  if (isLeap) {
    resultDisplay.textContent = 'Ви народилися у високосний рік!';
    resultDisplay.style.color = '#54B435';
  } else {
    resultDisplay.textContent = 'Ви народилися у звичайний рік';
    resultDisplay.style.color = '#FF1E1E';
  }
}

// Події
searchBtn.addEventListener('click', checkLeapYear);
yearInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') checkLeapYear();
});
