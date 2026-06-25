import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";

export const BackgradFooter = () => {
  const { links } = backrandLabData;

  return (
    <section className="w-full px-4 md:px-8 py-16 border-t border-border/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-1">
            <p className="text-sm text-foreground font-medium">
              Built by <a href="/" className="underline underline-offset-4 decoration-border/40 hover:decoration-foreground/40 transition-colors">Lukas Olsen</a>
            </p>
            <p className="text-[12px] text-muted-foreground/50">
              MIT License · v0.1.0 · Last updated June 2026
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-muted-foreground/50 hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href={links.playground}
              className="text-[12px] text-muted-foreground/50 hover:text-foreground transition-colors"
            >
              Playground
            </a>
            <a
              href={links.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-muted-foreground/50 hover:text-foreground transition-colors"
            >
              npm
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
