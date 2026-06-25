import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";

const categoryMeta: Record<string, { label: string; color: string; dotColor: string }> = {
  "Short-term": {
    label: "Short-term",
    color: "text-green-500",
    dotColor: "bg-green-500",
  },
  "Medium-term": {
    label: "Medium-term",
    color: "text-blue-500",
    dotColor: "bg-blue-500",
  },
  "Long-term": {
    label: "Long-term",
    color: "text-purple-500",
    dotColor: "bg-purple-500",
  },
};

const statusBadge: Record<string, { label: string; className: string }> = {
  "in-progress": {
    label: "In progress",
    className: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  },
  planned: {
    label: "Planned",
    className: "bg-muted text-muted-foreground/50",
  },
};

export const ResearchExtends = () => {
  const { extends: roadmap } = backrandLabData.research;

  return (
    <section className="w-full px-4 md:px-8 py-28 border-t border-border/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Section label */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground/40">09</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Roadmap
            </span>
          </div>

          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            From algorithmic foundations to community ecosystem — the progression
            from core engine to platform.
          </p>

          {/* Timeline */}
          <div className="relative space-y-12">
            {roadmap.map((category, ci) => {
              const meta = categoryMeta[category.category];
              return (
                <motion.div
                  key={ci}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: ci * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-2.5 h-2.5 rounded-full ${meta.dotColor} shrink-0`} />
                    <h3 className={`text-sm font-semibold tracking-tight ${meta.color}`}>
                      {meta.label}
                    </h3>
                    <div className="flex-1 h-px bg-border/20" />
                    <span className="text-[10px] font-mono text-muted-foreground/40">
                      {category.items.length} items
                    </span>
                  </div>

                  {/* Items grid */}
                  <div className="grid gap-3 md:grid-cols-2 pl-5">
                    {category.items.map((item, ii) => {
                      const badge = statusBadge[item.status];
                      return (
                        <motion.div
                          key={ii}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: ci * 0.1 + ii * 0.04 }}
                          viewport={{ once: true }}
                          className="group p-4 rounded-lg border border-border/20 bg-background hover:border-border/40 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="text-sm font-medium text-foreground leading-snug">
                              {item.title}
                            </h4>
                            <span
                              className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider shrink-0 ${badge.className}`}
                            >
                              {badge.label}
                            </span>
                          </div>
                          <p className="text-[12px] text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </motion.div>
                      );
                    })}
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
