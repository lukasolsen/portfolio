import { Github, Link2 } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { LeadText, SmallText, Title } from "@/components/typography/typography";
import type { Project } from "@/common/project/project";

export const ProjectHero = ({ project }: { project: Project }) => {
  return (
    <section className="w-full pt-16 pb-4 border-b border-border/60 bg-linear-to-b from-background to-background/60">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src={project.logo}
              alt={project.title}
              className="h-16 w-16 rounded-lg object-cover"
            />
            <div>
              <Title>{project.title}</Title>
              <SmallText>{project.period}</SmallText>
            </div>
          </div>

          <LeadText>{project.description}</LeadText>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag: string, i: number) => (
              <Badge key={i} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            {project.socials.website && (
              <a
                href={project.socials.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Link2 className="h-4 w-4" /> Website
              </a>
            )}
            {project.socials.github && (
              <a
                href={project.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
