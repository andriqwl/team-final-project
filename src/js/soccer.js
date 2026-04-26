import footballIcon from '../img/football.png';

const soccerRoot = document.querySelector('#soccer-root');

if (soccerRoot) {
  const ensureStyles = () => {
    if (document.querySelector('style[data-dom-section="soccer"]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-dom-section', 'soccer');

    // CSS
    style.textContent = `
      .sc-wrap{max-width:760px;margin:0 auto;padding:0;background:transparent}
      .sc-title{margin:0 0 36px;font-family:"Montserrat Alternates",sans-serif;font-size:16px;line-height:normal;font-weight:400;color:#000;text-align:center}
      .sc-field{
        position:relative;
        width:720px;
        max-width:100%;
        height:220px;
        margin:0 auto;
        background:#5abb58;
        border:2px solid #000;
        border-radius:37px;
        overflow:hidden;
        cursor:pointer
      }
      .sc-ball{
        position:absolute;left:97px;top:85px;width:50px;height:50px;border-radius:50%;
        border:0;
        background-color:transparent;
        background-image:url("${footballIcon}");
        background-size:cover;
        background-position:center;
        font-family: "Montserrat Alternates", sans-serif;
        box-shadow: 0 2px 0 rgba(0,0,0,.20);
        transition:left 350ms linear, top 350ms linear;
      }
      .sc-divider{width:536px;height:0;border-top:1px solid #000;margin:36px auto 0}
    `;
    document.head.appendChild(style);
  };

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  ensureStyles();

  soccerRoot.textContent = '';

  const wrap = el('div', 'sc-wrap');
  const title = el('h2', 'sc-title', 'Футбол');

  const field = el('div', 'sc-field');
  const ball = el('div', 'sc-ball');
  const divider = el('div', 'sc-divider');

  field.append(ball);
  wrap.append(title, field, divider);
  soccerRoot.appendChild(wrap);

  field.addEventListener('click', event => {
    const fieldRect = field.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    const ballSize = ballRect.width;

    let targetX = event.clientX - fieldRect.left - ballSize / 2;
    let targetY = event.clientY - fieldRect.top - ballSize / 2;

    const maxX = fieldRect.width - ballSize;
    const maxY = fieldRect.height - ballSize;

    targetX = Math.max(0, Math.min(targetX, maxX));
    targetY = Math.max(0, Math.min(targetY, maxY));

    ball.style.left = `${targetX}px`;
    ball.style.top = `${targetY}px`;
  });
}
