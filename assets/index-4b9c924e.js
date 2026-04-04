(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&f(o)}).observe(document,{childList:!0,subtree:!0});function u(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function f(e){if(e.ep)return;e.ep=!0;const n=u(e);fetch(e.href,n)}})();const p=document.createElement("h1");p.textContent="Популярні інетрактивні ігри";p.style.margin="0 auto";p.style.display="block";p.style.width="fit-content";p.style.fontFamily="var(--font-family)";p.style.fontSize="24px";p.style.color="#000";document.body.appendChild(p);const g=document.createElement("div");g.style.width="536px";g.style.height="0";g.style.borderTop="1px solid #000";g.style.margin="36px auto 0";document.body.appendChild(g);const y=document.querySelector("#soccer-root");if(y){const x=()=>{if(document.querySelector('style[data-dom-section="soccer"]'))return;const c=document.createElement("style");c.setAttribute("data-dom-section","soccer"),c.textContent=`
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
    `,document.head.appendChild(c)},i=(c,s,h)=>{const t=document.createElement(c);return s&&(t.className=s),h!==void 0&&(t.textContent=h),t};x(),y.textContent="";const u=i("div","sc-wrap"),f=i("h2","sc-title","Футбол"),e=i("div","sc-field"),n=i("div","sc-midline"),o=i("div","sc-circle"),r=i("div","sc-ball"),d=i("div","sc-divider");e.append(n,o,r),u.append(f,e,d),y.appendChild(u),e.addEventListener("click",c=>{const s=e.getBoundingClientRect(),t=r.getBoundingClientRect().width;let l=c.clientX-s.left-t/2,a=c.clientY-s.top-t/2;const m=s.width-t,C=s.height-t;l=Math.max(0,Math.min(l,m)),a=Math.max(0,Math.min(a,C)),r.style.left=`${l}px`,r.style.top=`${a}px`})}const b=document.querySelector("#three-numbers-root");if(b){const x=()=>{if(document.querySelector('style[data-dom-section="three-numbers"]'))return;const t=document.createElement("style");t.setAttribute("data-dom-section","three-numbers"),t.textContent=`
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
    `,document.head.appendChild(t)},i=(t,l,a)=>{const m=document.createElement(t);return l&&(m.className=l),a!==void 0&&(m.textContent=a),m};x(),b.textContent="";const u=i("div","bn-wrap"),f=i("h2","bn-title","Введіть 3 числа"),e=i("form","bn-form"),n=document.createElement("input");n.className="bn-input",n.type="text",n.inputMode="decimal",n.placeholder="Введіть число";const o=document.createElement("input");o.className="bn-input",o.type="text",o.inputMode="decimal",o.placeholder="Введіть число";const r=document.createElement("input");r.className="bn-input",r.type="text",r.inputMode="decimal",r.placeholder="Введіть число";const d=i("p","bn-result","");d.hidden=!0;const c=i("div","bn-divider");e.append(n,o,r),u.append(f,e,d,c),b.appendChild(u);const s=t=>{const l=String(t??"").trim().replace(",",".");if(!l)return null;const a=Number(l);return Number.isFinite(a)?a:null},h=()=>{const t=[s(n.value),s(o.value),s(r.value)].filter(a=>a!=null);if(t.length===0){d.hidden=!0,d.textContent="";return}const l=Math.max(...t);d.hidden=!1,d.textContent=`Найбільше число, яке ви ввели - "${l}"`};for(const t of[n,o,r])t.addEventListener("input",h);e.addEventListener("submit",t=>t.preventDefault()),h()}console.log("Головний скрипт завантажено! Команда, вперед до роботи! 🚀");
