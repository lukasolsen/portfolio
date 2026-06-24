import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";

export const ResearchResult = () => {
  const { result } = backrandLabData.research;

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
            <span className="text-xs font-mono text-muted-foreground/40">08</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Result
            </span>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {result.summary}
          </p>

          {/* Capabilities list */}
          <div className="grid gap-3 md:grid-cols-2">
            {result.capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 py-2"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-green-500 mt-0.5 flex-shrink-0"
                >
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1" />
                  <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1" />
                </svg>
                <span className="text-[13px] text-muted-foreground leading-relaxed">
                  {cap}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Impact statement */}
          <div className="border-l-2 border-foreground/10 pl-6 py-2">
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              {result.impact}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-5 pt-4">
            <a
              href={backrandLabData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Source code
              <span className="text-muted-foreground/30">→</span>
            </a>
            <a
              href={backrandLabData.links.playground}
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Interactive playground
              <span className="text-muted-foreground/30">→</span>
            </a>
            <a
              href={backrandLabData.links.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              npm package
              <span className="text-muted-foreground/30">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
