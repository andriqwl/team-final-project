const footerRoot = document.getElementById('footer-root');

const footerElement = document.createElement('footer');
footerElement.id = 'footer';
footerElement.className = 'footer';

// Додаємо стилі для центрування та обмеження ширини
footerElement.style.cssText = `
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 20px;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease;
`;

footerRoot.appendChild(footerElement);

const logo = document.createElement('div');
logo.className = 'footer-logo';
footerElement.appendChild(logo);

const logoText = document.createElement('div');
logoText.className = 'footer-logo-text';
logo.appendChild(logoText);

const contactsBox = document.createElement('div');
contactsBox.className = 'footer-contacts';
footerElement.appendChild(contactsBox);

const contacts = [
  'Тел: +38 (123) 456 78 90',
  'E-Mail: codingmagic@gmail.com',
  'Facebook: CodingMagic',
  'Twitter: CodingMagic',
  'Instagram: CodingMagic',
];

contacts.forEach(text => {
  const p = document.createElement('p');
  p.textContent = text;
  p.className = 'footer-contact-item';
  p.style.margin = '5px 0'; // Трохи відступу між контактами
  contactsBox.appendChild(p);
});

const subscribeBox = document.createElement('div');
subscribeBox.className = 'footer-subscribe';
footerElement.appendChild(subscribeBox);

const formBox = document.createElement('div');
formBox.className = 'footer-form';
formBox.style.display = 'flex';
formBox.style.gap = '10px';
subscribeBox.appendChild(formBox);

const emailInput = document.createElement('input');
emailInput.type = 'email';
emailInput.placeholder = 'Ваша ел. адреса';
emailInput.className = 'footer-input';
emailInput.style.padding = '10px 15px';
emailInput.style.borderRadius = '20px';
emailInput.style.border = '1px solid var(--border-color)';
formBox.appendChild(emailInput);

const subscribeButton = document.createElement('button');
subscribeButton.textContent = 'Підписатись';
subscribeButton.className = 'footer-button';
subscribeButton.id = 'footer-sub-btn';
subscribeButton.style.padding = '10px 20px';
subscribeButton.style.borderRadius = '20px';
subscribeButton.style.cursor = 'pointer';
formBox.appendChild(subscribeButton);

const noteText = document.createElement('p');
noteText.textContent =
  '*Підписавшись, Ви зможете отримувати інформацію про новини на сайті';
noteText.className = 'footer-note';
noteText.style.fontSize = '12px';
noteText.style.marginTop = '10px';
subscribeBox.appendChild(noteText);

// --- Модальне вікно залишається без змін ---
(function () {
  const fontLink = document.createElement('link');
  fontLink.href =
    'https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;500;600&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  const styleEl = document.createElement('style');
  styleEl.textContent = `
      .sub-overlay {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.4); z-index: 3000;
        display: flex; align-items: center; justify-content: center;
        opacity: 0; visibility: hidden; transition: 0.4s;
        font-family: 'Montserrat Alternates', sans-serif;
      }
      .sub-overlay.active { opacity: 1; visibility: visible; }
      .sub-window {
        background: var(--bg-head-foot, #fff);
        color: var(--text-primary, #000);
        width: 463px; height: 245px;
        border-radius: 30px; position: relative;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        transform: translateY(-100vh); transition: 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .sub-window.active { transform: translateY(0); }
      .sub-icon { position: absolute; opacity: 0.7; color: var(--text-primary, #000); }
      .sub-close { position: absolute; top: 20px; right: 25px; cursor: pointer; font-size: 18px; color: var(--text-primary, #000); z-index: 10; }
    `;
  document.head.appendChild(styleEl);

  const overlay = document.createElement('div');
  overlay.className = 'sub-overlay';

  const modal = document.createElement('div');
  modal.className = 'sub-window';

  const closeBtn = document.createElement('div');
  closeBtn.className = 'sub-close';
  closeBtn.innerHTML = '&#10005;';
  closeBtn.onclick = closeSubModal;

  const modalTitle = document.createElement('h2');
  modalTitle.innerHTML = 'Дякую за підписку!';
  modalTitle.style.cssText =
    'font-size: 20px; font-weight: 500; text-align: center;';

  const iconPaths = [
    '<svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 13l2 2"/></svg>',
    '<svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/><path d="M13.5 13.5l3 3M16.5 13.5l-3 3"/></svg>',
    '<svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0M12 9v6M9 12h6"/></svg>',
    '<svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
  ];

  iconPaths.forEach((html, i) => {
    const el = document.createElement('div');
    el.className = 'sub-icon';
    el.innerHTML = html;
    if (i === 0) el.style.cssText += 'left: 10%; top: 25%;';
    if (i === 1) el.style.cssText += 'right: 10%; top: 25%;';
    if (i === 2) el.style.cssText += 'left: 10%; bottom: 20%;';
    if (i === 3) el.style.cssText += 'right: 10%; bottom: 20%;';
    modal.appendChild(el);
  });

  modal.appendChild(closeBtn);
  modal.appendChild(modalTitle);
  overlay.appendChild(modal);

  function openSubModal() {
    document.body.appendChild(overlay);
    setTimeout(() => {
      overlay.classList.add('active');
      modal.classList.add('active');
    }, 10);
  }

  function closeSubModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 600);
  }

  const triggerBtn = document.getElementById('footer-sub-btn');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', e => {
      e.preventDefault();
      openSubModal();
    });
  }

  modal.appendChild(closeBtn);
  modal.appendChild(title);
  overlay.appendChild(modal);

  function openSubModal() {
    document.body.appendChild(overlay);
    setTimeout(() => {
      overlay.classList.add('active');
      modal.classList.add('active');
    }, 10);
  }

  function closeSubModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 600);
  }

  const triggerBtn = document.getElementById('footer-sub-btn');

  if (triggerBtn) {
    triggerBtn.addEventListener('click', e => {
      e.preventDefault();

      if (!emailInput.value || !emailInput.value.includes('@')) {
        alert('Введіть правильний email');
        return;
      }

      openSubModal();
    });
  }
})();
