import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";
import { Header6 } from "@/components/typography/typography";

const resultStyles: Record<string, { label: string; color: string; bg: string }> = {
  Failed: {
    label: "Failed",
    color: "text-red-500",
    bg: "bg-red-500/10 border-red-500/20",
  },
  "Partial success": {
    label: "Partial",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  Success: {
    label: "Success",
    color: "text-green-500",
    bg: "bg-green-500/10 border-green-500/20",
  },
};

export const ResearchExperiments = () => {
  const { experiments } = backrandLabData.research;

  return (
    <section className="w-full px-4 md:px-8 py-28 border-t border-border/30">
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
            <span className="text-xs font-mono text-muted-foreground/40">03</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Experiments
            </span>
          </div>

          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            Four experiments, each testing a different hypothesis about how to generate
            backgrounds from text. The progression from failure to success reveals why
            constrained randomness works.
          </p>

          {/* Experiments grid */}
          <div className="space-y-0">
            {experiments.map((exp, i) => {
              const style = resultStyles[exp.result];
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="relative border-t border-border/20 py-8 first:border-0"
                >
                  <div className="grid gap-6 md:grid-cols-[1fr_200px] md:gap-8">
                    {/* Left: Content */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-muted-foreground/40">
                          {exp.id}
                        </span>
                        <Header6 className="font-semibold">
                          {exp.title}
                        </Header6>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/50 font-medium">
                            Hypothesis
                          </span>
                          <p className="text-[13px] text-muted-foreground leading-relaxed mt-0.5">
                            {exp.hypothesis}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/50 font-medium">
                            Method
                          </span>
                          <p className="text-[13px] text-muted-foreground leading-relaxed mt-0.5">
                            {exp.method}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/50 font-medium">
                            Finding
                          </span>
                          <p className="text-[13px] text-muted-foreground leading-relaxed mt-0.5">
                            {exp.finding}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Score + image */}
                    <div className="flex flex-col items-end gap-4">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-medium ${style.color} ${style.bg}`}
                      >
                        <span>{style.label}</span>
                      </div>

                      {/* Score bar */}
                      <div className="w-full space-y-1">
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                          <span>Quality score</span>
                          <span className="font-mono">{Math.round(exp.score * 100)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted/50 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${
                              exp.score >= 0.9
                                ? "bg-green-500"
                                : exp.score >= 0.5
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${exp.score * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>

                      {/* Sample image */}
                      {exp.image && (
                        <div className="w-full aspect-[16/10] rounded-lg overflow-hidden border border-border/30 mt-2">
                          <img
                            src={exp.image}
                            alt={exp.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}
                    </div>
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
