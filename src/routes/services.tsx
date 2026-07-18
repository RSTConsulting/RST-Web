import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { services } from "@/components/site/data";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services - RST Consulting Engineers" },
      {
        name: "description",
        content:
          "Structural design, civil & drainage design, renovations, property development and inspections - engineering services for Melbourne builders, architects and developers.",
      },
      { property: "og:title", content: "Services - RST Consulting Engineers" },
      {
        property: "og:description",
        content:
          "Structural design, civil & drainage, renovations, property development and inspections across Melbourne.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="pt-14 md:pt-20 pb-10 md:pb-14 border-b border-border">
        <div className="container-wide w-full">
          <SectionHeading
            eyebrow="Services"
            title={<>Five disciplines, one consulting practice.</>}
            lede="Structural and civil engineering services delivered end-to-end - from initial consultation through Council compliance to on-site delivery."
          />
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-steel font-medium">
            <span>5 disciplines</span>
            <span className="text-border">·</span>
            <span>End-to-end delivery</span>
            <span className="text-border">·</span>
            <span>Council compliant</span>
            <span className="text-border">·</span>
            <span>Melbourne-wide</span>
          </div>
        </div>
      </section>

      <div>
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <section
              key={s.slug}
              id={s.slug}
              className={`py-20 md:py-28 ${i % 2 === 1 ? "bg-mist" : ""} scroll-mt-24`}
            >
              <div className="container-wide grid lg:grid-cols-12 gap-12 items-center">
                <Reveal className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
                  <div className="aspect-4/3 bg-navy/5 overflow-hidden rounded-lg shadow-navy-md">
                    <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
                  </div>
                </Reveal>
                <Reveal
                  delay={0.1}
                  className={`lg:col-span-6 ${flip ? "lg:order-1 lg:pr-8" : "lg:pl-4"}`}
                >
                  <p className="eyebrow mb-4">{String(i + 1).padStart(2, "0")} · Service</p>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy leading-[1.1]">
                    {s.title}
                  </h2>
                  <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                  <Link
                    to="/contact"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-navy nav-underline"
                  >
                    Enquire about {s.title.toLowerCase()}
                  </Link>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
