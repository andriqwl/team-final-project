(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))h(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&h(i)}).observe(document,{childList:!0,subtree:!0});function c(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function h(e){if(e.ep)return;e.ep=!0;const o=c(e);fetch(e.href,o)}})();const R=document.getElementById("header-root"),x=document.createElement("header");x.style.cssText=`
  display: flex;
  justify-content: center; 
  align-items: center;
  padding: 15px 40px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  font-family: "Montserrat Alternates", sans-serif;
  width: 100%;
  box-sizing: border-box;
`;R.appendChild(x);const E=document.createElement("div");E.style.cssText=`
  display: flex;
  align-items: center;
  gap: 10px;
`;x.appendChild(E);const L=document.createElement("div");L.innerHTML=`
  <svg width="40" height="34" viewBox="0 0 45 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 28.5L4.5 19.5L12.5 10.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M32.5 10.5L40.5 19.5L32.5 28.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M25.5 6.5L19.5 32.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;E.appendChild(L);const T=document.createElement("div");T.innerHTML=`
  <div style="font-size: 18px; font-weight: 600; color: #333; line-height: 1;">Coding</div>
  <div style="font-family: 'Sacramento', cursive; font-size: 16px; color: #666; margin-left: 10px;">Magic</div>
`;E.appendChild(T);const M=document.createElement("nav");M.style.cssText=`
  display: flex;
  gap: 35px;
  margin: 0 100px; /* ТУТ ФІКСОВАНА ВІДСТАНЬ: 100px від лого і 100px від перемикача */
`;x.appendChild(M);const N=[{name:"Інтерактив",hasArrow:!0},{name:"Наша команда",hasArrow:!1},{name:"Контакти",hasArrow:!1}];N.forEach(u=>{const t=document.createElement("a");if(t.href="#",t.style.cssText="text-decoration: none; color: #333; font-size: 14px; display: flex; align-items: center; gap: 5px;",t.textContent=u.name,u.hasArrow){const c=document.createElement("span");c.innerHTML='<svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',t.appendChild(c)}M.appendChild(t)});const S=document.createElement("div");S.style.cssText=`
  display: flex;
  align-items: center;
  gap: 20px;
