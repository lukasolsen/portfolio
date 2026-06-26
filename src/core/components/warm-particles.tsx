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

interface Cloud {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
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

const CLOUD_COLOR = "rgba(245, 244, 237,"; // ivory/cloud color

export function WarmParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const cloudsRef = useRef<Cloud[]>([]);

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

    const createClouds = () => {
      const count = Math.min(5, Math.floor(window.innerWidth / 400));
      cloudsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 0.6,
        width: Math.random() * 400 + 300,
        height: Math.random() * 80 + 40,
        vx: (Math.random() - 0.5) * 0.08,
        opacity: Math.random() * 0.06 + 0.03,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.002 + 0.001,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw clouds first (behind particles)
      for (const c of cloudsRef.current) {
        c.x += c.vx;
        c.pulse += c.pulseSpeed;

        // Wrap around edges
        if (c.x < -c.width) c.x = window.innerWidth + c.width;
        if (c.x > window.innerWidth + c.width) c.x = -c.width;

        const currentOpacity = c.opacity + Math.sin(c.pulse) * 0.015;

        // Draw cloud as multiple overlapping ellipses
        const gradient = ctx.createRadialGradient(
          c.x, c.y, 0,
          c.x, c.y, c.width / 2
        );
        gradient.addColorStop(0, `${CLOUD_COLOR} ${currentOpacity})`);
        gradient.addColorStop(0.5, `${CLOUD_COLOR} ${currentOpacity * 0.6})`);
        gradient.addColorStop(1, `${CLOUD_COLOR} 0)`);

        ctx.beginPath();
        ctx.ellipse(c.x, c.y, c.width / 2, c.height / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw particles
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
    createClouds();
    animate();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
      createClouds();
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
