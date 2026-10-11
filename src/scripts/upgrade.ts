/**
 * Het upgrade-ding. Zie Upgrade.astro voor wat het doet; hier staat hoe.
 *
 * De bovenste laag (de nieuwe site) wordt bijgesneden tot een vloeibare
 * vlek: een polygoon met een paar sinusgolven erin, die meerekt met de
 * snelheid van de muis. Eén GSAP-ticker tekent hem, en alleen zolang er
 * iets te tekenen valt.
 *
 *   muis       : erover bewegen = lens, ingedrukt houden = uitgieten
 *   duim       : ingedrukt houden = uitgieten (verticaal scrollen blijft werken)
 *   toetsenbord: de knop Upgrade giet hem in één keer uit
 *   reduced    : geen lens en geen vlek, een overvloeier van 0,3 s
 */
import { gsap, reducedMotion, finePointer } from './motion/core';
import { siteIntro } from './site-intro';
import { isTradeId, toDomain, type TradeId } from '../data/trade-ids';
import { currentName, getState, setState, subscribe, wasRestored } from './state';

/** Zo lang houd je vast voordat hij omslaat. Lang genoeg om het te voelen. */
const HOLD_MS = 1150;
const POINTS = 64;
const TAU = Math.PI * 2;

type Mode = 'idle' | 'lens' | 'hold' | 'tween' | 'revealed';

const HIDDEN = 'circle(0px at 50% 50%)';

function blob(cx: number, cy: number, r: number, time: number, stretch: number, angle: number, excite: number): string {
  if (r < 0.5) return HIDDEN;
  const ca = Math.cos(angle);
  const sa = Math.sin(angle);
  const amp = 1 + excite;
  const pts: string[] = [];
  for (let i = 0; i < POINTS; i++) {
    const th = (i / POINTS) * TAU;
    const wobble =
      1 +
      amp *
        (0.05 * Math.sin(3 * th + time * 1.6) +
          0.032 * Math.sin(5 * th - time * 2.2) +
          0.018 * Math.sin(2 * th + time * 0.8));
    const x0 = Math.cos(th) * r * wobble;
    const y0 = Math.sin(th) * r * wobble;
    /* Rekken langs de bewegingsrichting, iets smaller dwars erop. */
    const along = (x0 * ca + y0 * sa) * (1 + stretch);
    const across = (-x0 * sa + y0 * ca) * (1 - stretch * 0.45);
    const x = cx + along * ca - across * sa;
    const y = cy + along * sa + across * ca;
    pts.push(`${x.toFixed(1)}px ${y.toFixed(1)}px`);
  }
  return `polygon(${pts.join(',')})`;
}

