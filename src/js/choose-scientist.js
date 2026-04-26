const chooseScientistRoot = document.querySelector('#choose-scientist-root');
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

const scientisTitle = createEl('h2', 'scientis-title', 'Обери вченого/их');
const scientisList = createEl('ul', 'scientis-list');
const scientisImg = createEl('img', 'scientis-item', undefined, 16);
const scientisBtnList = createEl('ul', 'scientis-btn-list');
const scientisBtn = createEl('button', 'scientis-btn-item', undefined, 9);

chooseScientistRoot.append(scientisTitle, scientisList, scientisBtnList);
scientisList.append(...scientisImg);
scientisBtnList.append(...scientisBtn);
