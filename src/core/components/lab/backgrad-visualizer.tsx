import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function DelaunayDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let points: { x: number; y: number; ox: number; oy: number; vx: number; vy: number }[] = [];
    let raf: number;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const init = () => {
      points = Array.from({ length: 18 }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return { x, y, ox: x, oy: y, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 };
      });
    };

    const hue = (i: number) => `hsl(${260 + i * 12}, 70%, 60%)`;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      points.forEach((p, i) => {
        p.x = p.ox + Math.sin(t * 0.0004 + i) * 18;
        p.y = p.oy + Math.cos(t * 0.0003 + i * 1.3) * 14;
      });

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.strokeStyle = `rgba(160,140,200,${0.15 * (1 - dist / 140)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      points.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = hue(i);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = hue(i).replace("60%", "60%").replace(")", ",0.15)");
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    init();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function FlowFieldDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let particles: { x: number; y: number; px: number; py: number; life: number }[] = [];
    let raf: number;

    const fade = () => {
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fillRect(0, 0, w, h);
    };

    const noise = (x: number, y: number, t: number) => {
      const a = Math.sin(x * 0.012 + t) * Math.cos(y * 0.009 + t * 0.7);
      const b = Math.sin(y * 0.015 + t * 1.1) * Math.cos(x * 0.011 + t * 0.5);
      return a + b;
    };

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, w, h);
    };

    const spawn = () => {
      if (particles.length < 350) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          px: 0, py: 0,
          life: 200 + Math.random() * 200,
        });
      }
    };

    const draw = (t: number) => {
      fade();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const angle = noise(p.x, p.y, t * 0.0002) * Math.PI * 2;
        p.px = p.x;
        p.py = p.y;
        p.x += Math.cos(angle) * 1.8;
        p.y += Math.sin(angle) * 1.8;
        p.life--;

        if (p.life <= 0 || p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = Math.min(p.life / 60, 1) * 0.7;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(120,180,240,${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      spawn();
      raf = requestAnimationFrame(draw);
    };

    resize();
    for (let i = 0; i < 200; i++) spawn();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function WarpDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf: number;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const time = t * 0.001;
      const cols = 22;
      const rows = 14;
      const cellW = w / cols;
      const cellH = h / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const baseX = c * cellW + cellW / 2;
          const baseY = r * cellH + cellH / 2;
          const warpX = Math.sin(c * 0.4 + time * 0.8) * 6 + Math.cos(r * 0.3 + time * 0.5) * 4;
          const warpY = Math.cos(c * 0.3 + time * 0.6) * 5 + Math.sin(r * 0.5 + time * 0.7) * 3;
          const x = baseX + warpX;
          const y = baseY + warpY;
          const hue = 260 + Math.sin(c * 0.2 + r * 0.15 + time * 0.3) * 50;
          const lightness = 55 + Math.sin(c * 0.3 + r * 0.2 + time * 0.4) * 15;

          ctx.beginPath();
          ctx.arc(x, y, cellW * 0.32, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, 65%, ${lightness}%, 0.6)`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

const demos = [
  {
    label: "Delaunay triangulation",
    description: "Control points drift softly, triangles reform in real-time. This is how mesh_gradient builds its organic structure.",
    Demo: DelaunayDemo,
  },
  {
    label: "Flow field warp",
    description: "Particles follow a Perlin noise field, tracing flowing paths. The warp system displaces pixels along these fields.",
    Demo: FlowFieldDemo,
  },
  {
    label: "Warp displacement",
    description: "A grid of points oscillates through sine and cosine waves. This is the sinusoidal warp applied to control points.",
    Demo: WarpDemo,
  },
];

export const BackgradVisualizer = () => {
  return (
    <section className="w-full px-4 md:px-8 py-20 border-t border-border/30 bg-muted/3">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground/40">03</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              How it works
            </span>
          </div>

          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            Each algorithm runs entirely in code — no models, no training data. Here are three
            core mechanisms animated in real-time.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {demos.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#0a0a0f] border border-border/20">
                  <d.Demo />
                </div>
                <h4 className="text-sm font-medium text-foreground">{d.label}</h4>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  {d.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
