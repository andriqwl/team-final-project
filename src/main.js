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
import '../css/reset.css';
import '../css/styles.css';

// Секції (підключаємо всі по черзі)
import './sections/header.js';
import './sections/guess-number.js';
import './sections/rock-paper-scissors.js';
import './sections/calc.js';
import './sections/time-calc.js';
import './sections/google-dino.js';
import './sections/soccer.js';
import './sections/three-numbers.js';
import './sections/our-team.js';
import './sections/choose-scientist.js';
import './sections/footer.js';
