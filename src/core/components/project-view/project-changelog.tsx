import { Header3 } from "@/components/typography/typography";
import { motion } from "framer-motion";

export const ProjectChangelog = ({
  changelog,
}: {
  changelog: { version: string; date: string; changes: string[] }[];
}) => {
  return (
    <motion.section
      className="my-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Header3>Endringslogg</Header3>

      <div className="border-l border-border/40 pl-6 space-y-8">
        {changelog.map((entry, i) => (
          <motion.div
            key={i}
            className="relative"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <span className="absolute -left-3 top-1.5 w-2.5 h-2.5 rounded-full bg-foreground" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="ml-2">{entry.date}</span>
            </div>
            <h3 className="text-lg font-medium mt-1">{entry.version}</h3>
            <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
              {entry.changes.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
