const headerRoot = document.getElementById('header-root');

const categories = [
  { id: 'numerical', label: 'Числовий' },
  { id: 'game', label: 'Ігровий' },
  { id: 'acquaintance', label: 'Ознайомчий' },
];

let isDarkMode = localStorage.getItem('theme') === 'dark';

const headerElement = document.createElement('header');
headerElement.style.cssText = `
  display: flex; justify-content: space-between; align-items: center;
  padding: 15px 20%; background-color: #fff; border-bottom: 1px solid #e0e0e0;
  font-family: "Montserrat Alternates", sans-serif; width: 100%;
  box-sizing: border-box; position: sticky; top: 0; z-index: 1000; transition: all 0.3s ease;
`;
headerRoot.appendChild(headerElement);

// Логотип
const logoBox = document.createElement('div');
logoBox.style.cssText = `display: flex; align-items: center; gap: 10px; cursor: pointer;`;
logoBox.onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  filterGames('all');
};
headerElement.appendChild(logoBox);

const logoIcon = document.createElement('div');
logoIcon.innerHTML = `<svg width="40" height="34" viewBox="0 0 45 38" fill="none"><path d="M12.5 28.5L4.5 19.5L12.5 10.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M32.5 10.5L40.5 19.5L32.5 28.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M25.5 6.5L19.5 32.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
logoBox.appendChild(logoIcon);

const logoText = document.createElement('div');
logoText.innerHTML = `<div style="font-size: 18px; font-weight: 600; color: #333; line-height: 1; transition: 0.3s;">Coding</div><div style="font-family: 'Sacramento', cursive; font-size: 16px; color: #666; margin-left: 10px;">Magic</div>`;
logoBox.appendChild(logoText);

// Навігація та Dropdown
const navElement = document.createElement('nav');
navElement.style.cssText = `display: flex; gap: 35px; align-items: center;`;
headerElement.appendChild(navElement);

const dropdown = document.createElement('div');
dropdown.style.cssText = `position: absolute; top: calc(100% + 15px); left: 50%; transform: translateX(-50%) translateY(-20px); background: white; border: 1px solid #e0e0e0; box-shadow: 0 15px 35px rgba(0,0,0,0.1); border-radius: 16px; display: flex; flex-direction: column; padding: 12px; gap: 5px; opacity: 0; visibility: hidden; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); pointer-events: none; min-width: 180px;`;

function filterGames(categoryId) {
  // 1. Фільтруємо всі ігрові секції
  document.querySelectorAll('section[data-category]').forEach(s => {
    const isMatch =
      categoryId === 'all' || s.getAttribute('data-category') === categoryId;
    s.style.display = isMatch ? '' : 'none';
  });

  // 2. Спеціальна логіка для блоку команди
  const ourTeam = document.querySelector('#our-team-root');
  if (ourTeam) {
    // Команда показується ТІЛЬКИ в "all" (головна) або в "acquaintance" (ознайомчий)
    if (categoryId === 'all' || categoryId === 'acquaintance') {
      ourTeam.style.display = ''; // Повертає стиль з CSS (не block)
    } else {
      ourTeam.style.display = 'none';
    }
  }
}

const ourTeam = document.querySelector('#our-team-root');
if (ourTeam) {
  ourTeam.style.display = ''; // Повертає стандартний дисплей
}

categories.forEach(cat => {
  const btn = document.createElement('div');
  btn.textContent = cat.label;
  btn.style.cssText = `padding: 12px 20px; cursor: pointer; border-radius: 10px; font-size: 14px; font-weight: 500; transition: 0.3s; color: #333; text-align: center;`;
  btn.onmouseover = () =>
    (btn.style.background = isDarkMode ? '#3d3d3d' : '#f4f4f4');
  btn.onmouseout = () => (btn.style.background = 'transparent');
  btn.onclick = () => {
    filterGames(cat.id);
    toggleMenu(false);
  };
  dropdown.appendChild(btn);
});

