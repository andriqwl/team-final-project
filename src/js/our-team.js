const ourTeamSection = document.querySelector('#our-team-root');

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
// розмітка
// const container = createEl('div', 'container');
const teamTitle = createEl('h2', 'team-title', 'Наша команда');
console.log(teamTitle);
const teamImg = createEl('img', 'team-img');
teamImg.src = './img/andrian.jpg';
teamImg.alt = "фото Ім'я";
const teamName = createEl('h3', 'team-name', 'Ім’я студента');
const teamInfo = createEl(
  'p',
  'team-info',
  'Інформація про роботу, яку він/вона виконав/ла'
);
const arrowLeftBtn = createEl('button', 'team-button--l');
const arrowLeftSvg = createEl('svg', 'team-svg--l');
const arrowLeftIcon = createEl('use', undefined);
const arrowRightBtn = createEl('button', 'team-button--r');
const arrowRightSvg = createEl('svg', 'team-svg--r');
const arrowRightIcon = createEl('use', 'team-icon--r');

// arrowRightSvg.style.width = "150px";
arrowLeftIcon.setAttribute('href', './icons/symboldefs.svg#icon-rock');
console.log(arrowLeftIcon);
arrowRightIcon.href = '';
arrowLeftBtn.append(arrowLeftSvg);
arrowLeftSvg.append(arrowLeftIcon);
arrowRightBtn.append(arrowRightSvg);
arrowRightSvg.append(arrowRightIcon);

const lineList = createEl('ul', 'line-list');
const lineItem = createEl('li', 'line-item', undefined, 5);
lineItem[0].classList.add('hovered');
console.log(lineItem)

ourTeamSection.append(
  teamTitle,
  teamImg,
  teamName,
  teamInfo,
  lineList,
  arrowLeftBtn,
  arrowRightBtn
);
lineList.append(...lineItem);

let currentIndex = 0;
let lastIndex = 0
const imgArr = [
  './img/andrian.jpg',
  './img/ivanS.jpg',
  './img/timur.jpg',
  './img/ivanK.jpg',
  './img/olena.jpg',
];
const nameArr = [
  'Андріа Костик',
  'Іван Скрипка',
  'Тимур Ганзій',
  'Іван Карпенко',
  'Олена Наумчик',
];
const infoArr = [
  'Team lead нашої команди',
  'Я скрам-майстер і розробляв секцію "Наша команда" і "Обери вченого/их"',
  'Я розробляв секції "Наша команда" і "Обери вченого/их"',
  '',
  '',
];

function changeInfo() {
  teamImg.src = imgArr[currentIndex];
  teamName.textContent = nameArr[currentIndex];
  teamInfo.textContent = infoArr[currentIndex];
  lineItem[currentIndex].classList.add("hovered");
  lineItem[lastIndex].classList.remove("hovered");

}
arrowRightBtn.addEventListener('click', scrollRight);
function scrollRight() {
  if (currentIndex < imgArr.length - 1) {
    lastIndex = currentIndex
    currentIndex++;
    changeInfo();
  } else {
    lastIndex = currentIndex;
    currentIndex = 0;
    changeInfo();
  }
}
arrowLeftBtn.addEventListener('click', scrollLeft);
function scrollLeft() {
  if (currentIndex > 0) {
    lastIndex = currentIndex
    currentIndex--;
    changeInfo();
  } else {
    lastIndex = currentIndex;
    currentIndex = 4;
    changeInfo();
  }
}

