"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

export type StoryItem = {
  slug: string;
  title: string;
  date: string; // pre-formatted
  author?: string;
  excerpt?: string;
  tags: string[];
  href: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

// Deterministic brand gradient per card (stories have no cover image).
const gradients = [
  "from-brand to-electric",
  "from-electric to-brand",
  "from-brand-600 to-electric-500",
  "from-electric-600 to-brand-500",
];
function pick(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return gradients[Math.abs(h) % gradients.length];
}

export function StoriesGrid({ items, columns = 3 }: { items: StoryItem[]; columns?: 2 | 3 }) {
  const reduce = useReducedMotion();

  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
  const card: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  };

  const cols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={`grid grid-cols-1 gap-6 ${cols}`}
    >
      {items.map((s) => (
        <motion.a
          key={s.slug}
          href={s.href}
          variants={card}
          whileHover={reduce ? undefined : { y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="group flex flex-col overflow-hidden rounded-card border border-neutral-light bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-brand/10"
        >
          <div
            className={`relative flex aspect-[16/9] items-end overflow-hidden bg-gradient-to-br ${pick(
              s.slug,
            )} p-5`}
          >
            <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:16px_16px]" />
            {s.tags[0] && (
              <span className="relative rounded-badge bg-white/15 px-3 py-1 text-tiny font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                {s.tags[0]}
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col p-6">
            <p className="text-tiny font-medium uppercase tracking-wide text-neutral">
              {s.date}
              {s.author ? ` · ${s.author}` : ""}
            </p>
            <h3 className="mt-2 text-h6 font-bold leading-snug text-neutral-darkest transition-colors group-hover:text-electric">
              {s.title}
            </h3>
            {s.excerpt && (
              <p className="mt-3 line-clamp-3 flex-1 text-regular text-neutral-dark">{s.excerpt}</p>
            )}
            <span className="mt-5 text-small font-semibold text-electric">Read story →</span>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}
