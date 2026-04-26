const ourTeamSection = document.querySelector('#our-team-root');

import andrian from '../img/andrian.jpg';
import timur from "../img/timur.jpg"
import ivanS from '../img/ivanS.jpg';
import ivanK from '../img/ivanK.jpg';
import olena from '../img/olena.jpg';
import arrowLeft from '../img/arrowL.png';
import arrowRight from '../img/arrowR.png';
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
const teamName = createEl('h3', 'team-name', 'Андріа Костик');
const teamInfo = createEl(
  'p',
  'team-info',
  'Team Lead: Керував процесом розробки та координував взаємодію команди.'
);
const arrowLeftBtn = createEl('button', 'team-button--l');
const arrowLeftImg = createEl('img', 'team-img--l');
const arrowRightBtn = createEl('button', 'team-button--r');
const arrowRightImg = createEl('img', 'team-img--r');

arrowLeftImg.src = arrowLeft;
arrowRightImg.src = arrowRight;
arrowLeftBtn.append(arrowLeftImg);
arrowRightBtn.append(arrowRightImg);

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
  andrian,
  ivanS,
  timur,
  ivanK,
  olena,
];
const nameArr = [
  'Андріа Костик',
  'Іван Скрипка',
  'Тимур Ганзій',
  'Іван Карпенко',
  'Олена Наумчик',
];
const infoArr = [
  'Team Lead: Керував процесом розробки та координував взаємодію команди.',
  'Я скрам-майстер, розробляв секцію "Камінь - ножиці - папір" і "Калькулятор"',
  'Я розробляв секції "Наша команда" і "Обери вченого/их"',
  'Я розробляв секції "Футбол" , "Гугл – динозавр" та "Найбільше число"',
  'Я зробила секцію "Вгадай число", "Калькулятор часу" та footer',
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

