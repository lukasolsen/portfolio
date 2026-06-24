import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";

const statusStyles: Record<string, { label: string; color: string }> = {
  "in-progress": { label: "In progress", color: "text-yellow-500" },
  planned: { label: "Planned", color: "text-muted-foreground/50" },
};

export const ResearchExtends = () => {
  const { extends: extendsData } = backrandLabData.research;

  return (
    <section className="w-full px-4 md:px-8 py-28 border-t border-border/30">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Section label */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground/40">09</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Where This Led
            </span>
          </div>

          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            The constrained approach opened directions worth exploring further.
            Each extension builds on the core insight: define boundaries, then
            randomize within them.
          </p>

          {/* Extensions */}
          <div className="space-y-0">
            {extendsData.map((item, i) => {
              const style = statusStyles[item.status];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="py-6 border-b border-border/20 last:border-0"
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${style.color}`}>
                      {style.label}
                    </span>
                  </div>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
