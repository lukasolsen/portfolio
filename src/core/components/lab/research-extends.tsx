import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";

const categoryMeta: Record<string, { label: string; color: string; dotColor: string; bgColor: string }> = {
  "Short-term": {
    label: "Short-term",
    color: "text-green-500",
    dotColor: "bg-green-500",
    bgColor: "bg-green-500/10",
  },
  "Medium-term": {
    label: "Medium-term",
    color: "text-blue-500",
    dotColor: "bg-blue-500",
    bgColor: "bg-blue-500/10",
  },
  "Long-term": {
    label: "Long-term",
    color: "text-purple-500",
    dotColor: "bg-purple-500",
    bgColor: "bg-purple-500/10",
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
    <section className="w-full px-4 md:px-8 py-20 border-t border-border/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
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

          <div className="relative flex items-center gap-0 py-4">
            {roadmap.map((category, ci) => {
              const meta = categoryMeta[category.category];
              return (
                <div key={ci} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${meta.dotColor} shrink-0`} />
                    <span className={`text-xs font-medium ${meta.color} whitespace-nowrap`}>
                      {meta.label}
                    </span>
                  </div>
                  {ci < roadmap.length - 1 && (
                    <div className="flex-1 h-px bg-border/30 ml-3" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            {roadmap.map((category, ci) =>
              category.items.map((item, ii) => {
                const meta = categoryMeta[category.category];
                const badge = statusBadge[item.status];
                return (
                  <motion.div
                    key={`${ci}-${ii}`}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: ci * 0.05 + ii * 0.03 }}
                    viewport={{ once: true }}
                    className="group flex items-start gap-2.5 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${meta.dotColor} shrink-0 mt-1.5`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-[13px] font-medium text-foreground leading-snug truncate">
                          {item.title}
                        </h4>
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider shrink-0 ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-[12px] text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
