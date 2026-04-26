(function () {
  const fontLink = document.createElement('link');
  fontLink.href =
    'https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;500;600&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.4); z-index: 2000;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; visibility: hidden; transition: 0.4s;
    }
    .modal-overlay.active { opacity: 1; visibility: visible; }
    .modal-window {
      background: var(--main-bg, #fff);
      width: 576px; height: 316px;
      border-radius: 30px; position: relative;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      box-shadow: 0 15px 40px rgba(0,0,0,0.15);
      transform: translateY(-100vh); 
      transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), width 0.4s ease, height 0.4s ease;
      font-family: 'Montserrat Alternates', sans-serif;
      overflow: hidden;
    }
    .modal-window.active { transform: translateY(0); }
    .modal-icon { position: absolute; opacity: 0.7; color: var(--main-text, #000); transition: all 0.4s ease; }
  `;
  document.head.appendChild(styleEl);

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  const modal = document.createElement('div');
  modal.className = 'modal-window';

  const closeBtn = document.createElement('div');
  closeBtn.innerHTML = '&#10005;';
  closeBtn.style.cssText =
    'position: absolute; top: 20px; right: 25px; cursor: pointer; font-size: 18px; color: var(--main-text, #000); z-index: 11;';
  closeBtn.onclick = closeModal;

  // Іконки
  const iconPaths = [
    '<svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 13l2 2"/></svg>',
    '<svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/><path d="M13.5 13.5l3 3M16.5 13.5l-3 3"/></svg>',
    '<svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0M12 9v6M9 12h6"/></svg>',
    '<svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
  ];

  const iconElements = iconPaths.map(html => {
    const el = document.createElement('div');
    el.className = 'modal-icon';
    el.innerHTML = html;
    modal.appendChild(el);
    return el;
  });

  function positionIcons() {
    const side = '12%';
    const topV = '35%';
    iconElements[0].style.cssText = `left: ${side}; top: ${topV};`;
    iconElements[1].style.cssText = `right: ${side}; top: ${topV};`;
    iconElements[2].style.cssText = `left: ${side}; bottom: 25%;`;
    iconElements[3].style.cssText = `right: ${side}; bottom: 25%;`;
  }

  const content = document.createElement('div');
  content.style.cssText =
    'text-align: center; color: var(--main-text, #000); padding: 0 40px; z-index: 10;';

  function showStep1() {
    positionIcons();
    content.innerHTML = `
      <h2 style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">Привіт!</h2>
      <p style="font-size: 11px; margin-bottom: 5px;">Ви потрапили на сайт інтерактивних ігор та завдань</p>
      <p style="font-size: 11px; font-weight: 600; margin-bottom: 25px;">Бажаємо Вам гарно провести час!</p>
      <p style="font-size: 12px; margin-bottom: 10px;">Введіть своє ім’я:</p>
      <input type="text" id="modalInput" placeholder="Ваше ім'я..." style="width: 220px; height: 35px; background: #D9D9D9; border: none; border-radius: 20px; text-align: center; margin-bottom: 20px; outline: none; font-family: inherit;">
      <br>
      <button id="modalSubmit" style="width: 135px; height: 35px; background: #000; color: #fff; border: none; border-radius: 20px; cursor: pointer; font-size: 12px;">Зберегти</button>
    `;

    document.getElementById('modalSubmit').onclick = () => {
      const name = document.getElementById('modalInput').value || 'User';
      localStorage.setItem('userName', name);

      const headerGreeting = document.getElementById('user-greeting');
      if (headerGreeting) headerGreeting.textContent = `Вітаємо, ${name}!`;

      closeModal();
    };
  }

  function openModal() {
    document.body.appendChild(overlay);
    overlay.appendChild(modal);
    modal.appendChild(closeBtn);
    modal.appendChild(content);
    showStep1();
    setTimeout(() => {
      overlay.classList.add('active');
      modal.classList.add('active');
    }, 100);
  }

  function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 600);
  }

  window.addEventListener('load', openModal);
})();
