import { motion } from "framer-motion";

export const GradientOrb = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="orb1" cx="30%" cy="40%" r="50%">
            <stop offset="0%" stopColor="oklch(0.6 0.25 280)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="oklch(0.6 0.25 280)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb2" cx="70%" cy="60%" r="40%">
            <stop offset="0%" stopColor="oklch(0.65 0.2 320)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="oklch(0.65 0.2 320)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb3" cx="50%" cy="80%" r="35%">
            <stop offset="0%" stopColor="oklch(0.7 0.15 160)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.7 0.15 160)" stopOpacity="0" />
          </radialGradient>
          <filter id="blur1">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
          </filter>
        </defs>

        <g filter="url(#blur1)">
          <motion.ellipse
            cx="240"
            cy="160"
            rx="200"
            ry="160"
            fill="url(#orb1)"
            animate={{
              cx: [240, 280, 220, 240],
              cy: [160, 180, 140, 160],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="560"
            cy="240"
            rx="180"
            ry="140"
            fill="url(#orb2)"
            animate={{
              cx: [560, 520, 580, 560],
              cy: [240, 220, 260, 240],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="400"
            cy="300"
            rx="160"
            ry="120"
            fill="url(#orb3)"
            animate={{
              cx: [400, 420, 380, 400],
              cy: [300, 280, 320, 300],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      </svg>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
