"use client";

import { ReactNode, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  Variants,
} from "framer-motion";

/** Fades and slides an element up as it enters the viewport. The single
 * building block used across the site for scroll-triggered reveals —
 * plays once, then stays put. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
  viewportMargin = "-80px",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
  viewportMargin?: string;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? undefined : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: `0px 0px ${viewportMargin} 0px` }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Wraps a group of children (e.g. a grid of cards) so they cascade in
 * one after another as the group scrolls into view. Pair with
 * <StaggerItem> for each child. */
export function Stagger({
  children,
  className,
  viewportMargin = "-80px",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  viewportMargin?: string;
  as?: "div" | "ul";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: `0px 0px ${viewportMargin} 0px` }}
      variants={staggerContainer}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={reduce ? undefined : staggerItem}
    >
      {children}
    </MotionTag>
  );
}

/** Hero entrance: fades/slides content in on mount (not scroll-triggered,
 * since hero content is visible immediately on load). */
export function HeroIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? undefined : { opacity: 0, y: 22 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Oversized watermark mark that drifts slowly as the hero section
 * scrolls past — a subtle parallax touch rather than a static decal. */
export function ParallaxWatermark({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  if (reduce) return <span aria-hidden className={className} />;

  return (
    <motion.span ref={ref} aria-hidden className={className} style={{ y }} />
  );
}