`;x.appendChild(S);const b=document.createElement("div");b.style.cssText="width: 44px; height: 22px; background-color: #8a8a8a; border-radius: 12px; position: relative; cursor: pointer; transition: 0.3s;";const w=document.createElement("div");w.style.cssText="width: 18px; height: 18px; background-color: #fff; border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: 0.3s; display: flex; align-items: center; justify-content: center; font-size: 10px;";w.textContent="☀️";b.appendChild(w);const A=document.createElement("span");A.textContent="Вітаємо, User!";A.style.fontSize="14px";S.append(b,A);let g=!1;b.onclick=()=>{g=!g,w.style.left=g?"24px":"2px",w.textContent=g?"🌙":"☀️",b.style.backgroundColor=g?"#4a4a4a":"#8a8a8a",x.style.backgroundColor=g?"#222":"#fff"};const p=document.createElement("h1");p.textContent="Популярні інтерактивні ігри";p.style.margin="0 auto";p.style.display="block";p.style.width="fit-content";p.style.margin="36px auto 0";p.style.fontFamily="var(--font-family)";p.style.fontSize="24px";p.style.color="#000";const C=document.createElement("div");C.style.width="536px";C.style.height="0";C.style.borderTop="1px solid #000";C.style.margin="36px auto 0";const O=document.querySelector(".hero");O.after(p);p.after(C);const v=document.querySelector("#soccer-root");if(v){const u=()=>{if(document.querySelector('style[data-dom-section="soccer"]'))return;const d=document.createElement("style");d.setAttribute("data-dom-section","soccer"),d.textContent=`
      .sc-wrap{max-width:760px;margin:24px auto;padding:0;background:transparent}
      .sc-title{margin:0 0 36px;font-family: "Montserrat Alternates", sans-serif;font-size:16px;line-height:normal;font-weight:400;color:#000;text-align:center}
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
    `,document.head.appendChild(d)},t=(d,s,m)=>{const n=document.createElement(d);return s&&(n.className=s),m!==void 0&&(n.textContent=m),n};u(),v.textContent="";const c=t("div","sc-wrap"),h=t("h2","sc-title","Футбол"),e=t("div","sc-field"),o=t("div","sc-midline"),i=t("div","sc-circle"),r=t("div","sc-ball"),f=t("div","sc-divider");e.append(o,i,r),c.append(h,e,f),v.appendChild(c),e.addEventListener("click",d=>{const s=e.getBoundingClientRect(),n=r.getBoundingClientRect().width;let l=d.clientX-s.left-n/2,a=d.clientY-s.top-n/2;const y=s.width-n,z=s.height-n;l=Math.max(0,Math.min(l,y)),a=Math.max(0,Math.min(a,z)),r.style.left=`${l}px`,r.style.top=`${a}px`})}const k=document.querySelector("#three-numbers-root");if(k){const u=()=>{if(document.querySelector('style[data-dom-section="three-numbers"]'))return;const n=document.createElement("style");n.setAttribute("data-dom-section","three-numbers"),n.textContent=`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400&display=swap');
      .bn-wrap{max-width:760px;margin:24px auto;padding:36px 0 0;background:transparent}
      .bn-title{
        margin:0 0 36px;
        color:#000;
        font-family:"Montserrat Alternates", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-size:16px;
        font-style:normal;
        font-weight:400;
        line-height:normal;
        text-align:center;
      }
      .bn-form{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-start;justify-content:center}
      .bn-input{
        display:inline-flex;
        padding:10px 20px;
        align-items:flex-start;
        gap:10px;
        border:0;
        border-radius:20px;
        background:#D7D7D7;
        box-shadow:3px 3px 0 0 rgba(0,0,0,.25);
        color:#7E7E7E;
        font-family:"Montserrat Alternates", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-size:12px;
        font-style:normal;
        font-weight:400;
        line-height:normal;
        outline:none;
        min-width:160px;
      }
      .bn-input::placeholder{color:#7E7E7E;opacity:1}
      .bn-result{
        margin:36px 0 0;
        color:#000;
        font-family:"Montserrat Alternates", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-size:12px;
        font-style:normal;
        font-weight:400;
        line-height:normal;
        text-align:center;
      }
      .bn-divider{width:536px;height:0;border-top:1px solid #000;margin:36px auto 0}
    `,document.head.appendChild(n)},t=(n,l,a)=>{const y=document.createElement(n);return l&&(y.className=l),a!==void 0&&(y.textContent=a),y};u(),k.textContent="";const c=t("div","bn-wrap"),h=t("h2","bn-title","Введіть 3 числа"),e=t("form","bn-form"),o=document.createElement("input");o.className="bn-input",o.type="text",o.inputMode="decimal",o.placeholder="Введіть число";const i=document.createElement("input");i.className="bn-input",i.type="text",i.inputMode="decimal",i.placeholder="Введіть число";const r=document.createElement("input");r.className="bn-input",r.type="text",r.inputMode="decimal",r.placeholder="Введіть число";const f=t("p","bn-result","");f.hidden=!0;const d=t("div","bn-divider");e.append(o,i,r),c.append(h,e,f,d),k.appendChild(c);const s=n=>{const l=String(n??"").trim().replace(",",".");if(!l)return null;const a=Number(l);return Number.isFinite(a)?a:null},m=()=>{const n=[s(o.value),s(i.value),s(r.value)].filter(a=>a!=null);if(n.length===0){f.hidden=!0,f.textContent="";return}const l=Math.max(...n);f.hidden=!1,f.textContent=`Найбільше число, яке ви ввели - "${l}"`};for(const n of[o,i,r])n.addEventListener("input",m);e.addEventListener("submit",n=>n.preventDefault()),m()}console.log("Головний скрипт завантажено! Команда, вперед до роботи! 🚀");
