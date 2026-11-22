/* The Fund RaiSCe — dependency-free accessible interactions */
(() => {
  'use strict';
  document.getElementById('year').textContent = String(new Date().getFullYear());
  const menu = document.getElementById('menu-toggle');
  const mobile = document.getElementById('mobile-nav');
  const closeMenu = () => {
    menu.setAttribute('aria-expanded','false');
    menu.setAttribute('aria-label','Open navigation');
    mobile.hidden = true;
  };
  menu?.addEventListener('click', () => {
    const nowOpen = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded',String(nowOpen));
    menu.setAttribute('aria-label',nowOpen ? 'Close navigation' : 'Open navigation');
    mobile.hidden = !nowOpen;
  });
  mobile?.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
  window.addEventListener('resize',() => {if(window.innerWidth>800) closeMenu();},{passive:true});

  // Film filters support touch, keyboard and screen readers.
  const filters = [...document.querySelectorAll('[data-filter]')];
  const films = [...document.querySelectorAll('.film-card')];
  filters.forEach(button => button.addEventListener('click',() => {
    const category = button.dataset.filter;
    filters.forEach(b => {
      const active = b === button;
      b.classList.toggle('active',active);
      b.setAttribute('aria-pressed',String(active));
    });
    films.forEach(card => {card.hidden = category !== 'all' && card.dataset.category !== category;});
  }));

  // Native <dialog> traps focus, supports Escape and has real close behavior.
  const dialog = document.getElementById('film-dialog');
  const video = document.getElementById('film-video');
  const fallback = document.getElementById('preview-fallback');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogSubtitle = document.getElementById('dialog-subtitle');
  let returnFocus = null;
  let activeProbe = null;
  const stopFilm = () => {
    activeProbe?.abort(); activeProbe = null;
    video.pause(); video.removeAttribute('src'); video.load(); video.hidden = true;
    fallback.hidden = false;
  };
  document.querySelectorAll('.film-launch').forEach(button => button.addEventListener('click', async () => {
    const card = button.closest('.film-card');
    if(!card) return;
    returnFocus = button;
    stopFilm();
    dialogTitle.textContent = card.dataset.title || 'The journey';
    dialogSubtitle.textContent = card.dataset.subtitle || '';
    dialog.showModal();
    // Test whether user-provided local media exists before showing player.
    // If absent, a clearly marked design preview is displayed — never a broken player.
    const source = card.dataset.film;
    if(!source) return;
    const controller = new AbortController();
    activeProbe = controller;
    try{
      const response = await fetch(source,{method:'HEAD',signal:controller.signal});
      if(!response.ok || controller.signal.aborted || !dialog.open) return;
      const type = response.headers.get('content-type') || '';
      if(type.includes('text/html')) return; // GitHub Pages fallback, not actual video
      video.src = source; video.hidden = false; fallback.hidden = true;
      video.play().catch(()=>{});
    }catch(_){ /* optional media missing, preview remains visible */ }
  }));
  document.querySelector('.dialog-close')?.addEventListener('click',() => dialog.close());
  document.getElementById('dialog-give')?.addEventListener('click',() => dialog.close());
  dialog?.addEventListener('close',() => {stopFilm(); returnFocus?.focus();});
  dialog?.addEventListener('click',event => {if(event.target===dialog) dialog.close();});

  // Crisp, energy-conscious decorative starfields. Disabled for reduced motion.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const starfields = ['hero-stars','closing-stars'].map(id => document.getElementById(id)).filter(Boolean);
  const scenes = [];
  let animationId = 0;
  let lastFrame = 0;
  const makeStars = (canvas, seed) => {
    const dpr = Math.min(window.devicePixelRatio || 1,2);
    const {width,height} = canvas.getBoundingClientRect();
    if(width === 0 || height === 0) return null;
    canvas.width = Math.ceil(width*dpr); canvas.height = Math.ceil(height*dpr);
    const ctx = canvas.getContext('2d');
    if(!ctx)return null;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    let s = seed;
    const rand = () => {s = (s*1664525+1013904223)>>>0;return s/4294967296;};
    const stars = Array.from({length:Math.min(175,Math.floor(width*height/3900))},() => ({
      x:rand()*width,y:rand()*height,r:rand()*.9+.27,alpha:rand()*.55+.22,phase:rand()*Math.PI*2,speed:rand()*.4+.1
    }));
    return {ctx,width,height,stars};
  };
  const setup = () => {
    scenes.length=0;
    starfields.forEach((c,i)=> {const scene=makeStars(c,901+i*811);if(scene) scenes.push(scene);});
    render(0);
  };
  const render = t => {
    scenes.forEach(({ctx,width,height,stars})=>{
      ctx.clearRect(0,0,width,height);
      stars.forEach(s=>{
        ctx.globalAlpha=s.alpha*(.82+.18*Math.sin(t*.00055*s.speed+s.phase));
        ctx.fillStyle='#f5f5ef';
        ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
      });
      ctx.globalAlpha=1;
    });
  };
  const animate = t => {
    if(t-lastFrame>=32){render(t);lastFrame=t;}
    animationId=window.requestAnimationFrame(animate);
  };
  const syncMotion = () => {
    window.cancelAnimationFrame(animationId);
    render(0);
    if(!reduceMotion.matches && !document.hidden) animationId=window.requestAnimationFrame(animate);
  };
  let resizeRequest=0;
  window.addEventListener('resize',()=>{
    cancelAnimationFrame(resizeRequest);
    resizeRequest=requestAnimationFrame(()=>{setup();syncMotion();});
  },{passive:true});
  document.addEventListener('visibilitychange',syncMotion);
  reduceMotion.addEventListener?.('change',syncMotion);
  setup();syncMotion();
})();
