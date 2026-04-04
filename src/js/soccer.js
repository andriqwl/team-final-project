// СЕКЦИЯ "ФУТБОЛ"
const soccerRoot = document.querySelector('#soccer-root');

if (soccerRoot) {
  const ensureStyles = () => {
    if (document.querySelector('style[data-dom-section="soccer"]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-dom-section', 'soccer');

    // CSS
    style.textContent = `
      .sc-wrap{max-width:760px;margin:24px auto;padding:0;background:transparent}
      .sc-title{margin:0 0 36px;font-size:16px;line-height:normal;font-weight:400;color:#000;text-align:center}
      .sc-field{position:relative;width:100%;max-width:700px;height:320px;margin:0 auto;background:#3b9b49;border:4px solid #000;border-radius:18px;overflow:hidden;cursor:pointer}
      .sc-midline{position:absolute;left:50%;top:0;width:2px;height:100%;background:rgba(255,255,255,.65);transform:translateX(-50%)}
      .sc-circle{position:absolute;left:50%;top:50%;width:90px;height:90px;border:2px solid rgba(255,255,255,.65);border-radius:50%;transform:translate(-50%,-50%)}
      .sc-ball{
        position:absolute;left:20px;top:140px;width:34px;height:34px;border-radius:50%;
        border:0;
        background-color:#fff;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Cdefs%3E%3CradialGradient id='shine' cx='34' cy='30' r='60' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='.55' stop-color='%23f4f4f4'/%3E%3Cstop offset='1' stop-color='%23dadada'/%3E%3C/radialGradient%3E%3CradialGradient id='vignette' cx='50' cy='54' r='48' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.62' stop-color='%23000000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000000' stop-opacity='.22'/%3E%3C/radialGradient%3E%3Cpattern id='checker' patternUnits='userSpaceOnUse' width='36' height='36'%3E%3Crect width='36' height='36' fill='%23ffffff'/%3E%3Crect x='0' y='0' width='18' height='18' fill='%23111'/%3E%3Crect x='18' y='18' width='18' height='18' fill='%23111'/%3E%3C/pattern%3E%3Cfilter id='warp' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.012' numOctaves='2' seed='7' result='noise'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='noise' scale='18' xChannelSelector='R' yChannelSelector='G'/%3E%3C/filter%3E%3CclipPath id='clip'%3E%3Ccircle cx='48' cy='48' r='44'/%3E%3C/clipPath%3E%3C/defs%3E%3Cg clip-path='url(%23clip)'%3E%3Crect x='4' y='4' width='88' height='88' fill='url(%23shine)'/%3E%3C!-- ~7 cells total --%3E%3Cg filter='url(%23warp)' opacity='.92'%3E%3Crect x='0' y='0' width='96' height='96' fill='url(%23checker)'/%3E%3C/g%3E%3Crect x='4' y='4' width='88' height='88' fill='url(%23vignette)'/%3E%3C/g%3E%3C/svg%3E");
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

  //создание элементов
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  ensureStyles();
  // чистка секции
  soccerRoot.textContent = '';

  // разметка
  const wrap = el('div', 'sc-wrap');
  const title = el('h2', 'sc-title', 'Футбол');

  const field = el('div', 'sc-field');
  const midline = el('div', 'sc-midline');
  const circle = el('div', 'sc-circle');
  const ball = el('div', 'sc-ball');
  const divider = el('div', 'sc-divider');

  field.append(midline, circle, ball);
  wrap.append(title, field, divider);
  soccerRoot.appendChild(wrap);

  // Логика :(

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
