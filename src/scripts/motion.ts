import Lenis from 'lenis';
import { initTopology } from './topology';

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel) as NodeListOf<T>);
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let lenis: Lenis | null = null;
/** Scroll-linked handlers, run on every scroll frame (Lenis or native). */
const onScrollFns: ((y: number, velocity: number) => void)[] = [];

export function initMotion() {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-topology]');
  if (canvas) initTopology(canvas);

  smoothScroll();
  navBehaviour();
  clock();
  cursor();
  magnetic();
  buttonFill();
  tilt();
  spotlight();
  timeline();
  palette();
  copyButtons();
  scrambleHover();
  velocityMarquee();
  statement();
  parallax();
  giant();
  if (reduced()) $$<SVGSVGElement>('svg.dg').forEach((s) => s.pauseAnimations());

  intro().then(() => {
    reveals();
    counters();
    terminal();
    roleScramble();
  });
}

/* ── Preloader ────────────────────────────────────────────── */
async function intro() {
  const loader = document.querySelector<HTMLElement>('[data-loader]');
  const skip = document.documentElement.classList.contains('no-intro') || reduced();
  if (!loader || skip) { loader?.classList.add('gone'); return; }

  lenis?.stop();
  const bar = loader.querySelector<HTMLElement>('[data-loader-bar]');
  const count = loader.querySelector<HTMLElement>('[data-loader-count]');
  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve();
  const dur = 1400, t0 = performance.now();
  await new Promise<void>((done) => {
    const tick = (now: number) => {
      const p = clamp((now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      if (bar) bar.style.transform = `scaleX(${e})`;
      if (count) count.textContent = String(Math.round(e * 100)).padStart(3, '0');
      p < 1 ? requestAnimationFrame(tick) : done();
    };
    requestAnimationFrame(tick);
  });
  await Promise.race([fonts, sleep(800)]);
  loader.classList.add('out');
  try { sessionStorage.setItem('intro', '1'); } catch { /* private mode */ }
  await sleep(450);
  lenis?.start();
  setTimeout(() => loader.classList.add('gone'), 900);
}

/* ── Smooth scroll ────────────────────────────────────────── */
function smoothScroll() {
  let lastY = scrollY;
  const emit = (y: number, v: number) => onScrollFns.forEach((fn) => fn(y, v));

  if (!reduced()) {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
    lenis.on('scroll', (l: Lenis) => emit(l.scroll, l.velocity));
    const raf = (time: number) => { lenis!.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  } else {
    addEventListener('scroll', () => { const y = scrollY; emit(y, y - lastY); lastY = y; }, { passive: true });
  }

  // In-page anchors go through Lenis so they glide instead of jumping
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href')!;
    const target = id === '#top' ? document.body : document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    scrollToTarget(target as HTMLElement);
  });

  // Fire once so scroll-linked effects start in the right state
  requestAnimationFrame(() => emit(scrollY, 0));
}

function scrollToTarget(el: HTMLElement) {
  if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.4 });
  else el.scrollIntoView();
}

/* ── Scroll reveals ───────────────────────────────────────── */
function reveals() {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  $$('[data-reveal], [data-reveal-group], .timeline li').forEach((el) => io.observe(el));

  // A fully clipped element never reports as visible, so watch its parent instead
  const clipIo = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll(':scope > [data-clip]').forEach((c) => c.classList.add('in'));
      clipIo.unobserve(e.target);
    }),
    { threshold: 0.1 },
  );
  $$('[data-clip]').forEach((el) => el.parentElement && clipIo.observe(el.parentElement));
}

/* ── Number counters ──────────────────────────────────────── */
function counters() {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const el = e.target as HTMLElement;
    const to = Number(el.dataset.count || 0);
    if (reduced() || to === 0) return;
    const dur = 2000, t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4))).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = '0';
    requestAnimationFrame(tick);
  }), { threshold: 0.5 });
  $$('[data-count]').forEach((el) => io.observe(el));
}

