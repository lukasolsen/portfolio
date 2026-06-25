import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";
import { Header1, LeadText, SmallText } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";

export const BackgradHero = () => {
  const { research, links } = backrandLabData;

  return (
    <section className="w-full relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60">
        <svg
          viewBox="0 0 1200 600"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="bg-g1" cx="25%" cy="35%" r="45%">
              <stop offset="0%" stopColor="oklch(0.55 0.25 280)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="oklch(0.55 0.25 280)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="bg-g2" cx="75%" cy="55%" r="40%">
              <stop offset="0%" stopColor="oklch(0.6 0.2 330)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="oklch(0.6 0.2 330)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="bg-g3" cx="50%" cy="85%" r="30%">
              <stop offset="0%" stopColor="oklch(0.65 0.15 160)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="oklch(0.65 0.15 160)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g style={{ filter: "blur(40px)" }}>
            <ellipse cx="300" cy="210" rx="350" ry="250" fill="url(#bg-g1)" />
            <ellipse cx="900" cy="330" rx="300" ry="220" fill="url(#bg-g2)" />
            <ellipse cx="600" cy="500" rx="250" ry="180" fill="url(#bg-g3)" />
          </g>
        </svg>
      </div>

      <div className="min-h-[85vh] flex items-center justify-center px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
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

          <Header1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
            {research.title}
          </Header1>

          <LeadText className="max-w-2xl mx-auto text-lg md:text-xl">
            {research.subtitle}
          </LeadText>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <SmallText className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-base">
              {research.abstract}
            </SmallText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center justify-center gap-4 pt-2"
          >
            <Button variant="default" size="sm" asChild>
              <a href="#quickstart">
                Get started
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={links.github} target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Source code
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
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
