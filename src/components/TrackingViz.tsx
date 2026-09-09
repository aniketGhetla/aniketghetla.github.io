import { useEffect, useRef, useState } from "react";
import "./TrackingViz.scss";

// ---------------------------------------------------------------------------
// A looping tracking-data animation: 22 players + ball moving through a
// build-up → progression → final-third phase, drawn on a canvas. Procedural,
// not real data — base formations plus a scripted ball path that the players
// lean toward while holding their shape.
// ---------------------------------------------------------------------------

type Pt = { x: number; y: number };

const HOME: Pt[] = [
  { x: 0.05, y: 0.5 }, // GK
  { x: 0.22, y: 0.14 }, { x: 0.16, y: 0.38 }, { x: 0.16, y: 0.62 }, { x: 0.22, y: 0.86 },
  { x: 0.4, y: 0.3 }, { x: 0.36, y: 0.5 }, { x: 0.4, y: 0.7 },
  { x: 0.62, y: 0.16 }, { x: 0.66, y: 0.5 }, { x: 0.62, y: 0.84 },
];

const AWAY: Pt[] = [
  { x: 0.96, y: 0.5 }, // GK
  { x: 0.8, y: 0.16 }, { x: 0.84, y: 0.38 }, { x: 0.84, y: 0.62 }, { x: 0.8, y: 0.84 },
  { x: 0.62, y: 0.18 }, { x: 0.6, y: 0.42 }, { x: 0.6, y: 0.58 }, { x: 0.62, y: 0.82 },
  { x: 0.45, y: 0.4 }, { x: 0.45, y: 0.6 },
];

// Ball path: [t (0-1), x, y]. Players react to this; it loops.
const BALL: [number, number, number][] = [
  [0.0, 0.06, 0.5],
  [0.12, 0.17, 0.38],
  [0.24, 0.2, 0.78],
  [0.36, 0.37, 0.55],
  [0.48, 0.41, 0.28],
  [0.6, 0.6, 0.18],
  [0.72, 0.77, 0.12],
  [0.82, 0.89, 0.32],
  [0.9, 0.8, 0.54],
  [0.96, 0.71, 0.56],
  [1.0, 0.06, 0.5],
];

const PHASES: [number, string][] = [
  [0, "Build-up"],
  [0.34, "Progression"],
  [0.56, "Final third"],
  [0.97, "Reset"],
];

const LOOP_MS = 16000;

const smooth = (t: number) => t * t * (3 - 2 * t);

function ballAt(p: number): Pt {
  for (let i = 0; i < BALL.length - 1; i++) {
    const [t0, x0, y0] = BALL[i];
    const [t1, x1, y1] = BALL[i + 1];
    if (p >= t0 && p <= t1) {
      const k = smooth((p - t0) / (t1 - t0));
      return { x: x0 + (x1 - x0) * k, y: y0 + (y1 - y0) * k };
    }
  }
  return { x: BALL[0][1], y: BALL[0][2] };
}

function phaseAt(p: number): string {
  let label = PHASES[0][1];
  for (const [t, l] of PHASES) if (p >= t) label = l;
  return label;
}

