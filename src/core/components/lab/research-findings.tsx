import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";

export const ResearchFindings = () => {
  const { findings } = backrandLabData.research;

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
            <span className="text-xs font-mono text-muted-foreground/40">04</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Findings
            </span>
          </div>

          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            Each experiment taught us something specific about generation. The findings
            compound — together they define the approach that works.
          </p>

          {/* Findings grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {findings.map((finding, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-border/30 bg-background/50 space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">
                    {finding.title}
                  </h3>
                  <span className="text-xs font-mono text-muted-foreground/40 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  {finding.text}
                </p>

                {/* Metric comparison */}
                {finding.metric && (
                  <div className="flex items-center gap-3 pt-3 border-t border-border/20">
                    <div className="text-center">
                      <p className="text-[11px] text-muted-foreground/50 uppercase tracking-wider mb-1">
                        Before
                      </p>
                      <p className="text-sm font-mono text-muted-foreground">
                        {finding.metric.before}
                      </p>
                    </div>
                    <svg
                      width="20"
                      height="12"
                      viewBox="0 0 20 12"
                      fill="none"
                      className="text-muted-foreground/30 flex-shrink-0"
                    >
                      <path
                        d="M0 6h16M14 2l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </svg>
                    <div className="text-center">
                      <p className="text-[11px] text-muted-foreground/50 uppercase tracking-wider mb-1">
                        After
                      </p>
                      <p className="text-sm font-mono text-green-600 dark:text-green-400">
                        {finding.metric.after}
                      </p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-[10px] text-muted-foreground/40 uppercase tracking-wider mb-1">
                        Improvement
                      </p>
                      <p className="text-sm font-mono font-medium text-foreground">
                        {finding.metric.label}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
