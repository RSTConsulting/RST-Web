import heroImg2 from "@/assets/rst_img_1.webp";
import heroImg1 from "@/assets/rst_img_4.webp";
import heroImg4 from "@/assets/rst_img_5.webp";
import heroImg3 from "@/assets/rst_img_6.webp";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal, Stagger, staggerItem } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StatCounter } from "@/components/site/StatCounter";
import { StarRow, TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { projects, services, stats, testimonials } from "@/components/site/data";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const heroImages = [heroImg1, heroImg2, heroImg3, heroImg4];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RST Consulting Engineers - Structural & Civil Design, Melbourne" },
      {
        name: "description",
        content:
          "Structural and civil engineering design for residential, commercial, industrial and institutional projects across Melbourne. Based in Springvale, Victoria.",
      },
      { property: "og:title", content: "RST Consulting Engineers" },
      {
        property: "og:description",
        content:
          "Structural and civil engineering design for residential, commercial, industrial and institutional projects across Melbourne.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhatWeDo />
      <FeaturedWork />
      <WhyRST />
      <Testimonials />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % heroImages.length);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy-surface text-white hero-fit">
      <motion.div style={{ y }} className="absolute inset-0">
        <AnimatePresence>
          <motion.img
            key={heroImages[index]}
            src={heroImages[index]}
            alt="RST Consulting Engineers project"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-surface/75 via-navy-surface/45 to-navy-surface/20" />
      </motion.div>

      <div className="relative container-wide w-full py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow text-white"
            >
              Consulting Engineers · Springvale, Victoria
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display font-semibold text-white leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 4.25rem)" }}
            >
              Structural &amp; civil engineering design for the buildings Melbourne actually builds.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 max-w-xl text-lg text-white/80 leading-relaxed"
            >
              Residential, commercial, industrial and institutional projects - engineered with the
              same precision, delivered on time, quoted honestly.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link
                to="/contact"
                className="btn-primary group bg-white text-navy px-6 py-3.5 text-sm font-medium tracking-wide hover:bg-steel hover:text-white transition-colors inline-flex items-center gap-2"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/work"
                className="btn-outline border border-white/40 text-white px-6 py-3.5 text-sm font-medium tracking-wide hover:bg-white hover:text-navy transition-colors"
              >
                View Our Work
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show hero image ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-white/90" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="border-b border-border">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {stats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeDo() {
  return (
    <section className="bg-mist py-24 md:py-32">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <SectionHeading
            className="lg:col-span-8"
            eyebrow="What we do"
            title={<>Five disciplines. One consistent standard.</>}
            lede="From single-storey renovations to multi-lot developments - we scope, design and document every project with the same rigour."
          />
          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/services"
              className="text-navy font-medium text-sm nav-underline inline-flex items-center gap-2"
            >
              All services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <Stagger className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-5 items-stretch">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              variants={staggerItem}
              className="bg-mist p-8 lg:p-10 group hover:bg-white transition-colors flex flex-col h-full"
            >
              <div className="text-xs font-medium text-steel">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-6 font-display text-xl font-semibold text-navy leading-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{s.short}</p>
              <Link
                to="/services"
                hash={s.slug}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.15em] uppercase text-navy group-hover:text-steel transition-colors"
              >
                Learn more <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FeaturedWork() {
  const featured = [
    projects.find((p) => p.sector === "Commercial"),
    projects.find((p) => p.sector === "Residential"),
    projects.find((p) => p.sector === "Industrial"),
    projects.find((p) => p.sector === "Institutional"),
  ].filter(Boolean) as typeof projects;

  return (
    <section className="py-24 md:py-32">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <SectionHeading
            className="lg:col-span-8"
            eyebrow="Selected projects"
            title="Work across four sectors."
          />
          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/work"
              className="text-navy font-medium text-sm nav-underline inline-flex items-center gap-2"
            >
              Full portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {featured.map((p) => (
            <motion.div key={p.id} variants={staggerItem} className="flex flex-col h-full">
              <Link
                to="/work"
                search={{ sector: p.sector }}
                className="flex flex-col w-full h-full"
              >
                <ProjectCard project={p} />
              </Link>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function WhyRST() {
  const items = [
    {
      n: "01",
      title: "Punctual delivery, first time.",
      body: "Documentation issued on the date agreed - because your builder, certifier and Council are all waiting on it.",
    },
    {
      n: "02",
      title: "Competitive quotes, no shortcuts.",
      body: "We price fairly for the actual scope. Cost efficiency comes from experience, not from thinning out the engineering.",
    },
    {
      n: "03",
      title: "Long-term client partnerships.",
      body: "A significant share of our work comes from builders and developers who've been coming back for a decade or more.",
    },
    {
      n: "04",
      title: "No job too big or too small.",
      body: "A single-beam calculation gets the same attention as a multi-storey structural set. Same firm, same standard.",
    },
  ];

  return (
    <section className="bg-navy-surface text-white py-24 md:py-32">
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-4">
            <p className="eyebrow !text-steel mb-5">Why RST</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-white leading-[1.05]">
              Engineering firms are judged on the boring things.
            </h2>
            <p className="mt-6 text-white/70 max-w-md">
              Delivered on time. Priced honestly. Answering the phone. That's the standard we've
              held for over a decade.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Stagger className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
              {items.map((it) => (
                <motion.div key={it.n} variants={staggerItem}>
                  <div className="text-steel text-sm font-medium tracking-[0.18em]">{it.n}</div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">{it.title}</h3>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">{it.body}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-mist py-24 md:py-20 overflow-hidden">
      <div className="container-wide mb-10">
        <Reveal>
          <p className="eyebrow mb-5 text-lg">In their words</p>
          <div className="flex flex-wrap items-center gap-4">
            <StarRow rating={5} />
            <span className="text-sm text-navy font-medium">5.0 rating on Google Reviews</span>
          </div>
        </Reveal>
      </div>
      <TestimonialCarousel items={testimonials} />
    </section>
  );
}
