import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Rocket, Code, Award } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const timeline: TimelineItem[] = [
  {
    year: "2017",
    title: "First lines of code",
    description:
      "Started programming in Java through Minecraft modding and server hosting. Built plugins and modified game mechanics — the beginning of everything.",
    icon: <Code className="h-4 w-4" />,
    highlight: true,
  },
  {
    year: "2022",
    title: "Formal studies",
    description:
      "Began studying Information Technology at Hamar Katedralskole, discovering a deeper passion for software development.",
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
    title: "Building projects",
    description:
      "Building Dyplink AI and Backgrad. From AI integrations to developer tools — turning ideas into real things.",
    icon: <Rocket className="h-4 w-4" />,
  },
  {
    year: "2026",
    title: "Fagbrev",
    description:
      "Officially certified IT Developer. Continuing at Dyplink as a fullstack developer — no longer an apprentice, but the real deal.",
    icon: <Award className="h-4 w-4" />,
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
          className="relative flex gap-6 pb-12 last:pb-0 group"
        >
          {/* Line */}
          {i < timeline.length - 1 && (
            <div className="absolute left-2.75 top-8 bottom-0 w-px bg-linear-to-b from-border/60 to-border/20" />
          )}

          {/* Dot */}
          <motion.div
            className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground/70 transition-all duration-300"
            whileHover={{ scale: 1.2 }}
            style={{
              boxShadow: item.highlight
                ? "0 0 0 4px rgba(217, 119, 87, 0.1)"
                : "none",
            }}
          >
            {item.icon}
            {item.highlight && (
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/30"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 mb-1.5">
              <span className="text-[14px] font-mono font-medium text-primary/70 tracking-wider">
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
