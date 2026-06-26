import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

const COLORS = [
  "rgba(217, 119, 87,",  // terracotta
  "rgba(237, 161, 0,",   // gold
  "rgba(204, 120, 92,",  // peach
  "rgba(180, 140, 100,", // warm sand
];

export function WarmParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      const count = Math.min(20, Math.floor(window.innerWidth / 80));
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 100 + 60,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.12 + 0.08,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.004 + 0.002,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Wrap around edges
        if (p.x < -p.radius) p.x = window.innerWidth + p.radius;
        if (p.x > window.innerWidth + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = window.innerHeight + p.radius;
        if (p.y > window.innerHeight + p.radius) p.y = -p.radius;

        const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.03;

        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.radius
        );
        gradient.addColorStop(0, `${p.color} ${currentOpacity})`);
        gradient.addColorStop(0.4, `${p.color} ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, `${p.color} 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      aria-hidden="true"
    />
  );
}
