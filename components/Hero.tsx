"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MapPin, Mail, Phone, ArrowUpRight, Download } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useParticleCanvas } from "@/app/hooks/useParticleCanvas";

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

/* -------------------------------------------------------------------------- */
/*  Animation variants — each group enters from a different direction         */
/* -------------------------------------------------------------------------- */

// Top bar: drops down from above
const fromTop: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const topBarContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// Resume button: slides in from the right
const fromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.2 },
  },
};

// "Muhammad" outline text: slides in from the left
const nameFromLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

// "Shehzore" fill text: slides in from the right
const nameFromRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
  },
};

// Photo: rises up from below with a scale-in
const photoFromBottom: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

// Role/blurb/CTA block: slides in from the left
const contentContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.6 },
  },
};

const contentItem: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Social pills: slides in from the right
const socialContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.7 },
  },
};

const socialItem: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const MotionA = motion.a;

export default function Hero() {
  const [typedRole, setTypedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Neural Network Background Particle Canvas
  useParticleCanvas(canvasRef);

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
      className="portfolio-section section min-h-[calc(100vh-64px)] w-full relative flex flex-col overflow-hidden bg-[#FAFAF8] rounded-2xl border border-black/5"
    >
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      />

      {/* Soft ambient accent */}
      <div className="absolute top-0 right-0 w-[32rem] h-[32rem] rounded-full bg-violet-300/20 blur-[130px] pointer-events-none z-0" />

      {/* Top bar: availability + nav-style contact pills — drops in from the top */}
      <motion.div
        className="relative z-20 flex flex-wrap items-center justify-between gap-4 px-6 md:px-12 pt-8"
        initial="hidden"
        animate="visible"
        variants={topBarContainer}
      >
        <motion.div
          className="hidden md:flex items-center gap-2 text-xs font-mono text-neutral-500"
          variants={topBarContainer}
        >
          <motion.span
            variants={fromTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 bg-white"
          >
            <MapPin className="w-3.5 h-3.5 text-violet-500" />
            Islamabad, Pakistan
          </motion.span>
          <MotionA
            variants={fromTop}
            href="mailto:shehzore.dev@gmail.com"
            whileHover={{
              scale: 1.06,
              borderColor: "rgba(124, 58, 237, 0.4)",
              backgroundColor: "rgba(124, 58, 237, 0.06)",
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 bg-white"
          >
            <Mail className="w-3.5 h-3.5 text-violet-500" />
            shehzore.dev@gmail.com
          </MotionA>
          <MotionA
            variants={fromTop}
            href="tel:+923315378084"
            whileHover={{
              scale: 1.06,
              borderColor: "rgba(124, 58, 237, 0.4)",
              backgroundColor: "rgba(124, 58, 237, 0.06)",
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 bg-white"
          >
            <Phone className="w-3.5 h-3.5 text-violet-500" />
            +92 331 5378084
          </MotionA>
        </motion.div>

        <MotionA
          variants={fromRight}
          href="/M.Shehzore.pdf"
          download="Muhammad.Shehzore.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.04,
            boxShadow: "0px 10px 28px -8px rgba(124, 58, 237, 0.35)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white font-semibold text-xs md:text-sm cursor-pointer"
        >
          Resume <Download className="w-3.5 h-3.5" />
        </MotionA>
      </motion.div>

      {/* Center stage: name, photo, and side content all in one relative block */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-6 pb-10">
        <h1 className="relative select-none text-center leading-[0.88] font-black uppercase tracking-tighter text-[13vw] sm:text-[10vw] lg:text-[7.5vw]">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={nameFromLeft}
            className="relative z-10 block text-transparent"
            style={{ WebkitTextStroke: "1.5px #171717" }}
          >
            Muhammad
          </motion.span>

          {/* Hand-drawn accent underline — draws in after the name arrives */}
          <svg
            viewBox="0 0 400 30"
            preserveAspectRatio="none"
            className="absolute left-1/2 -translate-x-1/2 w-[38%] h-[3vw] max-h-8 -bottom-[3%] z-0 pointer-events-none"
          >
            <motion.path
              d="M6 20 C 80 6, 160 4, 240 10 S 360 22, 394 12"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease: "easeInOut" }}
            />
          </svg>

          <motion.span
            initial="hidden"
            animate="visible"
            variants={nameFromRight}
            className="relative z-10 block text-neutral-900"
          >
            Shehzore
          </motion.span>
        </h1>

        {/* Photo overlapping the name, centered — rises up from below */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={photoFromBottom}
          className="relative z-20 -mt-[26vw] sm:-mt-[19vw] lg:-mt-[13vw] w-[100vw] sm:w-[66vw] lg:w-[42vw] max-w-[680px] aspect-[3/4]"
        >
          <div className="absolute -inset-8 rounded-full bg-violet-400/25 blur-[70px] pointer-events-none" />
          <div
            className="relative w-full h-full"
            style={{
              maskImage:
                "radial-gradient(ellipse 72% 82% at 50% 32%, black 55%, rgba(0,0,0,0.65) 74%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 72% 82% at 50% 32%, black 55%, rgba(0,0,0,0.65) 74%, transparent 100%)",
            }}
          >
            <Image
              src="/mebg.png"
              alt="Muhammad Shehzore"
              fill
              priority
              sizes="(max-width: 1024px) 60vw, 320px"
              className="object-contain object-bottom"
            />
          </div>
        </motion.div>

        {/* Role, blurb, CTAs — slides in from the left, staggered */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={contentContainer}
          className="relative z-20 mt-8 lg:mt-0 lg:absolute lg:left-4 xl:left-10 lg:top-[62%] lg:-translate-y-1/2 w-full max-w-md lg:max-w-xs text-center lg:text-left space-y-4"
        >
          <motion.div
            variants={contentItem}
            className="h-8 flex items-center justify-center lg:justify-start"
          >
            <span className="text-lg md:text-xl font-mono text-violet-600 font-semibold">
              {typedRole}
            </span>
            <span className="w-0.5 h-5 bg-violet-500 ml-1 animate-pulse" />
          </motion.div>

          <motion.p
            variants={contentItem}
            className="text-neutral-600 text-sm md:text-base leading-relaxed font-light"
          >
            Helping brands grow their business through{" "}
            <span className="text-violet-600 font-medium">
              modern web architectures
            </span>
            , intelligent AI solutions, and{" "}
            <span className="text-violet-600 font-medium">
              slick interactive interfaces.
            </span>
          </motion.p>

          <motion.div
            variants={contentItem}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1"
          >
            <MotionA
              href="#projects"
              whileHover={{
                scale: 1.04,
                boxShadow: "0px 10px 28px -8px rgba(124, 58, 237, 0.35)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white font-semibold text-sm cursor-pointer"
            >
              View Projects <ArrowUpRight className="w-4 h-4" />
            </MotionA>
            <MotionA
              href="#contact"
              whileHover={{
                scale: 1.04,
                boxShadow: "0px 10px 28px -8px rgba(124, 58, 237, 0.35)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/15 bg-white text-neutral-800 font-semibold text-sm cursor-pointer"
            >
              Let&apos;s collaborate <ArrowUpRight className="w-4 h-4" />
            </MotionA>
          </motion.div>
        </motion.div>

        {/* Social pills — slides in from the right, staggered */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={socialContainer}
          className="relative z-20 mt-6 lg:mt-0 lg:absolute lg:right-4 xl:right-10 lg:top-[62%] lg:-translate-y-1/2 flex flex-row lg:flex-col gap-3"
        >
          <MotionA
            variants={socialItem}
            href="https://www.linkedin.com/in/muhammad-shehzore-620a44268/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            whileHover={{
              scale: 1.06,
              borderColor: "rgba(124, 58, 237, 0.4)",
              backgroundColor: "rgba(124, 58, 237, 0.06)",
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/10 bg-white text-neutral-700 text-sm font-medium"
          >
            <LinkedinIcon className="w-4 h-4" /> LinkedIn
          </MotionA>
          <MotionA
            variants={socialItem}
            href="https://github.com/shezi00"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            whileHover={{
              scale: 1.06,
              borderColor: "rgba(124, 58, 237, 0.4)",
              backgroundColor: "rgba(124, 58, 237, 0.06)",
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/10 bg-white text-neutral-700 text-sm font-medium"
          >
            <GithubIcon className="w-4 h-4" /> GitHub
          </MotionA>
        </motion.div>
      </div>
    </section>
  );
}