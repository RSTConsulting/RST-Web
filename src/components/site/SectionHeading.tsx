import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`${alignClass} max-w-3xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05] text-navy">{title}</h2>
      {lede && <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{lede}</p>}
    </Reveal>
  );
}
