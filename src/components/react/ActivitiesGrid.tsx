"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowForward } from "relume-icons";

export type ActivityItem = {
  slug: string;
  name: string;
  catchphrase?: string;
  logo?: string;
  logoBg?: string | null;
  image?: string;
  imageAlt?: string;
  tags: string[];
  href: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ActivitiesGrid({ items }: { items: ActivityItem[] }) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const card: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((a) => (
        <motion.a
          key={a.slug}
          href={a.href}
          variants={card}
          whileHover={reduce ? undefined : { y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="group flex flex-col overflow-hidden rounded-card border border-neutral-light bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-brand/10"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-neutral-lighter">
            {a.image ? (
              <img
                src={a.image}
                alt={a.imageAlt || a.name}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-gradient-to-br from-brand/10 to-electric/10" />
            )}
            {a.logo && (
              <div
                className="absolute bottom-3 left-3 flex size-12 items-center justify-center rounded-lg p-2 shadow-md ring-1 ring-black/5"
                style={{ backgroundColor: a.logoBg ?? "#ffffff" }}
              >
                <img src={a.logo} alt="" className="max-h-full max-w-full object-contain" />
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-h6 font-bold text-neutral-darkest transition-colors group-hover:text-electric">
              {a.name}
            </h3>
            {a.catchphrase && (
              <p className="mt-2 flex-1 text-regular text-neutral-dark">{a.catchphrase}</p>
            )}
            {a.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {a.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-badge bg-brand/5 px-3 py-1 text-tiny font-medium text-brand"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <span className="mt-5 inline-flex items-center gap-1.5 text-small font-semibold text-electric">
              Learn more
              <ArrowForward className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}
