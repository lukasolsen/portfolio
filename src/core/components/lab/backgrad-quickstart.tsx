import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";
import { SmallText } from "@/components/typography/typography";

const steps = [
  {
    number: "01",
    title: "Install",
    description: "Python 3.10+, from source.",
    code: "pip install .",
  },
  {
    number: "02",
    title: "Generate",
    description: "CLI output to file.",
    code: `backgrad -m mesh_gradient \\
  -o gradient.webp -s 42`,
  },
  {
    number: "03",
    title: "Serve",
    description: "REST API at /docs.",
    code: "backgrad serve --port 8000",
  },
];

const examples = [
  {
    label: "Sky gradient",
    code: `backgrad -m sky -c "#FF6B6B,#4ECDC4" -a 16:9 -q high`,
  },
  {
    label: "Reflective mesh",
    code: `backgrad -m reflective_mesh -W 1080 -H 720 -f png`,
  },
  {
    label: "Benchmark",
    code: `backgrad --benchmark -m mesh_gradient --benchmark-iterations 3`,
  },
];

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
          className="space-y-12"
        >
          {/* Section label */}
          <div>
            <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground/40">01</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Quick Start
            </span>
          </div>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              Three commands to get from install to running gradient generation.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="relative flex gap-6 py-6 border-t border-border/20 first:border-0"
              >
                {/* Step number */}
                <span className="text-[11px] font-mono text-muted-foreground/40 pt-0.5 shrink-0 w-5">
                  {step.number}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-3">
                  <div>
                    <h3 className="text-base font-medium text-foreground tracking-tight">
                      {step.title}
                    </h3>
                    <SmallText className="text-muted-foreground/60 mt-0.5">
                      {step.description}
                    </SmallText>
                  </div>

                  {/* Code block */}
                  <div className="relative group">
                    <div className="rounded-lg bg-muted/40 border border-border/20 px-4 py-3 overflow-x-auto">
                      <code className="text-[13px] font-mono text-foreground whitespace-pre">
                        {step.code}
                      </code>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Examples */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground tracking-tight">
              Examples
            </h3>
            <div className="space-y-2">
              {examples.map((example, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 rounded-lg border border-border/20 bg-muted/20 px-4 py-3 group hover:border-border/40 transition-colors"
                >
                  <span className="text-[11px] font-medium text-muted-foreground/50 pt-0.5 shrink-0 w-20">
                    {example.label}
                  </span>
                  <code className="text-[13px] font-mono text-foreground/80 whitespace-pre min-w-0">
                    {example.code}
                  </code>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 pt-2 border-t border-border/20">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Full CLI reference
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
