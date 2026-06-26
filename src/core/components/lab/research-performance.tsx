import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";
import { Header6 } from "@/components/typography/typography";

export const ResearchPerformance = () => {
  const { performance } = backrandLabData.research;

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
            <span className="text-xs font-mono text-muted-foreground/40">05</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Performance
            </span>
          </div>

          {/* Benchmarks table */}
          <div className="space-y-4">
            <Header6 className="font-semibold">
              Render benchmarks
            </Header6>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-muted-foreground/50 font-medium">
                      Resolution
                    </th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-muted-foreground/50 font-medium">
                      Model
                    </th>
                    <th className="text-right py-3 px-4 text-xs uppercase tracking-wider text-muted-foreground/50 font-medium">
                      Time
                    </th>
                    <th className="text-right py-3 px-4 text-xs uppercase tracking-wider text-muted-foreground/50 font-medium">
                      Quality
                    </th>
                    <th className="text-right py-3 px-4 text-xs uppercase tracking-wider text-muted-foreground/50 font-medium w-32">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {performance.benchmarks.map((bench, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="border-b border-border/15 last:border-0"
                    >
                      <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                        {bench.resolution}
                      </td>
                      <td className="py-3 px-4 text-xs text-muted-foreground">
                        {bench.model}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-xs text-muted-foreground">
                        {bench.time}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-xs text-muted-foreground">
                        {Math.round(bench.quality * 100)}%
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex w-24 h-1 bg-muted/50 rounded-full overflow-hidden ml-auto">
                          <motion.div
                            className="h-full bg-green-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${bench.quality * 100}%` }}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Improvements grid */}
          <div className="space-y-4">
            <Header6 className="font-semibold">
              Key improvements
            </Header6>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {performance.improvements.map((imp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-lg border border-border/30 space-y-3"
                >
                  <p className="text-xs text-muted-foreground/50 uppercase tracking-wider font-medium">
                    {imp.metric}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-mono text-muted-foreground/50 line-through">
                      {imp.before}
                    </span>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-muted-foreground/30">
                      <path d="M0 4h8M6 0l4 4-4 4" stroke="currentColor" strokeWidth="1" />
                    </svg>
                    <span className="text-sm font-mono text-foreground">
                      {imp.after}
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-foreground">
                    {imp.change}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
