import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";

export const ResearchApproach = () => {
  const { approach } = backrandLabData.research;

  return (
    <section className="w-full px-4 md:px-8 py-28 border-t border-border/30 bg-muted/3">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-16"
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

          {/* Generator Models */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Generator Models
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {approach.models.map((model, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="group relative p-5 rounded-xl border border-border/30 bg-background hover:border-border/50 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-muted text-[10px] font-mono text-muted-foreground/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <code className="text-sm font-mono font-medium text-foreground">
                        {model.name}
                      </code>
                    </div>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">
                      {model.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {model.algorithms.map((algo, j) => (
                        <span
                          key={j}
                          className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted/50 text-[10px] font-mono text-muted-foreground/60"
                        >
                          {algo}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Data Flow Pipeline */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Data Flow Pipeline
            </h3>
            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-[19px] top-3 bottom-3 w-px bg-border/20" />

              <div className="space-y-0">
                {approach.pipeline.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    viewport={{ once: true }}
                    className="relative flex items-start gap-4 py-4"
                  >
                    {/* Node dot */}
                    <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-lg border border-border/40 bg-background shrink-0">
                      <span className="text-[10px] font-mono text-muted-foreground/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1.5">
                      <div className="flex items-baseline gap-3">
                        <h4 className="text-sm font-medium text-foreground">
                          {step.stage}
                        </h4>
                        <span className="text-[10px] font-mono text-muted-foreground/40">
                          {step.detail}
                        </span>
                      </div>
                      <p className="text-[13px] text-muted-foreground leading-relaxed mt-1">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
