"use client";

import React, { useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Custom SVG components for brand icons not present in Lucide
const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const CONTACT_ITEMS = [
  {
    title: "Email",
    value: "chshezi105@gmail.com",
    href: "mailto:chshezi105@gmail.com",
    icon: Mail,
  },
  {
    title: "Phone",
    value: "+92 3315378084",
    href: "tel:+923315378084",
    icon: Phone,
  },
  {
    title: "LinkedIn",
    value: "https://www.linkedin.com/in/muhammad-shehzore-620a44268/",
    href: "https://linkedin.com",
    icon: LinkedinIcon,
  },
  {
    title: "GitHub",
    value: "https://github.com/shezi00",
    href: "https://github.com",
    icon: GithubIcon,
  },
  {
    title: "Location",
    value: "Islamabad,Pakistan",
    href: "#",
    icon: MapPin,
  },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // 1. Ambient pulsing glow behind the section
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.25,
          opacity: 0.18,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.easeInOut",
        });
      }

      // 2. Entrance animation for header text
      gsap.fromTo(
        ".contact-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // 3. Staggered entrance animation for contact cards
      gsap.fromTo(
        ".contact-card",
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="contact"
      className="portfolio-section section min-h-[calc(100vh-64px)] w-full flex items-center justify-center bg-neutral-950 text-white rounded-2xl border border-white/5 my-4 relative overflow-hidden"
    >
      {/* Animated Background Glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full"
      />

      <div className="section-content w-full h-full flex justify-center px-6 md:px-12 py-16 z-10">
        <div className="section-inner max-w-6xl w-full flex flex-col items-center justify-center space-y-12 text-center">
          
          {/* Header */}
          <div className="contact-header space-y-3">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Let's{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Connect
              </span>
            </h2>
            <p className="text-neutral-400 text-sm md:text-base font-light">
              Ready to collaborate on your next project?
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
            {CONTACT_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noreferrer"
                  className="contact-card group relative p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-xl flex flex-col items-center justify-center text-center space-y-4 hover:border-emerald-500/40 hover:bg-neutral-900/90 transition-all duration-300 hover:-translate-y-1 shadow-lg overflow-hidden cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 p-[1px] shadow-lg shadow-emerald-500/10 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center text-emerald-400">
                      {Icon && <Icon className="w-5 h-5" />}
                    </div>
                  </div>

                  <div className="space-y-1.5 w-full">
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-neutral-400 font-mono tracking-tight group-hover:text-neutral-300 transition-colors truncate px-1">
                      {item.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}