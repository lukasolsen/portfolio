import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";

export const ResearchStyles = () => {
  const { styles } = backrandLabData.research;

  return (
    <section className="w-full px-4 md:px-8 py-28 border-t border-border/30 bg-muted/3">
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
            <span className="text-xs font-mono text-muted-foreground/40">06</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Style Categories
            </span>
          </div>

          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            Each style defines a constrained parameter space. Within those constraints,
            every output looks intentional. The categories were derived from analyzing
            the most common gradient use cases across web and design.
          </p>

          {/* Styles grid */}
          <div className="grid gap-px bg-border/20 rounded-xl overflow-hidden">
            {styles.map((style, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-4 bg-background hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground/30 w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {style.name}
                    </p>
                    <p className="text-[12px] text-muted-foreground">
                      {style.description}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground/50">
                  {style.count.toLocaleString()}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
