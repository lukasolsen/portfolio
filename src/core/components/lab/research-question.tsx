import { motion } from "framer-motion";
import { backrandLabData } from "./backrand-data";
import { SmallText } from "@/components/typography/typography";

export const ResearchQuestion = () => {
  const { research } = backrandLabData;

  return (
    <section className="w-full px-4 md:px-8 py-28 border-t border-border/30">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Section label */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground/40">01</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              The Question
            </span>
          </div>

          {/* Question */}
          <blockquote className="relative text-2xl md:text-[2rem] font-medium tracking-tight text-foreground leading-snug">
            <span className="absolute -left-4 top-0 text-4xl text-muted-foreground/20 font-serif">"</span>
            {research.question}
          </blockquote>

          {/* Context */}
          <div className="grid gap-8 md:grid-cols-2 pt-4">
            <div className="space-y-4">
              <SmallText className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
                The problem
              </SmallText>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {research.context.problem}
              </p>
            </div>
            <div className="space-y-4">
              <SmallText className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
                The gap
              </SmallText>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {research.context.gap}
              </p>
            </div>
          </div>

          {/* Goal */}
          <div className="border-l-2 border-foreground/10 pl-6 py-2">
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              {research.context.goal}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
