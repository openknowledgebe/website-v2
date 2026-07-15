"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  heading: string;
  subheading?: string;
  /** Optional POST endpoint (e.g. Mailchimp/Buttondown). Falls back to mailto. */
  action?: string;
  contactEmail?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function NewsletterCTA({
  heading,
  subheading,
  action,
  contactEmail = "info@openknowledge.be",
}: Props) {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    window.posthog?.capture("newsletter_subscribed");
    if (action) return; // let the real endpoint handle it
    e.preventDefault();
    if (!email) return;
    // No backend configured yet: open a pre-filled subscribe email.
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      "Newsletter subscription",
    )}&body=${encodeURIComponent(`Please subscribe ${email} to the Open Knowledge Belgium newsletter.`)}`;
    setDone(true);
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
        className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-[1.5rem] bg-brand px-6 py-14 text-white md:px-12 lg:px-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-electric/30 blur-3xl"
        />
        <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-h3 font-bold">{heading}</h2>
            {subheading && (
              <p className="mt-3 max-w-[28rem] text-medium text-white/80">
                {subheading}
              </p>
            )}
          </div>
          <div>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              method={action ? "post" : undefined}
              action={action}
              onSubmit={onSubmit}
            >
              <Input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-white/20 bg-white/95"
              />
              <Button
                type="submit"
                variant="primary"
                className="shrink-0 bg-electric"
              >
                Subscribe
              </Button>
            </form>
            {done ? (
              <p className="mt-3 text-small text-white/80">
                Thanks! Check your email client to confirm.
              </p>
            ) : (
              <p className="mt-3 text-small text-white/60">
                No spam — just occasional updates on open knowledge in Belgium.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
