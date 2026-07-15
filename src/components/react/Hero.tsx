"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";

type Props = {
  tagline: string;
  mission: string;
  cta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  image: { src: string; alt: string };
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ tagline, mission, cta, secondaryCta, image }: Props) {
  const reduce = useReducedMotion();

  const item = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section className="relative overflow-hidden bg-white px-[5%] py-16 md:py-24 lg:py-28">
      {/* Brand gradient accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-electric/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:grid-cols-2">
          <div>
            <motion.p
              {...item(0)}
              className="mb-4 inline-flex items-center gap-2 rounded-badge bg-electric/10 px-4 py-1.5 text-small font-semibold uppercase tracking-wide text-electric"
            >
              Open Knowledge Belgium
            </motion.p>
            <motion.h1
              {...item(0.08)}
              className="text-h1 font-bold leading-[1.05] text-neutral-darkest"
            >
              {tagline}
            </motion.h1>
            <motion.p {...item(0.16)} className="mt-6 max-w-[36rem] text-medium text-neutral-dark">
              {mission}
            </motion.p>
            <motion.div {...item(0.24)} className="mt-8 flex flex-wrap gap-4">
              {cta && (
                <Button asChild variant="primary">
                  <a href={cta.to}>{cta.label}</a>
                </Button>
              )}
              {secondaryCta && (
                <Button asChild variant="secondary">
                  <a href={secondaryCta.to}>{secondaryCta.label}</a>
                </Button>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="relative"
          >
            <div className="absolute -inset-3 -z-10 rounded-[1.5rem] bg-gradient-to-tr from-electric/20 to-brand/20 blur-xl" />
            <img
              src={image.src}
              alt={image.alt}
              className="aspect-[4/3] w-full rounded-image object-cover shadow-xl shadow-brand/10"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