const TrackingViz = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(PHASES[0][1]);
  const [clock, setClock] = useState("00:00");

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      width = r.width;
      height = r.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // the panel can be laid out at 0×0 for a beat on mount / during reflow;
    // skip drawing until it has real dimensions
    const ready = () => width > 40 && height > 40;

    // pitch drawing area (inset)
    const pad = 10;
    const px = (x: number) => pad + x * (width - pad * 2);
    const py = (y: number) => pad + y * (height - pad * 2);

    const home = HOME.map((p) => ({ ...p }));
    const away = AWAY.map((p) => ({ ...p }));
    const trail: Pt[] = [];

    const drawPitch = () => {
      if (!ready()) return;
      ctx.clearRect(0, 0, width, height);
      const g = ctx.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, "#12241a");
      g.addColorStop(1, "#0d1c13");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(244, 246, 241, 0.14)";
      ctx.lineWidth = 1;
      ctx.strokeRect(px(0), py(0), px(1) - px(0), py(1) - py(0));
      ctx.beginPath();
      ctx.moveTo(px(0.5), py(0));
      ctx.lineTo(px(0.5), py(1));
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(px(0.5), py(0.5), Math.max(1, (py(1) - py(0)) * 0.13), 0, Math.PI * 2);
      ctx.stroke();
      // boxes
      const bh = 0.62;
      ctx.strokeRect(px(0), py(0.5 - bh / 2), px(0.16) - px(0), py(bh) - py(0));
      ctx.strokeRect(
        px(0.84),
        py(0.5 - bh / 2),
        px(1) - px(0.84),
        py(bh) - py(0)
      );
    };

    const drawDot = (
      p: Pt,
      color: string,
      rad: number,
      ring?: string
    ) => {
      ctx.beginPath();
      ctx.arc(px(p.x), py(p.y), Math.max(0.5, rad), 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      if (ring) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = ring;
        ctx.stroke();
      }
    };

    let raf = 0;
    let start = performance.now();
    let paused = false;

    const io = new IntersectionObserver(
      ([e]) => {
        paused = !e.isIntersecting;
        if (!paused && !reduced) {
          start = performance.now() - elapsedFrozen;
          raf = requestAnimationFrame(frame);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    let elapsedFrozen = 0;
    let lastTs = performance.now();

    const step = (ballP: number, dt: number) => {
      const ball = ballAt(ballP);
      trail.push({ ...ball });
      if (trail.length > 22) trail.shift();

      const pull = (
        arr: { x: number; y: number }[],
        base: Pt[],
        attack: boolean
      ) => {
        for (let i = 0; i < arr.length; i++) {
          const b = base[i];
          const isGk = i === 0;
          // how much this player leans toward the ball
          const roleK = isGk ? 0.04 : attack ? (i >= 8 ? 0.5 : i >= 5 ? 0.34 : 0.16) : 0.14;
          const dx = ball.x - b.x;
          const dy = ball.y - b.y;
          const dist = Math.hypot(dx, dy);
          const prox = Math.max(0, 1 - dist / 0.55);
          const k = Math.min(0.32, roleK * (0.5 + prox));
          const jitter =
            Math.sin((lastTs / 1000) * (0.7 + i * 0.13) + i) * 0.006;
          const tx = b.x + dx * k + jitter;
          const ty = b.y + dy * k + jitter * 1.4;
          const ease = 1 - Math.exp(-dt * 2.4);
          arr[i].x += (tx - arr[i].x) * ease;
          arr[i].y += (ty - arr[i].y) * ease;
        }
      };
      pull(home, HOME, true);
      pull(away, AWAY, false);
      return ball;
    };

    const render = (ballP: number) => {
      if (!ready()) return;
      drawPitch();

      // ball trail
      for (let i = 0; i < trail.length; i++) {
        const a = (i / trail.length) * 0.5;
        ctx.beginPath();
        ctx.arc(px(trail[i].x), py(trail[i].y), 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 197, 61, ${a})`;
        ctx.fill();
      }

      away.forEach((p) => drawDot(p, "rgba(244, 246, 241, 0.5)", 3.4));
      home.forEach((p) =>
        drawDot(p, "rgba(255, 197, 61, 0.92)", 3.8, "rgba(255,197,61,0.35)")
      );

      const ball = ballAt(ballP);
      drawDot(ball, "#ffffff", 2.6, "rgba(255,255,255,0.6)");
    };

    let lastClock = "";
    let lastPhase = "";

    const frame = (ts: number) => {
      if (paused) return;
      if (!ready()) {
        lastTs = ts;
        raf = requestAnimationFrame(frame);
        return;
      }
      const dtMs = Math.min(48, ts - lastTs);
      lastTs = ts;
      const elapsed = (ts - start) % LOOP_MS;
      elapsedFrozen = ts - start;
      const p = elapsed / LOOP_MS;

      step(p, dtMs / 1000);
      // global fade near the loop seam
      const seam =
        p > 0.95 ? (1 - p) / 0.05 : p < 0.04 ? p / 0.04 : 1;
      ctx.save();
      render(p);
      if (seam < 1) {
        ctx.globalCompositeOperation = "destination-in";
        ctx.fillStyle = `rgba(0,0,0,${Math.max(0.15, seam)})`;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.restore();

      const mins = String(Math.floor((elapsed / LOOP_MS) * 6) + 21).padStart(
        2,
        "0"
      );
      const secs = String(Math.floor(((elapsed / LOOP_MS) * 360) % 60)).padStart(
        2,
        "0"
      );
      const c = `${mins}:${secs}`;
      if (c !== lastClock) {
        lastClock = c;
        setClock(c);
      }
      const ph = phaseAt(p);
      if (ph !== lastPhase) {
        lastPhase = ph;
        setPhase(ph);
      }

      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      step(0.6, 0.1);
      render(0.6);
      setPhase("Final third");
      setClock("23:40");
    } else {
      // paint one frame up front so the pitch is never blank, even if the
      // IntersectionObserver pauses the loop before it first runs
      if (ready()) {
        step(0, 0.1);
        render(0);
      }
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className="tracking-viz" ref={wrapRef}>
      <canvas className="tracking-viz__canvas" ref={canvasRef} />
      <div className="tracking-viz__hud">
        <span className="tracking-viz__tag">Phase of play</span>
        <span className="tracking-viz__phase">{phase}</span>
        <span className="tracking-viz__clock">{clock}</span>
      </div>
    </div>
  );
};

export default TrackingViz;
