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
console.log(teamTitle)
const teamImg = createEl('img', 'team-img');
teamImg.src = './';
teamImg.alt = "фото Ім'я";
const teamName = createEl('h3', 'team-name', 'Ім’я студента');
const teamInfo = createEl(
  'p',
  'team-info',
  'Інформація про роботу, яку він/вона виконав/ла'
);
const arrowLeft = createEl('button', 'team-button--l');
const arrowRight = createEl('button', 'team-button--r');
const lineList = createEl('ul', 'line-list');
const lineItem = createEl('li', 'line-item', undefined, 7);

ourTeamSection.append(
  teamTitle,
  teamImg,
  teamName,
  teamInfo,
  lineList,
  arrowLeft,
  arrowRight,
);
lineList.append(...lineItem);
