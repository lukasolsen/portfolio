import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";
import { LeadText } from "@/components/typography/typography";

export const ResearchHero = () => {
  const { research } = backrandLabData;

  return (
    <section className="w-full relative overflow-hidden">
      {/* Background SVG */}
      <div className="absolute inset-0 -z-10 opacity-60">
        <svg
          viewBox="0 0 1200 600"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="hero-g1" cx="25%" cy="35%" r="45%">
              <stop offset="0%" stopColor="oklch(0.55 0.25 280)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="oklch(0.55 0.25 280)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hero-g2" cx="75%" cy="55%" r="40%">
              <stop offset="0%" stopColor="oklch(0.6 0.2 330)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="oklch(0.6 0.2 330)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hero-g3" cx="50%" cy="85%" r="30%">
              <stop offset="0%" stopColor="oklch(0.65 0.15 160)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="oklch(0.65 0.15 160)" stopOpacity="0" />
            </radialGradient>
            <filter id="hero-blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
            </filter>
          </defs>
          <g filter="url(#hero-blur)">
            <motion.ellipse
              cx="300" cy="210" rx="350" ry="250"
              fill="url(#hero-g1)"
              animate={{ cx: [300, 350, 280, 300], cy: [210, 240, 190, 210] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.ellipse
              cx="900" cy="330" rx="300" ry="220"
              fill="url(#hero-g2)"
              animate={{ cx: [900, 850, 920, 900], cy: [330, 300, 360, 330] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.ellipse
              cx="600" cy="500" rx="250" ry="180"
              fill="url(#hero-g3)"
              animate={{ cx: [600, 630, 570, 600], cy: [500, 480, 520, 500] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        </svg>
      </div>

      <div className="min-h-[90vh] flex items-center justify-center px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          {/* Status + period */}
          <div className="flex items-center justify-center gap-4">
            <span className="flex items-center gap-2 text-xs font-mono text-green-600 dark:text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {research.status}
            </span>
            <span className="text-xs text-muted-foreground/40">|</span>
            <span className="text-xs font-mono text-muted-foreground">
              {research.period}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-[6rem] font-bold tracking-tighter text-foreground leading-[0.85]">
            {research.title}
          </h1>

          {/* Subtitle */}
          <LeadText className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            {research.subtitle}
          </LeadText>

          {/* Abstract preview */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm text-muted-foreground/60 max-w-xl mx-auto leading-relaxed"
          >
            {research.abstract}
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="pt-8"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex flex-col items-center gap-2 text-muted-foreground/40"
            >
              <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
              <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                <rect x="1" y="1" width="10" height="18" rx="5" stroke="currentColor" strokeWidth="1" />
                <motion.circle
                  cx="6" cy="7" r="1.5" fill="currentColor"
                  animate={{ cy: [7, 13, 7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
