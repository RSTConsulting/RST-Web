import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "./data";

interface ProjectCarouselProps {
  projects: Project[];
  filterKey: string;
  onOpen: (p: Project) => void;
}

export function ProjectCarousel({ projects, filterKey, onOpen }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Reset index whenever the filter changes
  useEffect(() => {
    setIndex(0);
    setDirection(1);
  }, [filterKey]);

  const count = projects.length;
  const safeIndex = Math.min(index, Math.max(count - 1, 0));
  const project = projects[safeIndex];

  const go = useCallback(
    (dir: 1 | -1) => {
      if (count <= 1) return;
      setDirection(dir);
      setIndex((i) => (i + dir + count) % count);
    },
    [count],
  );

  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (count <= 1 || paused) return;
    const timer = setInterval(() => {
      go(1);
    }, 3000);
    return () => clearInterval(timer);
  }, [count, paused, go, safeIndex]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!project) return null;

  const hasNav = count > 1;
  const padded = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="mx-auto max-w-7xl px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid gap-8 md:gap-12 md:grid-cols-5 items-center">
        {/* Image side (~60%) */}
        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            <motion.button
              key={project.id + "-img"}
              type="button"
              onClick={() => onOpen(project)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              drag={hasNav ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              className="group relative block w-full overflow-hidden rounded-xl bg-mist shadow-navy-md aspect-[16/10] md:aspect-[16/9] cursor-pointer touch-pan-y"
              aria-label={`Open ${project.title} gallery`}
            >
              <img
                src={project.cover}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                draggable={false}
              />
            </motion.button>
          </AnimatePresence>
        </div>

        {/* Details side (~40%) */}
        <div className="md:col-span-2 flex flex-col justify-between min-h-[340px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={project.id + "-txt"}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="text-left"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-steel">
                  {project.sector}
                </p>
                {hasNav && (
                  <p className="font-display text-sm font-light text-navy tabular-nums">
                    {padded(safeIndex + 1)}
                    <span className="text-navy/40"> / {padded(count)}</span>
                  </p>
                )}
              </div>
              <h3 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-navy leading-tight">
                {project.title}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              <div className="mt-6 space-y-1.5">
                <div className="flex gap-3 text-sm">
                  <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground shrink-0 pt-0.5 w-16">
                    Scope
                  </span>
                  <span className="text-navy font-medium">{project.scope}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {hasNav && (
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Previous project"
                    onClick={() => go(-1)}
                    className="flex items-center justify-center h-11 w-11 rounded-full bg-white text-navy border border-border shadow-navy-sm hover:shadow-navy-md hover:-translate-y-0.5 transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next project"
                    onClick={() => go(1)}
                    className="flex items-center justify-center h-11 w-11 rounded-full bg-navy-surface text-white shadow-navy-md hover:shadow-navy-lg hover:-translate-y-0.5 transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                  {projects.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      aria-label={`Go to project ${i + 1}`}
                      onClick={() => {
                        setDirection(i > safeIndex ? 1 : -1);
                        setIndex(i);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === safeIndex ? "w-8 bg-navy" : "w-4 bg-navy/20 hover:bg-navy/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
