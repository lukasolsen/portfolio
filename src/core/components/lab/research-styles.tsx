import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";

const categoryColor: Record<string, string> = {
  Basic: "bg-green-500/10 text-green-600 dark:text-green-400",
  Intermediate: "bg-primary/10 text-primary",
  Advanced: "bg-muted text-muted-foreground",
  Interpolation: "bg-primary/10 text-primary",
  Compositing: "bg-green-500/10 text-green-600 dark:text-green-400",
};

export const ResearchStyles = () => {
  const { styles } = backrandLabData.research;

  return (
    <section className="w-full px-4 md:px-8 py-28 border-t border-border/30 bg-muted/3">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Section label */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground/40">06</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Algorithms and warps
            </span>
          </div>

          <p className="text-base text-foreground leading-relaxed max-w-2xl">
            The warp system displaces control points or pixels to create flowing,
            organic distortions. Each algorithm produces distinct visual character —
            from smooth periodic waves to chaotic turbulence.
          </p>

          {/* Styles grid */}
          <div className="grid gap-3 md:grid-cols-2">
            {styles.map((style, i) => {
              const colorClass = categoryColor[style.count] || categoryColor.Basic;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border/20 bg-background hover:border-border/40 transition-colors"
                >
                  <span className="text-xs font-mono text-muted-foreground/30 w-6 shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium text-foreground">
                        {style.name}
                      </p>
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider ${colorClass}`}>
                        {style.count}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {style.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