/* ── Text scramble ────────────────────────────────────────── */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*+=<>/';
function scrambleTo(el: HTMLElement, to: string, duration = 700) {
  const from = el.textContent || '';
  const len = Math.max(from.length, to.length);
  const t0 = performance.now();
  return new Promise<void>((done) => {
    const tick = (now: number) => {
      const p = clamp((now - t0) / duration);
      let out = '';
      for (let i = 0; i < len; i++) {
        const settle = (i / len) * 0.7 + 0.3;
        if (p >= settle) out += to[i] ?? '';
        else if (p > (i / len) * 0.5) out += to[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        else out += from[i] ?? '';
      }
      el.textContent = out;
      p < 1 ? requestAnimationFrame(tick) : (el.textContent = to, done());
    };
    requestAnimationFrame(tick);
  });
}

function roleScramble() {
  const el = document.querySelector<HTMLElement>('[data-scramble]');
  if (!el || reduced()) return;
  const roles: string[] = JSON.parse(el.dataset.scramble || '[]');
  let i = 0;
  setInterval(() => {
    if (document.hidden) return;
    i = (i + 1) % roles.length;
    scrambleTo(el, roles[i], 900);
  }, 2800);
}

function scrambleHover() {
  if (!finePointer() || reduced()) return;
  $$('[data-scramble-hover]').forEach((el) => {
    const text = el.textContent || '';
    let busy = false;
    el.closest('a')?.addEventListener('pointerenter', async () => {
      if (busy) return;
      busy = true;
      el.textContent = text.replace(/\S/g, () => GLYPHS[(Math.random() * GLYPHS.length) | 0]);
      await scrambleTo(el, text, 450);
      busy = false;
    });
  });
}

/* ── Nav: solid on scroll, hide on scroll-down, progress, scroll-spy ── */
function navBehaviour() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  if (!nav) return;
  let lastY = 0;
  onScrollFns.push((y) => {
    nav.classList.toggle('is-solid', y > 40);
    if (y > 600 && y > lastY + 4) nav.classList.add('is-hidden');
    else if (y < lastY - 4 || y < 600) nav.classList.remove('is-hidden');
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  });

  const links = $$('[data-spy]');
  const spy = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    links.forEach((l) => l.classList.toggle('is-active', l.dataset.spy === e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((l) => { const s = document.getElementById(l.dataset.spy!); if (s) spy.observe(s); });
}

/* ── Local clock ──────────────────────────────────────────── */
function clock() {
  const el = document.querySelector<HTMLElement>('[data-clock]');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: el.dataset.tz });
  const tick = () => { el.textContent = fmt.format(new Date()); };
  tick();
  setInterval(tick, 20_000);
}

/* ── Custom cursor ────────────────────────────────────────── */
function cursor() {
  if (!finePointer() || reduced()) return;
  const ring = document.querySelector<HTMLElement>('.cursor');
  const dot = document.querySelector<HTMLElement>('.cursor-dot');
  const label = document.querySelector<HTMLElement>('[data-cursor-label]');
  if (!ring || !dot) return;
  let x = -100, y = -100, rx = x, ry = y, seen = false;
  ring.classList.add('is-hidden'); dot.classList.add('is-hidden');
  addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY;
    if (!seen) { seen = true; rx = x; ry = y; ring.classList.remove('is-hidden'); dot.classList.remove('is-hidden'); }
    dot.style.transform = `translate(${x}px, ${y}px)`;
    const el = e.target as Element;
    const labelled = el.closest<HTMLElement>('[data-cursor-label]:not(.cursor-label)');
    if (labelled && label) {
      label.textContent = labelled.dataset.cursorLabel || '';
      ring.classList.add('has-label'); ring.classList.remove('is-hover');
    } else {
      ring.classList.remove('has-label');
      ring.classList.toggle('is-hover', !!el.closest('a, button, [data-cursor], input, li[role="option"]'));
    }
  });
  document.addEventListener('pointerleave', () => { ring.classList.add('is-hidden'); dot.classList.add('is-hidden'); });
  document.addEventListener('pointerenter', () => { if (seen) { ring.classList.remove('is-hidden'); dot.classList.remove('is-hidden'); } });
  const loop = () => {
    rx += (x - rx) * 0.17; ry += (y - ry) * 0.17;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  };
  loop();
}

