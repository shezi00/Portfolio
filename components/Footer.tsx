"use client";

import React, { useRef, useEffect } from "react";
import { Mail, Phone, MapPin, ArrowUp, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Ambient pulsing glow effect
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.3,
          opacity: 0.25,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.easeInOut",
        });
      }

      // 2. Entrance animation for upper section columns
      gsap.fromTo(
        ".footer-col",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );

      // 3. Bottom copyright bar entrance
      gsap.fromTo(
        ".footer-bottom",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="w-full bg-neutral-950 text-white rounded-t-3xl border-t border-white/10 relative overflow-hidden mt-12"
    >
      {/* Background Glow Effect */}
      <div
        ref={glowRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-neutral-800/80">
          
          {/* Brand Identity */}
          <div className="footer-col md:col-span-5 space-y-4">
            <a href="#home" className="inline-flex items-center gap-2 group">
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Muhammad Shehzore
              </span>
              <Sparkles className="w-4 h-4 text-emerald-400 opacity-80 group-hover:rotate-12 transition-transform" />
            </a>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm font-light">
              Crafting modern web architectures, intelligent AI integrations, 
              and seamless digital experiences.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-col md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-emerald-400 transition-colors inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div className="footer-col md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
              Contact Direct
            </h4>
            <div className="space-y-2.5 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:chshezi105@gmail.com">chshezi105@gmail.com</a>
              </div>
              <div className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+923315378084">+92 331 5378084</a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Islamabad, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <p>© {new Date().getFullYear()} Muhammad Shehzore. All rights reserved.</p>

          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <a
              href="https://www.linkedin.com/in/muhammad-shehzore-620a44268/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-emerald-400 hover:border-neutral-700 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/shezi00"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-emerald-400 hover:border-neutral-700 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            {/* Scroll to top button */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="ml-2 p-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all hover:-translate-y-0.5"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}