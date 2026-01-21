const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => [...el.querySelectorAll(q)];

const yearEl = $("#year");
const year2El = $("#year2");
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (year2El) year2El.textContent = new Date().getFullYear();


// Motion guards (iPhone/iOS friendly)
const isMobile = () => window.matchMedia('(max-width: 820px)').matches;
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Intro (somente o Hero)
requestAnimationFrame(() => {
  $$(".hero-in").forEach((el, i) => {
    setTimeout(() => el.classList.add("is-in"), 120 + i * 90);
  });
  const photo = $(".hero-photo");
  if (photo) setTimeout(() => photo.classList.add("is-in"), 140);
});

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

// Parallax no HERO (suave)
const hero = $(".hero");
const heroH = () => hero ? hero.getBoundingClientRect().height : 1;

// PIN do "Como funciona"
const how = $("#como-funciona");
const results = $("#resultados");
const steps = how ? $$(".step", how) : [];
const progressEl = $("#progress");

const PIN_LEN = 1600;
let pinStart = 0;
let pinEnd = 0;

function computePin(){
  if(!how) return;
  // On mobile / reduce motion we disable the pin, so spacer must be zero.
  if (isMobile() || reduceMotion()) {
    how.style.setProperty("--pinLen", `0px`);
    pinStart = how.offsetTop;
    pinEnd = pinStart;
    return;
  }
  pinStart = how.offsetTop;
  const finalLen = Math.max(900, Math.min(PIN_LEN, window.innerHeight * steps.length * 0.6));
  pinEnd = pinStart + finalLen;
  how.style.setProperty("--pinLen", `${finalLen}px`);
}
computePin();
window.addEventListener("resize", computePin);

function setActiveStep(index){
  steps.forEach((s, i) => s.classList.toggle("is-active", i === index));
}

function forceUnpin(){
  if(!how) return;
  const inner = $(".how__grid", how);
  if(!inner) return;

  inner.style.position = "";
  inner.style.left = "";
  inner.style.right = "";
  inner.style.top = "";
  inner.style.transform = "";
}

function pinHow(){
  // Disable pinning on mobile / reduced motion to avoid overlap issues
  if(isMobile() || reduceMotion()){
    forceUnpin();
    // keep first step active
    setActiveStep(0);
    return;
  }

  if(!how) return;

  // ✅ Solta quando começar Resultados
  if(results){
    const r = results.getBoundingClientRect();
    if(r.top <= window.innerHeight * 0.45){
      forceUnpin();
      return;
    }
  }

  const y = window.scrollY;
  const within = y >= pinStart && y <= pinEnd;

  const inner = $(".how__grid", how);
  if(!inner) return;

  if(within){
    inner.style.position = "fixed";
    inner.style.left = "0";
    inner.style.right = "0";
    inner.style.top = "50%";
    inner.style.transform = "translateY(-50%)";

    const t = (y - pinStart) / (pinEnd - pinStart);
    const idx = clamp(Math.floor(t * steps.length), 0, steps.length - 1);

    setActiveStep(idx);
    if(progressEl){
      const pct = ((idx + 1) / steps.length);
      progressEl.style.transform = `scaleX(${pct})`;
    }
  } else {
    forceUnpin();
    if(progressEl) progressEl.style.transform = "scaleX(0)";
    setActiveStep(0);
  }
}

function onScroll(){
  const y = window.scrollY;

  const hp = hero ? clamp(y / heroH(), 0, 1) : 0;
  document.documentElement.style.setProperty("--heroY", `${hp * 60}px`);
  document.documentElement.style.setProperty("--heroS", `${1 + hp * 0.06}`);

  pinHow();
}

window.addEventListener("scroll", onScroll, { passive:true });
window.addEventListener("resize", onScroll);
onScroll();

