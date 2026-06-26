import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";
import { Header6 } from "@/components/typography/typography";

export const BackgradApproach = () => {
  const { approach, findings } = backrandLabData.research;

  return (
    <section className="w-full px-4 md:px-8 py-20 border-t border-border/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground/40">03</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              How it works
            </span>
          </div>

          <p className="text-base text-foreground leading-relaxed max-w-2xl">
            {approach.summary}
          </p>

          <div className="space-y-0 divide-y divide-border/40">
            {approach.models.map((model, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                viewport={{ once: true }}
                className="py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-baseline gap-3 mb-1.5">
                  <code className="text-sm font-mono font-semibold text-foreground bg-muted/50 px-2 py-0.5 rounded">
                    {model.name}
                  </code>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2.5">
                  {model.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {model.algorithms.map((algo, j) => (
                    <span
                      key={j}
                      className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted/60 text-xs font-mono text-muted-foreground/70"
                    >
                      {algo}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4 pt-4">
            <Header6 className="font-semibold">Key findings</Header6>
            <div className="grid gap-4 md:grid-cols-2">
              {findings.map((finding, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-lg border border-border/20 space-y-2"
                >
                  <Header6 className="font-medium">
                    {finding.title}
                  </Header6>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {finding.text}
                  </p>
                  {finding.metric && (
                    <div className="flex items-center gap-2 pt-1 text-xs font-mono">
                      <span className="text-muted-foreground/50 line-through">{finding.metric.before}</span>
                      <span className="text-muted-foreground/30">→</span>
                      <span className="text-green-600 dark:text-green-400">{finding.metric.after}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
