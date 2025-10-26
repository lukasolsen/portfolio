import type { Project } from "@/data";
import { Star, Clock } from "lucide-react";

export const ProjectMeta = ({ project }: { project: Project }) => {
  return (
    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mt-4">
      {project.stats?.stars && (
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span>{project.stats.stars} stars</span>
        </div>
      )}
      {project.stats?.updated && (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Sist oppdatert {project.stats.updated}</span>
        </div>
      )}
    </div>
  );
};
