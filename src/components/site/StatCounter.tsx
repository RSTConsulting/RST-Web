import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (suffix === ".0") return v.toFixed(1);
    return Math.round(v).toLocaleString();
  });
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = rounded.on("change", (v) => {
      if (textRef.current) textRef.current.textContent = String(v);
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, value, count, rounded]);

  const displaySuffix = suffix === ".0" ? "" : suffix;

  return (
    <div ref={ref} className="flex flex-col">
      <div className="font-display text-4xl md:text-5xl font-semibold text-navy tracking-tight leading-none">
        <span ref={textRef}>0</span>
        <span>{displaySuffix}</span>
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
