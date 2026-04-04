const headerRoot = document.getElementById('header-root');

const headerElement = document.createElement('header');
headerElement.style.cssText = `
  display: flex;
  justify-content: center; 
  align-items: center;
  padding: 15px 40px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  font-family: "Montserrat Alternates", sans-serif;
  width: 100%;
  box-sizing: border-box;
`;
headerRoot.appendChild(headerElement);

const logoBox = document.createElement('div');
logoBox.style.cssText = `
  display: flex;
  align-items: center;
  gap: 10px;
`;
headerElement.appendChild(logoBox);

const logoIcon = document.createElement('div');
logoIcon.innerHTML = `
  <svg width="40" height="34" viewBox="0 0 45 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 28.5L4.5 19.5L12.5 10.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M32.5 10.5L40.5 19.5L32.5 28.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M25.5 6.5L19.5 32.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;
logoBox.appendChild(logoIcon);

const logoText = document.createElement('div');
logoText.innerHTML = `
  <div style="font-size: 18px; font-weight: 600; color: #333; line-height: 1;">Coding</div>
  <div style="font-family: 'Sacramento', cursive; font-size: 16px; color: #666; margin-left: 10px;">Magic</div>
`;
logoBox.appendChild(logoText);

const navElement = document.createElement('nav');
navElement.style.cssText = `
  display: flex;
  gap: 35px;
  margin: 0 100px; /* ТУТ ФІКСОВАНА ВІДСТАНЬ: 100px від лого і 100px від перемикача */
`;
headerElement.appendChild(navElement);

const menuItems = [
  { name: 'Інтерактив', hasArrow: true },
  { name: 'Наша команда', hasArrow: false },
  { name: 'Контакти', hasArrow: false },
];

menuItems.forEach(item => {
  const a = document.createElement('a');
  a.href = '#';
  a.style.cssText = `text-decoration: none; color: #333; font-size: 14px; display: flex; align-items: center; gap: 5px;`;
  a.textContent = item.name;

  if (item.hasArrow) {
    const arrow = document.createElement('span');
    arrow.innerHTML = `<svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    a.appendChild(arrow);
  }
  navElement.appendChild(a);
});

const rightBox = document.createElement('div');
rightBox.style.cssText = `
  display: flex;
  align-items: center;
  gap: 20px;
`;
headerElement.appendChild(rightBox);

const themeToggle = document.createElement('div');
themeToggle.style.cssText = `width: 44px; height: 22px; background-color: #8a8a8a; border-radius: 12px; position: relative; cursor: pointer; transition: 0.3s;`;

const circle = document.createElement('div');
circle.style.cssText = `width: 18px; height: 18px; background-color: #fff; border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: 0.3s; display: flex; align-items: center; justify-content: center; font-size: 10px;`;
circle.textContent = '☀️';
themeToggle.appendChild(circle);

const greeting = document.createElement('span');
greeting.textContent = 'Вітаємо, User!';
greeting.style.fontSize = '14px';

rightBox.append(themeToggle, greeting);

// Логіка перемикання теми
let isDarkMode = false;
themeToggle.onclick = () => {
  isDarkMode = !isDarkMode;
  circle.style.left = isDarkMode ? '24px' : '2px';
  circle.textContent = isDarkMode ? '🌙' : '☀️';
  themeToggle.style.backgroundColor = isDarkMode ? '#4a4a4a' : '#8a8a8a';
  headerElement.style.backgroundColor = isDarkMode ? '#222' : '#fff';
};
