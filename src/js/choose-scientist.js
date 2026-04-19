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

const scientistTitle = createEl('h2', 'scientist-title', 'Обери вченого/их');
const scientistList = createEl('ul', 'scientist-list');
const scientistImg = createEl('img', 'scientist-item', undefined, 12);
const scientistBtnList = createEl('ul', 'scientist-btn-list');
const scientistBtn = createEl('button', 'scientist-btn-item', undefined, 9);
chooseScientistRoot.append(scientistTitle, scientistList, scientistBtnList);
scientistList.append(...scientistImg);
scientistBtnList.append(...scientistBtn);

const textBtn = [
  'Які вчені народилися в 19 ст.',
  'Знайти рік народження Albert Einshtein',
  'Відсортувати вчених за алфавітом',
  'Знайти вчених, прізвища яких починаються на на літеру “С” ',
  'Відсортувати вчених за кількістю прожитих років',
  'Видалити всіх вчених, ім’я яких починається на “А”',
  'Знайти вченого, який народився найпізніше',
  'Знайти вченого, який прожив найдовше і вченого, який прожив найменше',
  'Знайти вчених, в яких співпадають перші літери імені і прізвища',
];
function addText(arrayEl, arrayText) {
  for (let i = 0; i < arrayEl.length; i++) {
    arrayEl[i].textContent = arrayText[i];
  }
}
addText(scientistBtn, textBtn);
