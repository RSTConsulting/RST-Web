import { motion } from "framer-motion";
import type { Project } from "./data";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  priority?: boolean;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="card-surface group text-left flex flex-col w-full h-full overflow-hidden"
    >
      <div className="relative overflow-hidden aspect-4/3 bg-mist shrink-0">
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-900 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-medium tracking-[0.18em] uppercase text-navy shadow-navy-sm">
          {project.sector}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl font-semibold text-navy leading-snug">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{project.scope}</p>
      </div>
    </motion.button>
  );
}
