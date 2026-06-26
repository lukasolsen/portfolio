import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";
import { Header6 } from "@/components/typography/typography";

const typeBadge: Record<string, { label: string; className: string }> = {
  release: {
    label: "Release",
    className: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  feature: {
    label: "Feature",
    className: "bg-primary/10 text-primary",
  },
  improvement: {
    label: "Improvement",
    className: "bg-muted text-muted-foreground",
  },
};

export const BackgradUpdates = () => {
  const { updates } = backrandLabData.research;

  return (
    <section className="w-full px-4 md:px-8 py-20 border-t border-border/30 bg-muted/3">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground/40">07</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Updates
            </span>
          </div>

          <div className="relative">
            <div className="absolute left-[52px] top-2 bottom-2 w-px bg-border/20" />

            <div className="space-y-0">
              {updates.map((update, i) => {
                const badge = typeBadge[update.type];
                const date = new Date(update.date);
                const formatted = date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    viewport={{ once: true }}
                    className="relative flex items-start gap-4 py-4"
                  >
                    <div className="relative z-10 flex items-center justify-center w-[44px] shrink-0">
                      <span className="text-xs font-mono text-muted-foreground/50">
                        {formatted}
                      </span>
                    </div>

                    <div className="relative z-10 flex items-center justify-center w-2 h-2 rounded-full bg-border/40 mt-1.5 shrink-0" />

                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Header6 className="font-medium">
                          {update.title}
                        </Header6>
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {update.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
