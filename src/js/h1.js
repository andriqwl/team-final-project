const h1 = document.createElement('h1');

h1.textContent = 'Популярні інтерактивні ігри';
h1.style.margin = '0 auto';

h1.style.display = 'block';
h1.style.width = 'fit-content';
h1.style.margin = '36px auto 0';
h1.style.fontFamily = 'var(--font-family)';

h1.style.fontSize = '24px';
h1.style.color = '#000';

const dividerH1 = document.createElement('div');
dividerH1.style.width = '536px';
dividerH1.style.height = '0';
dividerH1.style.borderTop = '1px solid #000';
dividerH1.style.margin = '36px auto 0';

// Знаходимо секцію hero
const heroSection = document.querySelector('.hero');

// Вставляємо h1 відразу після неї
heroSection.after(h1);

// Вставляємо розділювач відразу після h1
h1.after(dividerH1);
