const root = document.getElementById('rock-paper-scissors-root');

root.style.borderRadius = '30px';
root.style.margin = '0px auto 0px auto';

root.style.paddingTop = '0';
root.style.maxWidth = '1100px';
root.style.backdropFilter = 'blur(10px)';
root.style.display = 'flex';
root.style.flexDirection = 'column';
root.style.alignItems = 'center';
const choices = ['rock', 'scissors', 'paper'];
let playerScore = 0;
let computerScore = 0;

import rock from '../img/stone.png';
import paper from '../img/paper.png';
import scissors from '../img/scissors.png';

const icons = {
  rock,
  paper,
  scissors,
};

const container = document.createElement('div');
container.style.fontFamily = 'var(--font-family)';
container.style.maxWidth = '800px';
container.style.margin = '0 auto';
container.style.padding = '20px';
container.style.paddingTop = '0';

container.style.paddingBottom = '0';

const title = document.createElement('h1');
title.textContent = 'Камінь - ножиці - папір';
title.style.textAlign = 'center';
title.style.fontSize = '16px';
title.style.fontWeight = '400';
title.style.marginBottom = '20px';
container.appendChild(title);

const gameWrapper = document.createElement('div');
gameWrapper.style.display = 'flex';
gameWrapper.style.justifyContent = 'center';
gameWrapper.style.alignItems = 'center';
gameWrapper.style.gap = '60px';
gameWrapper.style.marginTop = '20px';
gameWrapper.style.marginBottom = '20px';

gameWrapper.style.marginLeft = '150px';

const btnContainer = document.createElement('div');
btnContainer.style.display = 'flex';
btnContainer.style.gap = '38px';

choices.forEach(choice => {
  const btn = document.createElement('button');
  btn.style.width = '60px';
  btn.style.height = '60px';
  btn.style.backgroundColor = 'black';
  btn.style.borderRadius = '20px';
  btn.style.border = 'none';
  btn.style.cursor = 'pointer';
  btn.style.display = 'flex';
  btn.style.justifyContent = 'center';
  btn.style.alignItems = 'center';
  btn.style.transition = 'transform 0.1s';
  btn.onmouseover = () => (btn.style.transform = 'scale(1.05)');
  btn.onmouseout = () => (btn.style.transform = 'scale(1)');

  const img = document.createElement('img');
  img.src = icons[choice];
  img.style.width = '70%';
  img.style.height = 'auto';
  console.log(img);
  btn.appendChild(img);
  btn.onclick = () => playRound(choice);
  btnContainer.appendChild(btn);
});

const scoreboard = document.createElement('div');
scoreboard.style.fontSize = '12px';
scoreboard.style.lineHeight = '170%';

const scoreTitle = document.createElement('p');
const boldLabel = document.createElement('strong');
boldLabel.textContent = 'Рахунок:';
scoreTitle.appendChild(boldLabel);
scoreTitle.style.margin = '0';

const cpuScoreText = document.createElement('p');
cpuScoreText.id = 'cpu-score-val';
cpuScoreText.textContent = "Комп'ютер - 0";
cpuScoreText.style.margin = '0';

const userScoreText = document.createElement('p');
userScoreText.id = 'user-score-val';
userScoreText.textContent = 'Ви - 0';
userScoreText.style.margin = '0';

scoreboard.appendChild(scoreTitle);
scoreboard.appendChild(cpuScoreText);
scoreboard.appendChild(userScoreText);

gameWrapper.appendChild(btnContainer);
gameWrapper.appendChild(scoreboard);
container.appendChild(gameWrapper);

const statusMsg = document.createElement('p');
statusMsg.id = 'status-msg';
statusMsg.textContent = 'Зробіть свій вибір!';
statusMsg.style.color = '#039900';
statusMsg.style.fontSize = '12px';
statusMsg.style.textAlign = 'center';
statusMsg.style.fontWeight = '400';
statusMsg.style.margin = '0';
container.appendChild(statusMsg);

const cpuDisplayBtn = document.createElement('div');
cpuDisplayBtn.style.backgroundColor = 'black';
cpuDisplayBtn.style.color = 'white';
cpuDisplayBtn.style.padding = '10px 20px';
cpuDisplayBtn.style.borderRadius = '50px';
cpuDisplayBtn.style.width = 'fit-content';
cpuDisplayBtn.style.margin = '20px auto';
cpuDisplayBtn.style.marginBottom = '0';
cpuDisplayBtn.style.fontSize = '12px';
cpuDisplayBtn.textContent = "Варіант комп'ютера";
container.appendChild(cpuDisplayBtn);

root.appendChild(container);

function playRound(playerChoice) {
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  let result = '';

  if (playerChoice === computerChoice) {
    result = 'Нічия!';
    statusMsg.style.color = '#039900';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'scissors' && computerChoice === 'paper') ||
    (playerChoice === 'paper' && computerChoice === 'rock')
  ) {
    result = 'Ви виграли раунд!';
    statusMsg.style.color = '#039900';
    playerScore++;
  } else {
    result = "Комп'ютер виграв!";
    statusMsg.style.color = '#900';
    computerScore++;
  }

  statusMsg.textContent = result;
  cpuDisplayBtn.textContent = `Комп'ютер обрав: ${translate(computerChoice)}`;
  document.getElementById('user-score-val').textContent = `Ви - ${playerScore}`;
  document.getElementById('cpu-score-val').textContent =
    `Комп'ютер - ${computerScore}`;
}

function translate(word) {
  const dict = { rock: 'Камінь', paper: 'Папір', scissors: 'Ножиці' };
  return dict[word] || word;
}

const dividerr = document.createElement('div');
dividerr.style.width = '536px';
dividerr.style.height = '0';
dividerr.style.borderTop = '1px solid #000';
dividerr.style.margin = '36px auto 0';

root.appendChild(dividerr);
