import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";
import { Header6 } from "@/components/typography/typography";

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
            <Header6 className="font-semibold">
              Generator models
            </Header6>
            <div className="space-y-0 divide-y divide-border/40">
              {approach.models.map((model, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="group py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <code className="text-sm font-mono font-semibold text-foreground bg-muted/50 px-2 py-0.5 rounded">
                      {model.name}
                    </code>
                  </div>
                  <p className="text-[13px] text-muted-foreground leading-relaxed mb-2.5">
                    {model.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {model.algorithms.map((algo, j) => (
                      <span
                        key={j}
                        className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted/60 text-[10px] font-mono text-muted-foreground/70"
                      >
                        {algo}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Data Flow Pipeline */}
          <div className="space-y-6">
            <Header6 className="font-semibold">
              Data flow pipeline
            </Header6>
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
                        <Header6 className="font-medium">
                          {step.stage}
                        </Header6>
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
