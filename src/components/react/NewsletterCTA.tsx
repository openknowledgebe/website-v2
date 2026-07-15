"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterEndpoint } from "@/config/site";

type Props = {
  heading: string;
  subheading?: string;
  /** Override the signup endpoint (defaults to the OKBE n8n webhook). */
  endpoint?: string;
  /** Kept for backwards-compat with existing call sites; unused. */
  contactEmail?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;
const INTERESTS = ["Events", "Volunteering", "Open data news", "Jobs"] as const;

type Status = "idle" | "loading" | "done" | "error";

export function NewsletterCTA({ heading, subheading, endpoint = newsletterEndpoint }: Props) {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [gdpr, setGdpr] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const toggleInterest = (i: string) =>
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!email) return;
    if (!gdpr) {
      setStatus("error");
      setMessage("Please tick the consent box so we may email you.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          gdprConsent: gdpr,
          interests,
          company: "", // honeypot field, intentionally left empty
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const out = await res.json().catch(() => ({}) as { message?: string });
      setMessage(out.message || "Thanks — you're subscribed to our newsletter.");
      setStatus("done");
      setEmail("");
      setName("");
      setInterests([]);
      setGdpr(false);
    } catch {
      setMessage("Something went wrong. Please try again in a moment.");
      setStatus("error");
    }
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
        <div className="relative grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-h3 font-bold">{heading}</h2>
            {subheading && (
              <p className="mt-3 max-w-[28rem] text-medium text-white/80">{subheading}</p>
            )}
          </div>

          <div>
            {status === "done" ? (
              <p className="rounded-form bg-white/10 px-5 py-4 text-medium text-white" role="status">
                {message}
              </p>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className="border-white/20 bg-white/95"
                  />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name (optional)"
                    aria-label="Name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={status === "loading"}
                    className="border-white/20 bg-white/95"
                  />
                </div>

                {/* Interests */}
                <fieldset className="flex flex-wrap items-center gap-2">
                  <legend className="mb-1 w-full text-small text-white/60">
                    What are you interested in? (optional)
                  </legend>
                  {INTERESTS.map((i) => {
                    const on = interests.includes(i);
                    return (
                      <button
                        type="button"
                        key={i}
                        aria-pressed={on}
                        onClick={() => toggleInterest(i)}
                        className={
                          "rounded-badge border px-3 py-1.5 text-small transition-colors " +
                          (on
                            ? "border-electric bg-electric text-white"
                            : "border-white/25 text-white/80 hover:border-white/50")
                        }
                      >
                        {i}
                      </button>
                    );
                  })}
                </fieldset>

                {/* GDPR consent */}
                <label className="flex items-start gap-3 text-small text-white/80">
                  <input
                    type="checkbox"
                    name="gdprConsent"
                    required
                    checked={gdpr}
                    onChange={(e) => setGdpr(e.target.checked)}
                    className="mt-0.5 size-4 shrink-0 accent-electric"
                  />
                  <span>
                    I agree that Open Knowledge Belgium may use my email to send me its newsletter. I
                    can unsubscribe at any time.
                  </span>
                </label>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Button
                    type="submit"
                    variant="primary"
                    className="shrink-0 bg-electric"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Subscribing…" : "Subscribe"}
                  </Button>
                  <p
                    className={
                      "text-small " + (status === "error" ? "text-red-200" : "text-white/60")
                    }
                    role={status === "error" ? "alert" : undefined}
                  >
                    {status === "error" ? message : "No spam — just occasional updates."}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
