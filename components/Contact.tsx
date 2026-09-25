"use client";

import React, { useRef } from "react";
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useParticleCanvas } from "@/app/hooks/useParticleCanvas";

/* -------------------------------------------------------------------------- */
/*  Directional animation helpers                                             */
/* -------------------------------------------------------------------------- */

type Direction = "left" | "right" | "top" | "bottom";

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  left: { x: -90, y: 0 },
  right: { x: 90, y: 0 },
  top: { x: 0, y: -70 },
  bottom: { x: 0, y: 70 },
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: false, amount: 0.2 };

const slide = (from: Direction, delay = 0, duration = 0.8) => ({
  initial: { opacity: 0, ...OFFSETS[from] },
  whileInView: { opacity: 1, x: 0, y: 0 },
  viewport: VIEWPORT,
  transition: { duration, delay, ease: EASE },
});

// Custom SVG component for LinkedIn
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

const CONTACT_ITEMS = [
  {
    title: "Email",
    value: "shehzore.dev@gmail.com",
    href: "mailto:shehzore.dev@gmail.com",
    icon: Mail,
  },
  {
    title: "Phone",
    value: "+92 331 5378084",
    href: "tel:+923315378084",
    icon: Phone,
  },
  {
    title: "LinkedIn",
    value: "linkedin.com/in/muhammad-shehzore",
    href: "https://www.linkedin.com/in/muhammad-shehzore-620a44268/",
    icon: LinkedinIcon,
  },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Neural Network Background Particle Canvas
  useParticleCanvas(canvasRef);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Ambient pulsing glow matching the hero accent
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.2,
          opacity: 0.35,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.easeInOut",
        });
      }

      // Staggered cards entrance
      gsap.fromTo(
        ".contact-card",
        { y: 40, opacity: 0, scale: 0.94 },
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

  // Dynamic 3D Tilt handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      boxShadow: "0px 20px 40px -15px rgba(124, 58, 237, 0.18)",
      borderColor: "rgba(139, 92, 246, 0.4)",
      duration: 0.25,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
      borderColor: "rgba(0,0,0,0.08)",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="portfolio-section section min-h-[calc(100vh-64px)] w-full relative flex items-center justify-center overflow-hidden bg-[#FAFAF8] rounded-2xl border border-black/5 mt-0 mb-4"
    >
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      />

      {/* Soft Ambient Accent Glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full bg-violet-300/25 blur-[120px] pointer-events-none z-0"
      />

      <div className="section-content relative z-10 w-full h-full flex justify-center px-6 md:px-12 py-16">
        <div className="section-inner max-w-5xl w-full flex flex-col items-center justify-center space-y-12 text-center">
          {/* Header */}
          <div className="contact-header flex flex-col items-center text-center space-y-3">
            <h2 className="leading-[0.95] font-black uppercase tracking-tighter text-5xl sm:text-6xl lg:text-7xl">
              <motion.span
                className="inline-block text-transparent"
                style={{ WebkitTextStroke: "1.5px #171717" }}
                {...slide("left", 0.15, 0.9)}
              >
                Let's
              </motion.span>{" "}
              <motion.span
                className="inline-block text-[#8023FE]"
                {...slide("right", 0.15, 0.9)}
              >
                Connect
              </motion.span>
            </h2>
            <p className="text-neutral-600 text-sm md:text-base font-light max-w-md mx-auto pt-2">
              Ready to collaborate on your next project? Feel free to reach out.
            </p>
          </div>

          {/* 3D Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl [perspective:1000px]">
            {CONTACT_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noreferrer"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="contact-card group relative p-8 rounded-3xl bg-white border border-black/8 shadow-sm flex flex-col items-center justify-center text-center space-y-5 cursor-pointer [transform-style:preserve-3d] transition-colors duration-300"
                >
                  {/* Floating 3D Icon Badge */}
                  <div className="w-16 h-16 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300 [transform:translateZ(30px)]">
                    {Icon && (
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    )}
                  </div>

                  {/* Floating 3D Text */}
                  <div className="space-y-1.5 w-full [transform:translateZ(20px)]">
                    <h3 className="text-xl font-bold text-neutral-900 tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-500 font-mono tracking-tight group-hover:text-violet-600 transition-colors truncate px-2">
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