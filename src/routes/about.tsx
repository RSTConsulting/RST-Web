import buildingImage from "@/assets/rst_img_6.webp";
import ownerImage from "@/assets/rst_owner_img_1.webp";
import { stats } from "@/components/site/data";
import { Reveal, Stagger, staggerItem } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StatCounter } from "@/components/site/StatCounter";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - RST Consulting Engineers" },
      {
        name: "description",
        content:
          "Founded in Springvale, Victoria by Sineth Sareth Sar and Ratana Sar, RST Consulting Engineers has delivered structural and civil design across Melbourne for over a decade.",
      },
      { property: "og:title", content: "About - RST Consulting Engineers" },
      {
        property: "og:description",
        content:
          "Founded in Springvale by Sineth Sareth Sar and Ratana Sar - structural and civil engineering for Melbourne's residential, commercial, industrial and institutional sectors.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const steps = [
  {
    n: "01",
    t: "Initial Consultation",
    d: "We talk through the brief, the site, and what the builder/architect actually needs from us.",
  },
  {
    n: "02",
    t: "Site Assessment",
    d: "A structural walk-through or desktop assessment - existing conditions, soil, constraints.",
  },
  {
    n: "03",
    t: "Design & Documentation",
    d: "Full structural and civil design set - plans, sections, details, specifications, calculations.",
  },
  {
    n: "04",
    t: "Council & Compliance",
    d: "Documentation prepared for permit submission, with revisions coordinated through the certifier.",
  },
  {
    n: "05",
    t: "Delivery on Site",
    d: "Available through construction for RFIs, site queries and any structural inspection sign-offs required.",
  },
];

function AboutPage() {
  return (
    <>
      {/* Opening */}
      <section className="pt-14 md:pt-20 pb-16 md:pb-20">
        <div className="container-wide grid lg:grid-cols-12 gap-14 items-center w-full">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-5 text-xl">About Us</p>
              <h1
                className="font-display font-semibold text-navy leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2rem, 4.2vw, 3.75rem)" }}
              >
                A structural engineering consultancy built for excellency.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 space-y-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                <p>
                  RST Consulting Engineers was founded in Springvale, Victoria by{" "}
                  <strong className="text-navy font-medium">Sineth Sareth Sar</strong> and{" "}
                  <strong className="text-navy font-medium">Ratana Sar</strong> to serve Melbourne's
                  residential, commercial, industrial and institutional building sectors.
                </p>
                <p>
                  Over a decade later we still work the same way we did when we started: quote
                  honestly, deliver on time, stay involved through construction. That's the whole
                  approach.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-5">
            <div className="aspect-4/5 bg-mist overflow-hidden rounded-lg shadow-navy-md">
              <img
                src={ownerImage}
                alt="RST Consulting Engineers - founder on site"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground tracking-wide">
              On site: slab preparation, structural inspection.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {stats.map((s) => (
              <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-mist py-24 md:py-32">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-14">
            <SectionHeading
              className="lg:col-span-5"
              eyebrow="Our approach"
              title={
                <>
                  No job too big <br className="hidden md:block" />
                  or too small.
                </>
              }
            />
            <div className="lg:col-span-7">
              <Stagger className="space-y-8">
                {[
                  {
                    t: "Competitive quotes, without compromise.",
                    d: "We price the actual scope of engineering required, no padding, no thinning. Cost efficiency comes from experience, not from cutting corners on the structure.",
                  },
                  {
                    t: "Punctual, on-budget delivery.",
                    d: "Documentation issued on the promised date. Builders, certifiers and Councils are all waiting on the engineering, we don't hold anyone up.",
                  },
                  {
                    t: "Long-term client partnerships.",
                    d: "A significant share of our workload comes from builders and developers who've been engaging us for more than a decade.",
                  },
                ].map((it) => (
                  <motion.div
                    key={it.t}
                    variants={staggerItem}
                    className="border-l-2 border-steel pl-6"
                  >
                    <h3 className="font-display text-xl font-semibold text-navy">{it.t}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{it.d}</p>
                  </motion.div>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Our process"
            title="From first call to final inspection."
            lede="The same five-step process runs through every project - a townhouse renovation and a multi-lot commercial development are structured identically."
          />
          <Stagger className="mt-16 grid gap-px bg-border lg:grid-cols-5">
            {steps.map((s) => (
              <motion.div key={s.n} variants={staggerItem} className="bg-background p-6 md:p-8">
                <div className="text-steel text-xs font-medium tracking-[0.2em]">STEP {s.n}</div>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy leading-tight">
                  {s.t}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-mist py-20 md:py-28">
        <div className="container-wide grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Credentials</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy leading-[1.1]">
              Code-compliant, safety-first engineering - every drawing, every calculation.
            </h2>
            <p className="mt-5 text-muted-foreground max-w-2xl">
              Documentation prepared to the current National Construction Code and relevant
              Australian Standards. Where third-party certification is required, we coordinate
              directly with the certifier.
            </p>
          </div>
          <div className="lg:col-span-5">
            <img
              src={buildingImage}
              alt="Completed RST project - Melbourne"
              className="w-full aspect-4/3 object-cover rounded-lg shadow-navy-lg"
            />
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      {/* PLACEHOLDER: TeamMemberCard grid - populate with real headshots and bios once supplied. */}
    </>
  );
}
