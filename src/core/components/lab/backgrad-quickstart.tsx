import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";

export const BackgradQuickstart = () => {
  const { links } = backrandLabData;

  return (
    <section id="quickstart" className="w-full px-4 md:px-8 py-20 border-t border-border/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground/40">01</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Quick start
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <h3 className="text-sm font-semibold text-foreground">Install</h3>
              <div className="rounded-lg bg-muted/50 border border-border/20 p-4 space-y-2">
                <code className="text-[13px] font-mono text-foreground block">pip install .</code>
                <p className="text-[11px] text-muted-foreground/50">Python 3.10+, from source</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.08 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <h3 className="text-sm font-semibold text-foreground">Generate</h3>
              <div className="rounded-lg bg-muted/50 border border-border/20 p-4">
                <code className="text-[13px] font-mono text-foreground block whitespace-pre">{`backgrad -m mesh_gradient \\
  -o gradient.webp -s 42`}</code>
                <p className="text-[11px] text-muted-foreground/50 mt-2">CLI to file</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.16 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <h3 className="text-sm font-semibold text-foreground">Serve</h3>
              <div className="rounded-lg bg-muted/50 border border-border/20 p-4">
                <code className="text-[13px] font-mono text-foreground block whitespace-pre">{`backgrad serve --port 8000`}</code>
                <p className="text-[11px] text-muted-foreground/50 mt-2">REST API at /docs</p>
              </div>
            </motion.div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Examples</h3>
            <div className="rounded-lg bg-muted/50 border border-border/20 p-4 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-[11px] font-mono text-muted-foreground/40 shrink-0 pt-0.5">$</span>
                <code className="text-[12px] font-mono text-foreground block whitespace-pre">{`backgrad -m sky -c "#FF6B6B,#4ECDC4" -a 16:9 -q high`}</code>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[11px] font-mono text-muted-foreground/40 shrink-0 pt-0.5">$</span>
                <code className="text-[12px] font-mono text-foreground block whitespace-pre">{`backgrad -m reflective_mesh -W 1080 -H 720 -f png`}</code>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[11px] font-mono text-muted-foreground/40 shrink-0 pt-0.5">$</span>
                <code className="text-[12px] font-mono text-foreground block whitespace-pre">{`backgrad --benchmark -m mesh_gradient --benchmark-iterations 3`}</code>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Full CLI reference on GitHub
              <span className="text-muted-foreground/30 group-hover:text-foreground/50 transition-colors">→</span>
            </a>
            <a
              href={`${links.github}#api`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              API docs
              <span className="text-muted-foreground/30 group-hover:text-foreground/50 transition-colors">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
