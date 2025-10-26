import { Header3, ListItem, Paragraph } from "@/components/typography";
import { motion } from "framer-motion";

export const ProjectSection = ({
  title,
  content,
  highlights,
}: {
  title: string;
  content: string;
  highlights?: string[];
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="my-8"
    >
      <Header3>{title}</Header3>
      <Paragraph>{content}</Paragraph>

      {highlights && (
        <ul className="list-disc list-inside text-muted-foreground/90 space-y-2 mt-2">
          {highlights.map((h, i) => (
            <ListItem key={i}>{h}</ListItem>
          ))}
        </ul>
      )}
    </motion.section>
  );
};
