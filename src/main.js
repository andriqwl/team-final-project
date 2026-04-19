/**
 * ГОЛОВНИЙ ФАЙЛ ПРОЄКТУ (MAIN.JS)
 * * Тут ми тільки імпортуємо (підключаємо) інші JS-файли.
 * Саму логіку (код) пишіть в окремих файлах у папці /js/
 */

// 1. Приклад підключення ваших модулів (розкоментуйте, коли створите файли):
// import './js/header.js';
// import './js/mobile-menu.js';
// import './js/modal.js';

console.log('Головний скрипт завантажено! Команда, вперед до роботи! 🚀');

// src/js/main.js

// Спільні стилі
// 1. Стилі (якщо папка css лежить в src — це правильно)
import './css/reset.css';
import './css/styles.css';

// 2. Секції (додаємо /js/ у шлях, бо вони всередині папки js)
import './js/header.js';
import './js/modal.js';
import './js/h1.js';
import './js/guess-number.js';
import './js/rock-paper-scissors.js';
import './js/calc.js';
import './js/time-calc.js';
import './js/google-dino.js';
import './js/soccer.js';
import './js/three-numbers.js';
import './js/our-team.js';
import './js/choose-scientist.js';
import './js/footer.js';
