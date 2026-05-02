// Inline FOUC-prevention script. Must run before first paint, so it's
// emitted as a raw <script> in <head>, not part of the client bundle.
export const THEME_INLINE_SCRIPT = `const lightModePref=window.matchMedia("(prefers-color-scheme: light)");
function getUserPref(){const s=typeof localStorage!=="undefined"&&localStorage.getItem("theme");return s||(lightModePref.matches?"light":"dark")}
function updateMeta(){const m=document.querySelector("meta[name='theme-color']");if(!m||!document.body)return;const b=getComputedStyle(document.body).getPropertyValue("--theme-bg");m.setAttribute("content","hsl("+b+")")}
function setTheme(t){if(t!=="light"&&t!=="dark")return;const r=document.documentElement;r.setAttribute("data-theme",t);if(typeof localStorage!=="undefined")localStorage.setItem("theme",t);updateMeta()}
setTheme(getUserPref());
document.addEventListener("DOMContentLoaded",updateMeta);
document.addEventListener("theme-change",e=>{setTheme(e.detail.theme)});
lightModePref.addEventListener("change",e=>setTheme(e.matches?"light":"dark"));`;
