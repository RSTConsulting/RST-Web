import { SectorMarquee } from "@/components/site/ProjectGrid";
import { SectionHeading } from "@/components/site/SectionHeading";
import { sectorGalleries, type Sector } from "@/components/site/data";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";

const sectorSchema = z
  .enum(["All", "Commercial", "Residential", "Industrial", "Institutional"])
  .catch("All");

const searchSchema = z.object({
  sector: z.enum(["Commercial", "Residential", "Industrial", "Institutional"]).optional(),
});

export const Route = createFileRoute("/work")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Our Work - RST Consulting Engineers" },
      {
        name: "description",
        content:
          "A portfolio of structural and civil engineering projects by RST Consulting Engineers across commercial, residential, industrial and institutional sectors in Melbourne.",
      },
      { property: "og:title", content: "Our Work - RST Consulting Engineers" },
      {
        property: "og:description",
        content:
          "Structural and civil engineering projects across commercial, residential, industrial and institutional sectors in Melbourne.",
      },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkPage,
});

const tabs = ["All", "Residential", "Commercial", "Industrial", "Institutional"] as const;

function WorkPage() {
  const { sector: initialSector } = Route.useSearch();
  const [active, setActive] = useState<(typeof tabs)[number]>(
    sectorSchema.parse(initialSector ?? "All"),
  );
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeSector = useMemo(
    () =>
      active === "All"
        ? sectorGalleries[0]
        : sectorGalleries.find((s) => s.sector === (active as Sector)),
    [active],
  );

  return (
    <>
      <section className="pt-14 md:pt-20 pb-10 md:pb-14 border-b border-border">
        <div className="container-wide w-full">
          <SectionHeading
            eyebrow="Our work"
            title={<>Twenty Two years of structures across Melbourne.</>}
            lede="Commercial fitouts, residential renovations, industrial framing, institutional retrofits - a selection of recent and past projects."
          />
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-steel font-medium">
            <span>4 sectors</span>
            <span className="text-border">·</span>
            <span>Residential · Commercial · Industrial · Institutional</span>
          </div>
        </div>
      </section>

      <section className="top-18 z-30">
        <div className="container-wide py-5 md:py-4">
          <div className="relative md:hidden">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-3 bg-mist/80 border border-border/80 rounded-xl px-4 py-2.5 text-sm font-medium text-navy shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-ring"
              aria-expanded={isDropdownOpen}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-steel text-xs uppercase tracking-wider font-semibold">
                  Sector:
                </span>
                <span className="font-semibold text-navy">{active}</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-steel transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl bg-white border border-border shadow-navy-lg p-1.5 space-y-1 overflow-hidden"
                >
                  {tabs.map((t) => {
                    const isSelected = active === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setActive(t);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isSelected ? "bg-navy text-white shadow-sm" : "text-navy hover:bg-mist"
                        }`}
                      >
                        <span>{t}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tablet & Desktop Pill Selector (>= md) */}
          <div className="hidden md:flex items-center overflow-x-auto no-scrollbar">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-mist/80 p-1.5 border border-border/60 backdrop-blur-md">
              {tabs.map((t) => {
                const isSelected = active === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActive(t)}
                    className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0 ${
                      isSelected ? "text-white" : "text-navy hover:text-navy-surface"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeSectorPill"
                        className="absolute inset-0 rounded-full bg-navy shadow-navy-sm"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{t}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-16">
        <div className="container-wide space-y-16 md:space-y-20">
          {active === "All"
            ? sectorGalleries.map((s) => (
                <div key={s.sector}>
                  <div className="mb-6 md:mb-8">
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-navy">
                      {s.sector}
                    </h2>
                    <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
                      {s.description}
                    </p>
                  </div>
                  <SectorMarquee images={s.gallery} onOpen={setOpenImage} />
                </div>
              ))
            : activeSector && (
                <div>
                  <div className="mb-6 md:mb-8">
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-navy">
                      {activeSector.sector}
                    </h2>
                    <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
                      {activeSector.description}
                    </p>
                  </div>
                  <SectorMarquee images={activeSector.gallery} onOpen={setOpenImage} />
                </div>
              )}
        </div>
      </section>

      <ImageLightbox src={openImage} onClose={() => setOpenImage(null)} />
    </>
  );
}

function ImageLightbox({ src, onClose }: { src: string | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 bg-navy/80 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <div className="min-h-full flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-3xl w-full rounded-xl overflow-hidden shadow-navy-lg"
            >
              <div className="flex items-center justify-end p-3 border-b border-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-navy hover:text-steel"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 md:p-6">
                <img src={src} alt="" className="w-full h-auto rounded-lg" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
