"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

type NavLink = { title: string; url: string };

type Props = {
  logo?: { src: string; alt: string; url: string };
  navLinks?: NavLink[];
  cta?: { title: string; url: string };
  currentPath?: string;
};

const defaults: Required<Omit<Props, "currentPath">> = {
  logo: {
    src: "/logo/okbe-withname.svg",
    alt: "Open Knowledge Belgium",
    url: "/",
  },
  navLinks: [
    { title: "About", url: "/about" },
    { title: "Activities", url: "/activities" },
    { title: "Stories", url: "/stories" },
    { title: "Team", url: "/team" },
  ],
  cta: { title: "Get involved", url: "/team#opportunities" },
};

export function Navbar(props: Props) {
  const { logo, navLinks, cta } = { ...defaults, ...props };
  const currentPath = props.currentPath ?? "";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (url: string) =>
    url !== "/" && currentPath.startsWith(url.split("#")[0]);

  return (
    <header
      className={
        "sticky top-0 z-[999] w-full border-b transition-colors duration-300 " +
        (scrolled
          ? "border-neutral-light bg-white/90 backdrop-blur-md"
          : "border-transparent bg-white")
      }
    >
      <div className="mx-auto flex min-h-16 w-full max-w-[1280px] items-center justify-between px-[5%] md:min-h-18">
        <a
          href={logo.url}
          className="flex items-center"
          aria-label="Open Knowledge Belgium home"
        >
          <img src={logo.src} alt={logo.alt} className="h-9 w-auto md:h-11" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              className={
                "relative px-4 py-2 text-medium font-medium transition-colors hover:text-electric " +
                (isActive(link.url) ? "text-electric" : "text-neutral-darkest")
              }
            >
              {link.title}
              {isActive(link.url) && (
                <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-electric" />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="primary" size="sm">
            <a
              href={cta.url}
              onClick={() => window.posthog?.capture("get_involved_clicked")}
            >
              {cta.title}
            </a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-neutral-darkest"
            animate={open ? { rotate: -45, y: 8 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-neutral-darkest"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-neutral-darkest"
            animate={open ? { rotate: 45, y: -8 } : { rotate: 0, y: 0 }}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden border-t border-neutral-light bg-white lg:hidden"
      >
        <nav className="flex flex-col px-[5%] py-4">
          {navLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              className={
                "border-b border-neutral-light py-3 text-medium font-medium " +
                (isActive(link.url) ? "text-electric" : "text-neutral-darkest")
              }
            >
              {link.title}
            </a>
          ))}
          <Button asChild variant="primary" className="mt-4 w-full">
            <a
              href={cta.url}
              onClick={() => window.posthog?.capture("get_involved_clicked")}
            >
              {cta.title}
            </a>
          </Button>
        </nav>
      </motion.div>
    </header>
  );
}
