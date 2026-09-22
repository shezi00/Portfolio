"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Variants,
} from "framer-motion";
import { Briefcase, Code2, Home, Mail, Menu, User, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Services", href: "#skills", icon: Code2 },
  { label: "Projects", href: "#projects", icon: Briefcase },
  { label: "Contact", href: "#contact", icon: Mail },
];

const SPRING = { type: "spring" as const, stiffness: 320, damping: 32 };

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: SPRING },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const navRef = useRef<HTMLElement>(null);

  // Highlight the link for the section currently in the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    navItems.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setActive(href);
    setOpen(false);
  };

  return (
    // reducedMotion="user" turns off movement for people who ask for it
    <MotionConfig reducedMotion="user">
      <div className="fixed inset-x-0 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-50 flex justify-center pointer-events-none">
        <motion.nav
          ref={navRef}
          layout
          transition={SPRING}
          style={{ borderRadius: 9999 }}
          aria-label="Primary"
          className="pointer-events-auto flex items-center gap-1 p-1.5 bg-violet-950/85 backdrop-blur-md border border-violet-400/30 shadow-[0_12px_40px_-12px_rgba(124,58,237,0.7)]"
        >
          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                key="links"
                layout="position"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center gap-1 pl-1"
              >
                {navItems.map(({ label, href, icon: Icon }) => {
                  const isActive = active === href;

                  return (
                    <motion.li key={label} variants={itemVariants}>
                      <a
                        href={href}
                        onClick={(e) => scrollToSection(e, href)}
                        aria-label={label}
                        aria-current={isActive ? "page" : undefined}
                        title={label}
                        className={`relative flex items-center gap-2 h-11 px-3 sm:px-4 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 ${
                          isActive
                            ? "text-white"
                            : "text-violet-200 hover:text-white hover:bg-violet-500/20"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            transition={SPRING}
                            className="absolute inset-0 rounded-full bg-violet-600"
                          />
                        )}
                        <Icon className="relative z-10 w-[18px] h-[18px]" />
                        <span className="relative z-10 hidden sm:inline">
                          {label}
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* The circle: always visible, toggles the menu */}
          <motion.button
            layout="position"
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            whileTap={{ scale: 0.92 }}
            className="relative grid place-items-center shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-[0_0_24px_rgba(139,92,246,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="grid place-items-center"
              >
                {open ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.nav>
      </div>
    </MotionConfig>
  );
}