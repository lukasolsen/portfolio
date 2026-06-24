import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";

export const ResearchApproach = () => {
  const { approach } = backrandLabData.research;

  return (
    <section className="w-full px-4 md:px-8 py-28 border-t border-border/30 bg-muted/3">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Section label */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground/40">02</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Approach
            </span>
          </div>

          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            {approach.summary}
          </p>

          {/* Pipeline SVG diagram */}
          <div className="py-8">
            <svg
              viewBox="0 0 900 120"
              className="w-full h-auto"
              fill="none"
            >
              {approach.pipeline.map((step, i) => {
                const x = i * 225 + 20;
                const nextX = (i + 1) * 225 + 20;
                return (
                  <g key={i}>
                    {/* Box */}
                    <motion.rect
                      x={x}
                      y="20"
                      width="185"
                      height="80"
                      rx="8"
                      className="fill-background stroke-border/40"
                      strokeWidth="1"
                      initial={{ opacity: 0, x: x - 20 }}
                      whileInView={{ opacity: 1, x }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    />
                    {/* Stage label */}
                    <text
                      x={x + 16}
                      y="48"
                      className="fill-foreground text-[13px] font-semibold"
                    >
                      {step.stage}
                    </text>
                    {/* Description */}
                    <text
                      x={x + 16}
                      y="66"
                      className="fill-muted-foreground text-[10px]"
                    >
                      {step.description.length > 40
                        ? step.description.slice(0, 40) + "..."
                        : step.description}
                    </text>
                    <text
                      x={x + 16}
                      y="82"
                      className="fill-muted-foreground/50 text-[9px] font-mono"
                    >
                      {step.detail}
                    </text>
                    {/* Arrow */}
                    {i < approach.pipeline.length - 1 && (
                      <motion.line
                        x1={x + 185}
                        y1="60"
                        x2={nextX}
                        y2="60"
                        className="stroke-border/30"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                        viewport={{ once: true }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
