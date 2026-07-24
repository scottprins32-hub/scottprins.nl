/**
 * Mini-confetti (~40 regels, geen dependency).
 * Spawnt een tijdelijk canvas over het element, schiet er wat
 * papiersnippers uit en ruimt zichzelf op. Bij prefers-reduced-motion
 * gebeurt er bewust niets.
 */
export function confettiBurst(anchor: HTMLElement): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const rect = anchor.getBoundingClientRect();
  const canvas = document.createElement('canvas');
  const size = 320;
  canvas.width = size;
  canvas.height = size;
  canvas.style.cssText = `position:fixed;left:${rect.left + rect.width / 2 - size / 2}px;top:${rect.top + rect.height / 2 - size / 2}px;width:${size}px;height:${size}px;pointer-events:none;z-index:60;`;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const colors = [accent || '#4F46E5', '#F59E0B', '#10B981', '#EF4444', '#FAF8F4'];
  const parts = Array.from({ length: 60 }, () => ({
    x: size / 2,
    y: size / 2,
    vx: (Math.random() - 0.5) * 9,
    vy: Math.random() * -8 - 3,
    w: Math.random() * 6 + 3,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.4,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  const start = performance.now();
  (function tick(now: number) {
    const t = (now - start) / 1100;
    ctx.clearRect(0, 0, size, size);
    for (const p of parts) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25; // zwaartekracht
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, 1 - t);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.w / 4, p.w, p.w / 2);
      ctx.restore();
    }
    if (t < 1) requestAnimationFrame(tick);
    else canvas.remove();
  })(start);
}