export function initUpgrade(root: HTMLElement): void {
  const stage = root.querySelector<HTMLElement>('[data-stage]');
  const after = root.querySelector<HTMLElement>('[data-layer="after"]');
  const upgradeBtn = root.querySelector<HTMLButtonElement>('[data-upgrade]');
  const resetBtn = root.querySelector<HTMLButtonElement>('[data-reset]');
  const claim = root.querySelector<HTMLAnchorElement>('[data-claim]');
  const open = root.querySelector<HTMLAnchorElement>('[data-open]');
  const live = root.querySelector<HTMLElement>('[data-live]');
  const input = root.querySelector<HTMLInputElement>('[data-name-input]');
  const domain = root.querySelector<HTMLElement>('[data-domain]');
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  if (!stage || !after || !upgradeBtn) return;

  const reduce = reducedMotion();
  const fine = finePointer();
  const exampleBase = root.dataset.exampleBase ?? '/voorbeeld/';

  /* De branche die de server neerzette. Een pagina met een vaste branche
     (data-preset) wint; anders komt een eerdere keuze uit dit tabblad terug. */
  let trade: TradeId = isTradeId(root.dataset.trade) ? root.dataset.trade : getState().trade;
  const preset = isTradeId(root.dataset.preset) ? root.dataset.preset : null;
  const startTrade: TradeId = preset ?? (wasRestored() ? getState().trade : trade);
  if (!preset && !wasRestored()) setState({ trade });

  /* ------------------------------------------------------------ maten -- */
  let W = 0;
  let H = 0;
  let lensR = 100;
  let maxR = 1600;

  function measure(): void {
    W = stage!.clientWidth;
    H = stage!.clientHeight;
    const virtueel = root.clientWidth < 640 ? 390 : 1280;
    stage!.style.setProperty('--s-js', String(W / virtueel));
    lensR = Math.max(58, Math.min(W, H) * 0.17);
    /* Vanaf elk punt ligt de verste hoek binnen de diagonaal; de marge
       vangt de golven op, zodat er aan de rand niets van de oude site
       doorschemert. */
    maxR = Math.hypot(W, H) * 1.12;
  }
  measure();
  new ResizeObserver(measure).observe(root);

  /* ------------------------------------------------------------ vlek -- */
  const s = { cx: W / 2, cy: H / 2, tx: W / 2, ty: H / 2, r: 0, p: 0, stretch: 0, angle: 0, time: 0, excite: 0 };
  let mode: Mode = 'idle';
  let ticking = false;
  let inside = false;
  let pointerType = 'mouse';
  let holdBase = 0;
  let clientX = 0;
  let clientY = 0;
  /** De demonstratie en het kijkje na de eerste letter: wijken voor de bezoeker. */
  let softTl: gsap.core.Timeline | null = null;
  let touched = false;

  function draw(): void {
    after!.style.clipPath = blob(s.cx, s.cy, s.r, s.time, s.stretch, s.angle, s.excite);
  }

  function tick(_time: number, deltaTime: number): void {
    const dt = Math.min(deltaTime, 50) / 1000;
    s.time += dt;
    const px = s.cx;
    const py = s.cy;

    if (mode !== 'tween') {
      const follow = 1 - Math.pow(0.0008, dt);
      s.cx += (s.tx - s.cx) * follow;
      s.cy += (s.ty - s.cy) * follow;
    }

    const vx = (s.cx - px) / Math.max(dt, 0.001);
    const vy = (s.cy - py) / Math.max(dt, 0.001);
    const speed = Math.hypot(vx, vy);
    s.stretch += (Math.min(speed / 2600, 0.32) - s.stretch) * (1 - Math.pow(0.004, dt));
    if (speed > 40) s.angle = Math.atan2(vy, vx);

    if (mode === 'hold') {
      s.p = Math.min(1, s.p + (dt * 1000) / HOLD_MS);
      setFill(s.p);
      if (s.p >= 1) {
        complete();
        return;
      }
    }

    if (!reduce && mode !== 'tween') {
      let target = 0;
      if (mode === 'lens') target = lensR;
      else if (mode === 'hold') {
        const e = s.p * s.p * s.p;
        target = holdBase + (maxR - holdBase) * e;
      }
      s.r += (target - s.r) * (1 - Math.pow(0.00002, dt));
      s.excite += ((mode === 'hold' ? 0.9 * s.p : 0) - s.excite) * (1 - Math.pow(0.01, dt));
    }

    if (!reduce) draw();
    if (mode === 'idle' && s.r < 0.5) stop();
  }

  function start(): void {
    if (ticking) return;
    ticking = true;
    gsap.ticker.add(tick);
  }

  function stop(): void {
    if (!ticking) return;
    ticking = false;
    gsap.ticker.remove(tick);
    if (mode !== 'revealed') after!.style.clipPath = HIDDEN;
  }

  function setFill(p: number): void {
    upgradeBtn!.style.setProperty('--p', p.toFixed(3));
  }

  function announce(message: string | undefined): void {
    if (!live || !message) return;
    live.textContent = '';
    requestAnimationFrame(() => {
      live.textContent = message;
    });
  }

  /* ---------------------------------------------------- de onthulling -- */
  let introTl: gsap.core.Timeline | null = null;
  function playAfterIntro(): void {
    if (reduce) return;
    const site = after!.querySelector<HTMLElement>(`.site[data-site="${trade}"]`);
    if (!site) return;
    /* Een vorige intro (andere branche) eerst netjes afronden. */
    introTl?.progress(1).kill();
    introTl = siteIntro(site);
  }

  function setRevealed(moveFocus: boolean): void {
    mode = 'revealed';
    stop();
    after!.style.clipPath = 'none';
    root.dataset.state = 'revealed';
    delete root.dataset.holding;
    setFill(0);
    s.p = 0;
    s.excite = 0;
    announce(root.dataset.srRevealed);
    setState({ revealed: true });
    playAfterIntro();
    if (moveFocus) claim?.focus({ preventScroll: true });
  }

  function complete(moveFocus = false): void {
    delete root.dataset.holding;
    if (reduce) {
      setRevealed(moveFocus);
      gsap.fromTo(after, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power1.out', clearProps: 'opacity' });
      return;
    }
    mode = 'tween';
    start();
    gsap.to(s, {
      r: maxR,
      excite: 0.4,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => setRevealed(moveFocus),
    });
  }

  function reset(): void {
    if (mode !== 'revealed') return;
    const hadFocus = document.activeElement === resetBtn;
    root.dataset.state = 'idle';
    setState({ revealed: false });
    announce(root.dataset.srReset);
    if (hadFocus) upgradeBtn!.focus({ preventScroll: true });
    if (reduce) {
      gsap.to(after, {
        opacity: 0,
        duration: 0.3,
        ease: 'power1.out',
        onComplete: () => {
          after!.style.clipPath = HIDDEN;
          gsap.set(after, { clearProps: 'opacity' });
          mode = 'idle';
        },
      });
      return;
    }
    s.cx = s.tx = W / 2;
    s.cy = s.ty = H / 2;
    s.r = maxR;
    mode = 'tween';
    start();
    gsap.to(s, {
      r: 0,
      duration: 0.95,
      ease: 'power3.inOut',
      onComplete: () => {
        mode = 'idle';
      },
    });
  }

  /* ----------------------------------------------------------- invoer -- */
  function local(e: PointerEvent | { clientX: number; clientY: number }): void {
    clientX = e.clientX;
    clientY = e.clientY;
    const rect = stage!.getBoundingClientRect();
    s.tx = clientX - rect.left;
    s.ty = clientY - rect.top;
  }

  /** De eerste echte aanraking stopt de demonstratie. */
  function interacted(): void {
    touched = true;
    if (softTl) {
      softTl.kill();
      softTl = null;
      s.tx = s.cx;
      s.ty = s.cy;
      if (mode === 'tween') mode = 'idle';
    }
  }

  function holdStart(): void {
    mode = 'hold';
    s.p = 0;
    holdBase = pointerType === 'mouse' ? lensR : lensR * 0.8;
    root.dataset.holding = '';
    start();
  }

  function holdEnd(): void {
    if (mode !== 'hold') return;
    delete root.dataset.holding;
    mode = inside && fine && pointerType === 'mouse' && !reduce ? 'lens' : 'idle';
    s.p = 0;
    setFill(0);
  }

  stage.addEventListener('pointerenter', (e) => {
    inside = true;
    if (e.pointerType !== 'mouse' || reduce || mode === 'revealed') return;
    interacted();
    if (mode === 'tween') return;
    local(e);
    if (s.r < 1) {
      s.cx = s.tx;
      s.cy = s.ty;
    }
    if (mode === 'idle') mode = 'lens';
    start();
  });

  stage.addEventListener('pointermove', (e) => {
    if (mode !== 'revealed') local(e);
  });

  stage.addEventListener('pointerleave', () => {
    inside = false;
    if (mode === 'lens') mode = 'idle';
  });

  stage.addEventListener('pointerdown', (e) => {
    if (mode === 'revealed' || (e.pointerType === 'mouse' && e.button !== 0)) return;
    interacted();
    if (mode === 'tween') return;
    pointerType = e.pointerType;
    local(e);
    if (s.r < 1) {
      s.cx = s.tx;
      s.cy = s.ty;
    }
    if (e.pointerType === 'mouse') {
      stage.setPointerCapture(e.pointerId);
      e.preventDefault();
    }
    holdStart();
  });
  stage.addEventListener('pointerup', holdEnd);
  stage.addEventListener('pointercancel', holdEnd);
  /* Lang drukken op een telefoon opent anders een menu. */
  stage.addEventListener('contextmenu', (e) => e.preventDefault());

  /* Scrollt de pagina onder een stilstaande muis door, dan blijft de lens
     onder de muis staan in plaats van mee te schuiven. */
  window.addEventListener(
    'scroll',
    () => {
      if (inside && (mode === 'lens' || mode === 'hold')) local({ clientX, clientY });
    },
    { passive: true },
  );

  upgradeBtn.addEventListener('click', () => {
    interacted();
    if (mode === 'revealed' || mode === 'tween') return;
    const moveFocus = document.activeElement === upgradeBtn;
    if (reduce) {
      complete(moveFocus);
      return;
    }
    if (s.r < 1) {
      s.cx = s.tx = W / 2;
      s.cy = s.ty = H / 2;
    }
    mode = 'tween';
    start();
    gsap.to(s, {
      r: maxR,
      excite: 0.6,
      duration: 1.15,
      ease: 'power2.in',
      onComplete: () => setRevealed(moveFocus),
    });
  });

  resetBtn?.addEventListener('click', reset);

  /* ----------------------------------------------------- de demonstratie --
     Eén keer, als het ding voor het eerst goed in beeld is: de lens komt
     even langs, zodat je ziet dat er iets onder zit. Daarna niet meer. */
  if (!reduce) {
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || entry.intersectionRatio < 0.6) return;
        io.disconnect();
        if (touched || mode !== 'idle') return;
        mode = 'tween';
        start();
        s.cx = W * 0.3;
        s.cy = H * 0.52;
        s.r = 0;
        softTl = gsap
          .timeline({
            delay: 0.5,
            onComplete: () => {
              softTl = null;
              s.tx = s.cx;
              s.ty = s.cy;
              if (mode === 'tween') mode = 'idle';
            },
          })
          .to(s, { r: lensR * 1.3, duration: 0.8, ease: 'expo.out' })
          .to(s, { cx: W * 0.66, cy: H * 0.44, duration: 1.7, ease: 'sine.inOut' }, 0.1)
          .to(s, { r: 0, duration: 0.6, ease: 'power2.in' }, 1.6);
      },
      { threshold: [0, 0.6] },
    );
    io.observe(stage);
  }

  /* ----------------------------------------------------- branche en naam -- */
  function exampleHref(): string {
    const typed = getState().typed.trim();
    return `${exampleBase}${trade}/${typed ? `#${encodeURIComponent(typed)}` : ''}`;
  }

  function applyName(): void {
    const name = currentName();
    for (const el of root.querySelectorAll<HTMLElement>('[data-naam]')) {
      if (el.textContent !== name) el.textContent = name;
    }
    if (domain) domain.textContent = toDomain(name);
    if (open) open.href = exampleHref();
  }

  function selectTrade(id: TradeId, focus = false): void {
    if (id === trade) return;
    trade = id;
    root.dataset.trade = id;
    for (const tab of tabs) {
      const on = tab.dataset.tab === id;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      if (on) {
        if (focus) tab.focus({ preventScroll: true });
        /* Alleen de tabrij zelf schuiven, nooit de pagina. */
        const list = tab.parentElement;
        if (list && list.scrollWidth > list.clientWidth) {
          const t = tab.getBoundingClientRect();
          const l = list.getBoundingClientRect();
          list.scrollLeft += t.left - l.left - (l.width - t.width) / 2;
        }
        stage!.setAttribute('aria-labelledby', tab.id);
      }
    }
    for (const el of root.querySelectorAll<HTMLElement>('.site[data-site]')) {
      el.hidden = el.dataset.site !== id;
    }
    setState({ trade: id });
    if (mode === 'revealed') playAfterIntro();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      if (isTradeId(tab.dataset.tab)) selectTrade(tab.dataset.tab);
    });
    tab.addEventListener('keydown', (e) => {
      let next = -1;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next < 0) return;
      e.preventDefault();
      const id = tabs[next].dataset.tab;
      if (isTradeId(id)) selectTrade(id, true);
    });
  });

  let firstTyped = true;
  input?.addEventListener('input', () => {
    setState({ typed: input.value });
    /* De eerste letter: kijk even door de lens, zodat je je naam op de
       nieuwe site ziet staan. */
    if (firstTyped && input.value.trim() && mode === 'idle' && !reduce) {
      firstTyped = false;
      interacted();
      mode = 'tween';
      start();
      s.cx = W * 0.32;
      s.cy = H * 0.42;
      s.r = 0;
      softTl = gsap
        .timeline({
          onComplete: () => {
            softTl = null;
            s.tx = s.cx;
            s.ty = s.cy;
            if (mode === 'tween') mode = 'idle';
          },
        })
        .to(s, { r: Math.min(W, H) * 0.34, duration: 0.7, ease: 'expo.out' })
        .to(s, { r: 0, duration: 0.6, ease: 'power2.in' }, 1.9);
    }
  });
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      input.blur();
    }
  });

  subscribe((state, changed) => {
    if ('typed' in changed || 'trade' in changed) applyName();
    if (input && 'typed' in changed && document.activeElement !== input && input.value !== state.typed) {
      input.value = state.typed;
    }
    if ('trade' in changed && changed.trade && changed.trade !== trade) selectTrade(changed.trade);
  });
  if (input && getState().typed) input.value = getState().typed;
  if (startTrade !== trade) selectTrade(startTrade);
  else setState({ trade });
  applyName();
}
