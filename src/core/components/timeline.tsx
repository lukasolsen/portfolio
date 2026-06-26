import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Rocket } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const timeline: TimelineItem[] = [
  {
    year: "2022",
    title: "Started building",
    description:
      "Began studying Information Technology at Hamar Katedralskole, discovering a passion for software development.",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  {
    year: "2023",
    title: "Joined Dyplink",
    description:
      "Started as an apprentice fullstack developer — learning the trade in practice, from project management to critical systems.",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    year: "2025",
    title: "Shipping products",
    description:
      "Building Dyplink AI and Backrand. From AI integrations to developer tools — turning ideas into real products.",
    icon: <Rocket className="h-4 w-4" />,
  },
];

export function Timeline() {
  return (
    <div className="relative">
      {timeline.map((item, i) => (
        <motion.div
          key={item.year}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.5,
            delay: i * 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="relative flex gap-6 pb-12 last:pb-0"
        >
          {/* Line */}
          {i < timeline.length - 1 && (
            <div className="absolute left-[11px] top-8 bottom-0 w-px bg-border/60" />
          )}

          {/* Dot */}
          <div className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground/70">
            {item.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 mb-1.5">
              <span className="text-[11px] font-medium text-primary/70 tracking-wider">
                {item.year}
              </span>
              <h3 className="text-base font-medium text-foreground tracking-tight">
                {item.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