/* ── Magnetic elements ────────────────────────────────────── */
function magnetic() {
  if (!finePointer() || reduced()) return;
  $$('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.translate = `${dx * 0.25}px ${dy * 0.35}px`;
    });
    el.addEventListener('pointerleave', () => { el.style.translate = ''; });
  });
}

/* Gradient fill grows from where the pointer entered the button */
function buttonFill() {
  $$('[data-fill]').forEach((el) => {
    const set = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--bx', `${e.clientX - r.left}px`);
      el.style.setProperty('--by', `${e.clientY - r.top}px`);
    };
    el.addEventListener('pointerenter', set);
    el.addEventListener('pointerleave', set);
  });
}

/* ── 3D tilt on project windows ───────────────────────────── */
function tilt() {
  if (!finePointer() || reduced()) return;
  $$('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.style.transform = `rotateY(${(px - 0.5) * 8}deg) rotateX(${(0.5 - py) * 7}deg)`;
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

/* ── Spotlight on cards ───────────────────────────────────── */
function spotlight() {
  $$('[data-spotlight]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--sx', `${e.clientX - r.left}px`);
      el.style.setProperty('--sy', `${e.clientY - r.top}px`);
    });
  });
}

/* ── Typing terminal ──────────────────────────────────────── */
function terminal() {
  const term = document.querySelector<HTMLElement>('[data-terminal]');
  if (!term || reduced()) return;
  const lines = $$('.ln', term);
  term.classList.add('is-typing');
  const io = new IntersectionObserver(async ([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    for (const ln of lines) {
      const tx = ln.querySelector<HTMLElement>('.tx')!;
      const full = ln.dataset.line || '';
      ln.classList.add('shown');
      if (ln.classList.contains('cmd') || ln.classList.contains('dim')) {
        tx.textContent = '';
        for (const ch of full) { tx.textContent += ch; await sleep(20 + Math.random() * 38); }
        await sleep(360);
      } else {
        tx.textContent = full;
        await sleep(150);
      }
    }
  }, { threshold: 0.4 });
  io.observe(term);
}

/* ── Timeline rail fill ───────────────────────────────────── */
function timeline() {
  const tl = document.querySelector<HTMLElement>('[data-timeline]');
  const rail = document.querySelector<HTMLElement>('[data-rail]');
  if (!tl || !rail) return;
  onScrollFns.push(() => {
    const r = tl.getBoundingClientRect();
    rail.style.setProperty('--p', String(clamp((innerHeight * 0.6 - r.top) / r.height)));
  });
}

/* ── Marquee that reacts to scroll speed ──────────────────── */
function velocityMarquee() {
  const tracks = $$('[data-velo]');
  if (!tracks.length) return;
  if (reduced()) return;
  let velocity = 0;
  onScrollFns.push((_y, v) => { velocity = v; });
  const state = tracks.map((el) => ({ el, x: 0, dir: Number(el.dataset.velo) || 1, half: 0 }));
  const measure = () => state.forEach((s) => { s.half = s.el.scrollWidth / 2; });
  measure();
  addEventListener('resize', measure);
  (document as Document & { fonts?: FontFaceSet }).fonts?.ready.then(measure);

  let last = performance.now();
  let skew = 0;
  const loop = (now: number) => {
    const dt = Math.min(64, now - last) / 1000;
    last = now;
    velocity *= 0.92;
    skew += (clamp(velocity * 0.35, -8, 8) - skew) * 0.12;
    for (const s of state) {
      const speed = (55 + Math.abs(velocity) * 28) * s.dir * (velocity < -0.5 ? -1 : 1);
      s.x -= speed * dt;
      if (s.half) { if (s.x <= -s.half) s.x += s.half; if (s.x > 0) s.x -= s.half; }
      s.el.style.transform = `translate3d(${s.x}px,0,0) skewX(${-skew * s.dir}deg)`;
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

/* ── Statement: words light up as you scroll ──────────────── */
function statement() {
  const sec = document.querySelector<HTMLElement>('[data-statement]');
  if (!sec) return;
  const words = $$('.lw', sec);
  onScrollFns.push(() => {
    const r = sec.getBoundingClientRect();
    const p = clamp((innerHeight * 0.85 - r.top) / (r.height * 0.9));
    const n = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle('on', i < n));
  });
}

/* ── Parallax ─────────────────────────────────────────────── */
function parallax() {
  if (reduced()) return;
  const hero = document.querySelector<HTMLElement>('[data-hero-parallax]');
  const items = $$('[data-parallax]');
  onScrollFns.push((y) => {
    if (hero && y < innerHeight * 1.2) {
      hero.style.translate = `0 ${y * 0.22}px`;
      hero.style.opacity = String(clamp(1 - y / (innerHeight * 0.9)));
    }
    for (const el of items) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) continue;
      const offset = r.top + r.height / 2 - innerHeight / 2;
      el.style.translate = `0 ${offset * Number(el.dataset.parallax || 0)}px`;
    }
  });
}

/* ── Giant name fills with the gradient as it scrolls in ─── */
function giant() {
  const el = document.querySelector<HTMLElement>('[data-giant]');
  if (!el) return;
  if (reduced()) { el.style.setProperty('--fill', '100%'); el.style.setProperty('--fill-n', '1'); return; }
  onScrollFns.push((y) => {
    // Reaches 100% exactly when the page bottoms out
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = clamp(1 - (max - y) / (innerHeight * 0.8));
    el.style.setProperty('--fill', `${(p * 100).toFixed(1)}%`);
    el.style.setProperty('--fill-n', p.toFixed(3));
  });
}

/* ── Command palette (⌘K, Ctrl+K, /) ──────────────────────── */
function palette() {
  const dlg = document.querySelector<HTMLDialogElement>('[data-palette]');
  const input = document.querySelector<HTMLInputElement>('[data-palette-input]');
  if (!dlg || !input) return;
  const items = $$<HTMLLIElement>('[data-palette-list] li', dlg);
  let idx = 0;

  const visible = () => items.filter((i) => !i.hidden);
  const select = (n: number) => {
    const v = visible();
    if (!v.length) return;
    idx = (n + v.length) % v.length;
    items.forEach((i) => i.setAttribute('aria-selected', 'false'));
    v[idx].setAttribute('aria-selected', 'true');
    v[idx].scrollIntoView({ block: 'nearest' });
  };
  const open = () => {
    if (dlg.open) return;
    input.value = ''; items.forEach((i) => (i.hidden = false));
    lenis?.stop();
    dlg.showModal(); input.focus(); select(0);
  };
  dlg.addEventListener('close', () => lenis?.start());
  const go = (li?: HTMLElement) => {
    const href = li?.dataset.href;
    if (!href) return;
    dlg.close();
    if (href.startsWith('copy:')) { navigator.clipboard?.writeText(href.slice(5)); return; }
    if (href.startsWith('#')) { const el = document.querySelector<HTMLElement>(href); if (el) scrollToTarget(el); return; }
    if (href.startsWith('http')) { window.open(href, '_blank', 'noopener'); return; }
    location.href = href;
  };

  $$('[data-palette-open]').forEach((b) => b.addEventListener('click', open));
  addEventListener('keydown', (e) => {
    const typing = (e.target as HTMLElement).closest('input, textarea');
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) { e.preventDefault(); open(); }
  });
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    items.forEach((i) => (i.hidden = !!q && !i.dataset.label!.includes(q)));
    select(0);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); select(idx + 1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); select(idx - 1); }
    if (e.key === 'Enter') { e.preventDefault(); go(visible()[idx]); }
  });
  items.forEach((li) => {
    li.addEventListener('click', () => go(li));
    li.addEventListener('pointermove', () => select(visible().indexOf(li)));
  });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
}

/* ── Copy-to-clipboard buttons ────────────────────────────── */
function copyButtons() {
  $$<HTMLButtonElement>('[data-copy]').forEach((b) => {
    const label = b.textContent;
    b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(b.dataset.copy!); } catch { return; }
      b.textContent = b.dataset.copiedLabel || 'Copied';
      b.classList.add('done');
      setTimeout(() => { b.textContent = label; b.classList.remove('done'); }, 1800);
    });
  });
}
