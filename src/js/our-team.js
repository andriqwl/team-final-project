const ourTeamSection = document.querySelector('#our-team-root');

// Імпорти (переконайся, що шляхи правильні)
import andrian from '../img/andrian.jpg';
import timur from '../img/timur.jpg';
import ivanS from '../img/ivanS.jpg';
import ivanK from '../img/ivanK.jpg';
import olena from '../img/olena.jpg';
import arrowLeft from '../img/arrowL.png';
import arrowRight from '../img/arrowR.png';

// Універсальна функція створення елементів
function createEl(tag, className, text, numberOftags = 1) {
  const elements = [];
  for (let i = 0; i < numberOftags; i++) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    elements.push(node);
  }
  return numberOftags === 1 ? elements[0] : elements;
}

// Перевірка наявності рута
if (ourTeamSection) {
  ourTeamSection.innerHTML = ''; // Очищуємо перед рендером

  // 1. Створення елементів інтерфейсу
  const teamTitle = createEl('h2', 'team-title', 'Наша команда');
  const teamImg = createEl('img', 'team-img');
  teamImg.alt = 'Фото учасника';

  const teamName = createEl('h3', 'team-name');
  const teamInfo = createEl('p', 'team-info');

  const arrowLeftBtn = createEl('button', 'team-button--l');
  const arrowLeftImg = createEl('img', 'team-img--l');
  arrowLeftImg.src = arrowLeft;
  arrowLeftBtn.append(arrowLeftImg);

  const arrowRightBtn = createEl('button', 'team-button--r');
  const arrowRightImg = createEl('img', 'team-img--r');
  arrowRightImg.src = arrowRight;
  arrowRightBtn.append(arrowRightImg);

  const lineList = createEl('ul', 'line-list');
  const lineItems = createEl('li', 'line-item', undefined, 5);
  lineList.append(...lineItems);

  // 2. Дані для слайдера
  const imgArr = [andrian, ivanS, timur, ivanK, olena];
  const nameArr = [
    'Андріан Костик',
    'Іван Скрипка',
    'Тимур Ганзій',
    'Іван Карпенко',
    'Олена Наумчик',
  ];
  const infoArr = [
    'Team Lead: Керував процесом розробки та координував взаємодію команди.',
    'Я скрам-майстер, розробляв секцію "Камінь - ножиці - папір" і "Калькулятор"',
    'Я розробляв секції "Наша команда" і "Обери вченого/их"',
    'Я розробляв секції "Футбол", "Гугл – динозавр" та "Найбільше число"',
    'Я зробила секцію "Вгадай число", "Калькулятор часу" та footer',
  ];

  let currentIndex = 0;

  // 3. Функція оновлення контенту
  function updateSlider() {
    teamImg.src = imgArr[currentIndex];
    teamName.textContent = nameArr[currentIndex];
    teamInfo.textContent = infoArr[currentIndex];

    // Оновлення індикаторів (ліній)
    lineItems.forEach((item, index) => {
      if (index === currentIndex) {
        item.classList.add('hovered');
      } else {
        item.classList.remove('hovered');
      }
    });
  }

  // 4. Логіка кнопок
  arrowRightBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imgArr.length;
    updateSlider();
  });

  arrowLeftBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imgArr.length) % imgArr.length;
    updateSlider();
  });

  // 5. Додавання в DOM (структуруй за макетом)
  const sliderContent = createEl('div', 'team-slider-content');
  sliderContent.append(arrowLeftBtn, teamImg, arrowRightBtn);

  ourTeamSection.append(teamTitle, sliderContent, teamName, teamInfo, lineList);

  // Перший запуск
  updateSlider();
}
