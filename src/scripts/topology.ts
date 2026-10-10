/**
 * Hero background: a living infrastructure graph.
 * Nodes drift in a shallow 3D field, link when close, and carry packets
 * along their links. The pointer joins the graph as one more node.
 */

type Node = { x: number; y: number; z: number; vx: number; vy: number; label?: string };
type Packet = { a: Node; b: Node; t: number; speed: number; c: string };

const LABELS = ['proxy', 'api', 'idp', 'db', 'ops', 'llm', 'edge', 'cache', 'queue', 'k8s'];
const EMBER = '139, 123, 255';
const BONE = '236, 238, 245';
const SIGNAL = '46, 230, 214';

export function initTopology(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w = 0, h = 0, dpr = 1, linkDist = 160;
  let nodes: Node[] = [];
  let packets: Packet[] = [];
  const pointer = { x: -9999, y: -9999, active: false };
  let running = false;
  let raf = 0;
  let last = performance.now();

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width; h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    linkDist = Math.max(110, Math.min(180, w / 9));
    seed();
  }

  function seed() {
    const count = Math.round(Math.min(95, Math.max(36, (w * h) / 16000)));
    nodes = Array.from({ length: count }, (_, i) => ({
      // Bias toward the right side so the headline stays readable
      x: w * (0.15 + Math.pow(Math.random(), 0.7) * 0.85),
      y: Math.random() * h,
      z: 0.35 + Math.random() * 0.65,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      label: i < LABELS.length ? LABELS[i] : undefined,
    }));
    packets = [];
  }

  function spawnPacket() {
    const a = nodes[(Math.random() * nodes.length) | 0];
    let best: Node | null = null, bestD = Infinity;
    for (const n of nodes) {
      if (n === a) continue;
      const d = Math.hypot(n.x - a.x, n.y - a.y);
      if (d < linkDist && d < bestD && Math.random() > 0.3) { best = n; bestD = d; }
    }
    if (best) packets.push({ a, b: best, t: 0, speed: 0.5 + Math.random() * 0.7, c: Math.random() < 0.5 ? EMBER : SIGNAL });
  }

  function step(dt: number) {
    for (const n of nodes) {
      n.x += n.vx * dt * 0.06 * n.z;
      n.y += n.vy * dt * 0.06 * n.z;
      // soft pointer repulsion
      if (pointer.active) {
        const dx = n.x - pointer.x, dy = n.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120 && d2 > 1) {
          const f = (1 - Math.sqrt(d2) / 120) * 0.6;
          n.x += (dx / Math.sqrt(d2)) * f;
          n.y += (dy / Math.sqrt(d2)) * f;
        }
      }
      if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
      if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
    }
    if (packets.length < 14 && Math.random() < 0.08) spawnPacket();
    packets = packets.filter((p) => (p.t += (dt / 1000) * p.speed) < 1);
  }

  function draw() {
    ctx!.clearRect(0, 0, w, h);

    // links
    ctx!.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < linkDist) {
          const alpha = (1 - d / linkDist) * 0.22 * Math.min(a.z, b.z);
          ctx!.strokeStyle = `rgba(${BONE}, ${alpha})`;
          ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y); ctx!.stroke();
        }
      }
      if (pointer.active) {
        const d = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (d < linkDist * 1.3) {
          ctx!.strokeStyle = `rgba(${EMBER}, ${(1 - d / (linkDist * 1.3)) * 0.55})`;
          ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(pointer.x, pointer.y); ctx!.stroke();
        }
      }
    }

    // packets
    for (const p of packets) {
      const e = p.t < 0.5 ? 2 * p.t * p.t : 1 - Math.pow(-2 * p.t + 2, 2) / 2;
      const x = p.a.x + (p.b.x - p.a.x) * e;
      const y = p.a.y + (p.b.y - p.a.y) * e;
      const g = ctx!.createRadialGradient(x, y, 0, x, y, 10);
      g.addColorStop(0, `rgba(${p.c}, 0.95)`);
      g.addColorStop(1, `rgba(${p.c}, 0)`);
      ctx!.fillStyle = g;
      ctx!.beginPath(); ctx!.arc(x, y, 10, 0, Math.PI * 2); ctx!.fill();
    }

    // nodes
    ctx!.font = '10px "Geist Mono", ui-monospace, monospace';
    for (const n of nodes) {
      const r = 1 + n.z * 1.8;
      ctx!.fillStyle = n.label ? `rgba(${EMBER}, ${0.5 + n.z * 0.5})` : `rgba(${BONE}, ${0.25 + n.z * 0.45})`;
      ctx!.beginPath(); ctx!.arc(n.x, n.y, n.label ? r + 1 : r, 0, Math.PI * 2); ctx!.fill();
      if (n.label) {
        ctx!.strokeStyle = `rgba(${EMBER}, 0.25)`;
        ctx!.beginPath(); ctx!.arc(n.x, n.y, r + 6, 0, Math.PI * 2); ctx!.stroke();
        ctx!.fillStyle = `rgba(${BONE}, ${0.35 + n.z * 0.35})`;
        ctx!.fillText(n.label, n.x + 10, n.y + 3);
      }
    }

    if (pointer.active) {
      ctx!.fillStyle = `rgba(${SIGNAL}, 0.9)`;
      ctx!.beginPath(); ctx!.arc(pointer.x, pointer.y, 2.5, 0, Math.PI * 2); ctx!.fill();
    }
  }

  function loop(now: number) {
    const dt = Math.min(48, now - last);
    last = now;
    step(dt);
    draw();
    if (running) raf = requestAnimationFrame(loop);
  }

  function start() {
    if (running || reduced) return;
    running = true; last = performance.now();
    raf = requestAnimationFrame(loop);
  }
  function stop() { running = false; cancelAnimationFrame(raf); }

  resize();
  draw();

  let rt = 0;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = window.setTimeout(() => { resize(); draw(); }, 150); });

  const host = canvas.parentElement!;
  host.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.active = true;
  });
  host.addEventListener('pointerleave', () => { pointer.active = false; });

  let inView = true;
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    inView ? start() : stop();
  }).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden || !inView ? stop() : start()));
}