/* Reveal */
const revealEls = [...document.querySelectorAll("[data-reveal]")];
if ("IntersectionObserver" in window) {
  const revealIO = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        const delay = e.target.getAttribute("data-delay");
        if (delay) e.target.style.setProperty("--d", `${delay}ms`);
        e.target.classList.add("is-in");
        revealIO.unobserve(e.target);
      }
    }
  }, { threshold: 0.18 });
  revealEls.forEach((el) => revealIO.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-in"));
}

/* Swap */
const swapBlocks = [...document.querySelectorAll("[data-swap]")];
swapBlocks.forEach((block) => {
  const lines = [...block.querySelectorAll(".swap__line")];
  if(!lines.length) return;

  let idx = 0;

  const tick = () => {
    const current = lines[idx];
    const next = lines[(idx + 1) % lines.length];
    current.classList.remove("is-active");
    current.classList.add("is-out");
    next.classList.add("is-active");
    next.classList.remove("is-out");
    setTimeout(() => current.classList.remove("is-out"), 650);
    idx = (idx + 1) % lines.length;
  };

  const startSwap = () => {
    lines.forEach((l, i) => l.classList.toggle("is-active", i === 0));
    idx = 0;
    setInterval(tick, 2600);
  };

  if("IntersectionObserver" in window){
    const swapIO = new IntersectionObserver((entries) => {
      for(const e of entries){
        if(e.isIntersecting){
          startSwap();
          swapIO.disconnect();
        }
      }
    }, { threshold: 0.35 });
    swapIO.observe(block);
  } else {
    startSwap();
  }
});



// ===============================
// iOS/Observer FAILSAFE – mantém reveal + blur
// ===============================
function revealInViewFallback() {
  const els = document.querySelectorAll("[data-reveal]:not(.is-in)");
  els.forEach((el, i) => {
    const r = el.getBoundingClientRect();
    if (r.bottom > 0 && r.top < window.innerHeight * 0.9) {
      setTimeout(() => el.classList.add("is-in"), i * 80);
    }
  });
}

// fallback suave
setTimeout(revealInViewFallback, 900);
window.addEventListener("scroll", revealInViewFallback, { passive: true });
window.addEventListener("resize", revealInViewFallback);
window.addEventListener("pageshow", revealInViewFallback);



// ===============================
// Section handoff transitions (iOS-friendly)
// Adds .is-active to the section currently in view.
// ===============================
(function sectionActiveObserver(){
  const sections = Array.from(document.querySelectorAll(".section"));
  if (!("IntersectionObserver" in window) || sections.length === 0) {
    // fallback: mark first sections as active
    sections.slice(0,2).forEach(s => s.classList.add("is-active"));
    return;
  }

  let last = null;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      if (last && last !== el) last.classList.remove("is-active");
      el.classList.add("is-active");
      last = el;
    });
  }, {
    root: null,
    threshold: 0.35,
    rootMargin: "-15% 0px -55% 0px"
  });

  sections.forEach(s => io.observe(s));
})();



// ===============================
// Scroll-hover for "Como funciona" list items
// ===============================
(function howListHover(){
  const items = document.querySelectorAll(".how__list li");
  if (!("IntersectionObserver" in window) || items.length === 0) return;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        items.forEach(i=>i.classList.remove("is-active"));
        e.target.classList.add("is-active");
      }
    });
  },{
    threshold: 0.6
  });

  items.forEach(i=>io.observe(i));
})();



// ===============================
// HERO ENTRY (guaranteed)
// Adds .is-entered after first paint so CSS transitions run on iOS/Safari.
// ===============================
(function heroEntry(){
  const hero = document.querySelector(".hero");
  if(!hero) return;

  const run = () => {
    // two frames + a tiny timeout to avoid "no animation" on Safari
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => hero.classList.add("is-entered"), 30);
      });
    });
  };

  if (document.readyState === "complete" || document.readyState === "interactive") {
    run();
  } else {
    window.addEventListener("DOMContentLoaded", run, { once: true });
  }
})();
