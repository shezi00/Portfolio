"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  Download,
} from "lucide-react";
import gsap from "gsap";

// Static array defined outside the component
const ROLES = [
  "Full Stack Developer",
  "AI Engineer",
  "React Developer",
  "Next.js Developer",
];

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

export default function Hero() {
  const [typedRole, setTypedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // GSAP Button Hover Handlers
  const handleButtonMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const icon = btn.querySelector("svg");

    gsap.to(btn, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      boxShadow: "0px 10px 25px -5px rgba(16, 185, 129, 0.25)",
    });

    if (icon) {
      gsap.to(icon, {
        x: 3,
        y: -3,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const icon = btn.querySelector("svg");

    gsap.to(btn, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
    });

    if (icon) {
      gsap.to(icon, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleSocialMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.15,
      borderColor: "rgba(16, 185, 129, 0.5)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };

  const handleSocialMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      borderColor: "rgba(38, 38, 38, 1)",
      backgroundColor: "rgba(23, 23, 23, 1)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Background typography fade in
      gsap.fromTo(
        ".hero-bg-text",
        { opacity: 0, scale: 0.95 },
        { opacity: 0.05, scale: 1, duration: 1.2, ease: "power2.out" }
      );

      // 2. Main content staggered entrance
      gsap.fromTo(
        ".hero-animate",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      // 3. Profile card entrance
      gsap.fromTo(
        ".hero-card",
        { x: 40, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Self-contained typewriter effect
  useEffect(() => {
    const currentFullRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedRole(currentFullRole.substring(0, typedRole.length + 1));
        if (typedRole === currentFullRole) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setTypedRole(currentFullRole.substring(0, typedRole.length - 1));
        if (typedRole === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedRole, isDeleting, roleIndex]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="portfolio-section section min-h-[calc(100vh-64px)] w-full relative flex items-center justify-center overflow-hidden bg-neutral-950 rounded-2xl border border-white/5"
    >
      {/* Background Decorative Typography */}
      <div className="hero-bg-text absolute inset-0 select-none overflow-hidden opacity-5 pointer-events-none flex flex-col justify-between p-8 font-mono text-[10vw] leading-none text-right font-black uppercase tracking-tighter">
        <div>Generative AI</div>
        <div>Full-Stack</div>
        <div>Architecture</div>
      </div>

      <div className="section-content w-full h-full flex items-center justify-center px-6 md:px-16 py-12 z-10">
        <div className="section-inner max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <p className="hero-animate text-xl md:text-2xl text-neutral-400 font-light">
                Hi, I'm
              </p>

              <h1 className="hero-animate text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight pb-2">
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-500 bg-clip-text text-transparent">
                  Muhammad Shehzore
                </span>
              </h1>

              <div className="hero-animate h-10 flex items-center">
                <span className="text-xl sm:text-2xl font-mono text-emerald-400 font-medium">
                  {typedRole}
                </span>
                <span className="w-0.5 h-6 bg-emerald-400 ml-1 animate-pulse" />
              </div>
            </div>

            <p className="hero-animate text-neutral-300 text-base md:text-lg leading-relaxed font-light max-w-xl">
              Helping Brands grow their Business through modern web
              architectures, intelligent AI solutions, and slick interactive
              user interfaces.
            </p>

            {/* Quick Details Bar */}
            <div className="hero-animate flex flex-wrap items-center gap-y-2 gap-x-6 text-xs md:text-sm font-mono text-neutral-400 pt-1 pb-2 border-y border-neutral-800/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="mailto:shehzore.dev@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  shehzore.dev@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="tel:+923315378084"
                  className="hover:text-white transition-colors"
                >
                  +92 3315378084
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hero-animate flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm cursor-pointer transition-colors"
              >
                View Projects <ArrowUpRight className="w-4 h-4" />
              </a>

             <a
  href="/M.Shehzore.pdf"
  download="Muhammad.Shehzore.pdf"
  target="_blank"
  rel="noopener noreferrer"
  onMouseEnter={handleButtonMouseEnter}
  onMouseLeave={handleButtonMouseLeave}
  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-700 bg-neutral-900/80 text-neutral-200 font-semibold text-sm cursor-pointer transition-colors"
>
  Download Resume <Download className="w-4 h-4" />
</a>

              <div className="flex items-center gap-3 ml-2">
                <a
                  href="https://www.linkedin.com/in/muhammad-shehzore-620a44268/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  onMouseEnter={handleSocialMouseEnter}
                  onMouseLeave={handleSocialMouseLeave}
                  className="p-3 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://github.com/shezi00"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  onMouseEnter={handleSocialMouseEnter}
                  onMouseLeave={handleSocialMouseLeave}
                  className="p-3 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Profile Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="hero-card relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm group p-2 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-transparent to-cyan-500/20 opacity-50 group-hover:opacity-80 transition-opacity z-10 pointer-events-none" />

              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/me1.jpeg"
                  alt="Muhammad Shehzore"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-contain object-bottom filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-xl bg-neutral-950/85 border border-neutral-800/80 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-mono text-neutral-400">
                      Status
                    </p>
                    <p className="text-xs font-medium text-emerald-400 flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Open for projects
                    </p>
                  </div>
                  <span className="text-xs font-mono text-neutral-500">
                    2026
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}