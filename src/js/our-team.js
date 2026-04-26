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
teamImg.src = './img/photo5395423997429749346y.jpg'
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
arrowLeftIcon.setAttribute("href", './icons/symboldefs.svg#icon-rock')  ;
console.log(arrowLeftIcon)
arrowRightIcon.href = ""
arrowLeftBtn.append(arrowLeftSvg)
arrowLeftSvg.append(arrowLeftIcon);
arrowRightBtn.append(arrowRightSvg);
arrowRightSvg.append(arrowRightIcon);


const lineList = createEl('ul', 'line-list');
const lineItem = createEl('li', 'line-item', undefined, 7);

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