function toggleMenu(show) {
  dropdown.style.opacity = show ? '1' : '0';
  dropdown.style.visibility = show ? 'visible' : 'hidden';
  dropdown.style.transform = show
    ? 'translateX(-50%) translateY(0)'
    : 'translateX(-50%) translateY(-20px)';
  dropdown.style.pointerEvents = show ? 'auto' : 'none';
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

// Правий бок (Тема)
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
greeting.textContent = `Вітаємо, ${localStorage.getItem('userName') || 'Гість'}!`;
greeting.style.cssText = `font-size: 14px; font-weight: 500; color: #333; transition: 0.3s;`;
rightBox.append(themeToggle, greeting);

themeToggle.onclick = () => {
  isDarkMode = !isDarkMode;
  applyTheme();
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
};

function applyTheme() {
  const textColor = isDarkMode ? '#fff' : '#333';
  const mainBg = isDarkMode ? '#434343' : 'rgba(255, 255, 255, 0.85)';
  const headFootBg = isDarkMode ? '#1a1a1a' : '#fff';
  const borderColor = isDarkMode ? '#333' : '#e0e0e0';
  const themeValues = {
    '--bg-main': isDarkMode ? '#121212' : 'rgba(255, 255, 255, 0.85)',
    '--bg-head-foot': isDarkMode ? '#1a1a1a' : '#fff',
    '--bg-input': isDarkMode ? '#2d2d2d' : '#e8e8e8',
    '--text-primary': isDarkMode ? '#ffffff' : '#333333',
    '--text-secondary': isDarkMode ? '#bbbbbb' : '#666666',
    '--border-color': isDarkMode ? '#333333' : '#e0e0e0',
    '--accent-color': isDarkMode ? '#4a90e2' : '#8a8a8a',
  };

  // MAIN
  const main = document.querySelector('main');
  if (main) {
    main.style.backgroundColor = mainBg;
    main.style.backdropFilter = isDarkMode ? 'none' : 'blur(10px)';
  }

  headerElement.style.backgroundColor = headFootBg;
  headerElement.style.borderBottomColor = borderColor;
  greeting.style.color = textColor;
  circle.style.left = isDarkMode ? '26px' : '2px';
  circle.textContent = isDarkMode ? '🌙' : '☀️';
  themeToggle.style.backgroundColor = isDarkMode ? '#4a90e2' : '#8a8a8a';
  dropdown.style.backgroundColor = isDarkMode ? '#222' : '#fff';
  dropdown.style.borderColor = borderColor;
  dropdown.querySelectorAll('div').forEach(d => (d.style.color = textColor));
  navElement.querySelectorAll('a').forEach(a => (a.style.color = textColor));
  logoText.querySelector('div').style.color = textColor;
  logoIcon
    .querySelectorAll('path')
    .forEach(p => p.setAttribute('stroke', textColor));

  // FOOTER
  const footer = document.getElementById('footer');
  if (footer) {
    footer.style.backgroundColor = headFootBg;
    footer.style.borderTop = `1px solid ${borderColor}`;
    footer
      .querySelectorAll('.footer-contact-item, .footer-note')
      .forEach(t => (t.style.color = isDarkMode ? '#bbb' : '#666'));
    const footerInput = footer.querySelector('.footer-input');
    if (footerInput) {
      footerInput.style.backgroundColor = isDarkMode ? '#2d2d2d' : '#fff';
      footerInput.style.color = textColor;
      footerInput.style.borderColor = borderColor;
    }
  }

  // CALCULATOR
  const calcRoot = document.getElementById('calc-root');
  const calcTitle = document.getElementById('calc-title');
  const calcDivider = document.getElementById('calc-divider');
  if (calcRoot) calcRoot.style.backgroundColor = 'transparent';
  if (calcTitle) calcTitle.style.color = textColor;
  if (calcDivider)
    calcDivider.style.borderTopColor = isDarkMode ? '#444' : '#000';

  // MODAL (SUB)
  const modal = document.querySelector('.sub-window');
  if (modal) {
    modal.style.backgroundColor = isDarkMode ? '#222' : '#fff';
    const modalTitle = modal.querySelector('h2');
    if (modalTitle) modalTitle.style.color = textColor;
    modal
      .querySelectorAll('.sub-icon svg')
      .forEach(s => (s.style.stroke = textColor));
    const closeBtn = modal.querySelector('.sub-close');
    if (closeBtn) closeBtn.style.color = textColor;
  }
}

applyTheme();
