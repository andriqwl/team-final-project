const headerRoot = document.getElementById('header-root');

const sections = [
  { name: 'Перевірка року', href: '#super-section' },
  { name: 'Google Динозавр', href: '#google-dino-root' },

  { name: 'Вгадай число', href: '#guess-number-root' },
  { name: 'Футбол', href: '#soccer-root' },

  { name: 'Камінь, ножиці, папір', href: '#rock-paper-scissors-root' },
  { name: 'Введіть 3 числа', href: '#three-numbers-root' },

  { name: 'Калькулятор', href: '#calc-root' },
  { name: 'Наша команда', href: '#our-team-root' },

  { name: 'Калькулятор часу', href: '#time-calc-root' },
  { name: 'Обери вченого', href: '#choose-scientist-root' },
];

const headerElement = document.createElement('header');
headerElement.style.cssText = `
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 15px 60px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  font-family: "Montserrat Alternates", sans-serif;
  width: 100%;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
`;
headerRoot.appendChild(headerElement);

const logoBox = document.createElement('div');
logoBox.style.cssText = `display: flex; align-items: center; gap: 10px; cursor: pointer;`;
logoBox.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
headerElement.appendChild(logoBox);

const logoIcon = document.createElement('div');
logoIcon.innerHTML = `<svg width="40" height="34" viewBox="0 0 45 38" fill="none"><path d="M12.5 28.5L4.5 19.5L12.5 10.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M32.5 10.5L40.5 19.5L32.5 28.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M25.5 6.5L19.5 32.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
logoBox.appendChild(logoIcon);

const logoText = document.createElement('div');
logoText.innerHTML = `<div style="font-size: 18px; font-weight: 600; color: #333; line-height: 1;">Coding</div><div style="font-family: 'Sacramento', cursive; font-size: 16px; color: #666; margin-left: 10px;">Magic</div>`;
logoBox.appendChild(logoText);

const navElement = document.createElement('nav');
navElement.style.cssText = `display: flex; gap: 35px; align-items: center;`;
headerElement.appendChild(navElement);

const dropdown = document.createElement('div');
dropdown.style.cssText = `
  position: absolute;
  top: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%) translateY(-20px);
  background: white;
  border: 1px solid #e0e0e0;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  border-radius: 16px;
  display: grid;
  grid-template-columns: repeat(2, 220px);
  gap: 8px;
  padding: 20px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: none;
`;

sections.forEach(sec => {
  const link = document.createElement('a');
  link.href = sec.href;
  link.textContent = sec.name;
  link.style.cssText = `
    padding: 12px 18px;
    text-decoration: none;
    color: #333;
    font-size: 14px;
    border-radius: 10px;
    transition: 0.3s;
    display: block;
  `;
  link.onmouseover = () => (link.style.background = '#f4f4f4');
  link.onmouseout = () => (link.style.background = 'transparent');
  link.onclick = () => toggleMenu(false);
  dropdown.appendChild(link);
});

function toggleMenu(show) {
  if (show) {
    dropdown.style.opacity = '1';
    dropdown.style.visibility = 'visible';
    dropdown.style.transform = 'translateX(-50%) translateY(0)';
    dropdown.style.pointerEvents = 'auto';
  } else {
    dropdown.style.opacity = '0';
    dropdown.style.visibility = 'hidden';
    dropdown.style.transform = 'translateX(-50%) translateY(-20px)';
    dropdown.style.pointerEvents = 'none';
  }
}

const menuItems = [
  { name: 'Інтерактив', isDropdown: true },
  { name: 'Наша команда', link: '#our-team-root' },
  { name: 'Контакти', link: '#footer' },
];

menuItems.forEach(item => {
  const wrapper = document.createElement('div');
  wrapper.style.position = 'relative';

  const a = document.createElement('a');
  a.href = item.link || '#';
  a.style.cssText = `text-decoration: none; color: #333; font-size: 15px; font-weight: 500; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: 0.3s;`;
  a.textContent = item.name;

  if (item.isDropdown) {
    const arrow = document.createElement('span');
    arrow.style.transition = '0.4s';
    arrow.innerHTML = `<svg width="12" height="8" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    a.appendChild(arrow);
    wrapper.appendChild(dropdown);

    a.onclick = e => {
      e.preventDefault();
      const isOpen = dropdown.style.visibility === 'visible';
      toggleMenu(!isOpen);
      arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    };
  }

  wrapper.appendChild(a);
  navElement.appendChild(wrapper);
});

window.addEventListener('click', e => {
  if (!navElement.contains(e.target)) {
    toggleMenu(false);
    const arrows = navElement.querySelectorAll('span');
    arrows.forEach(arrow => (arrow.style.transform = 'rotate(0deg)'));
  }
});

const rightBox = document.createElement('div');
rightBox.style.cssText = `display: flex; align-items: center; gap: 20px;`;
headerElement.appendChild(rightBox);

const themeToggle = document.createElement('div');
themeToggle.style.cssText = `width: 50px; height: 26px; background-color: #8a8a8a; border-radius: 20px; position: relative; cursor: pointer; transition: 0.4s;`;

const circle = document.createElement('div');
circle.style.cssText = `width: 22px; height: 22px; background-color: #fff; border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: 0.4s; display: flex; align-items: center; justify-content: center; font-size: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);`;
circle.textContent = '☀️';
themeToggle.appendChild(circle);

const greeting = document.createElement('span');
greeting.textContent = 'Вітаємо, User!';
greeting.style.cssText = `font-size: 14px; font-weight: 500; color: #333; transition: 0.3s;`;

rightBox.append(themeToggle, greeting);

let isDarkMode = false;
themeToggle.onclick = () => {
  isDarkMode = !isDarkMode;
  circle.style.left = isDarkMode ? '26px' : '2px';
  circle.textContent = isDarkMode ? '🌙' : '☀️';
  themeToggle.style.backgroundColor = isDarkMode ? '#4a90e2' : '#8a8a8a';
  headerElement.style.backgroundColor = isDarkMode ? '#121212' : '#fff';
  headerElement.style.borderBottomColor = isDarkMode ? '#222' : '#e0e0e0';

  const textColor = isDarkMode ? '#fff' : '#333';
  greeting.style.color = textColor;
  dropdown.style.backgroundColor = isDarkMode ? '#1e1e1e' : '#fff';
  dropdown.style.borderColor = isDarkMode ? '#333' : '#e0e0e0';

  navElement.querySelectorAll('a').forEach(link => {
    link.style.color = textColor;
    link.onmouseover = () =>
      (link.style.background = isDarkMode ? '#2d2d2d' : '#f4f4f4');
    link.onmouseout = () => (link.style.background = 'transparent');
  });

  logoText.querySelector('div').style.color = textColor;
  logoIcon
    .querySelectorAll('path')
    .forEach(p => p.setAttribute('stroke', textColor));
};
