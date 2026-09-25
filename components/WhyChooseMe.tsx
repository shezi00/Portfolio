"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  CheckCircle2,
  Clock,
  LifeBuoy,
  MessageCircle,
  RefreshCw,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useParticleCanvas } from "@/app/hooks/useParticleCanvas";

// Utility for merging Tailwind class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

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

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

interface Feature {
  step: string;
  title: string;
  content: string;
  points: string[];
  icon: LucideIcon;
  /** Optional photo. When omitted, the stage shows a purple icon panel. */
  image?: string;
}

const WHY_CHOOSE_ME_STEPS: Feature[] = [
  {
    step: "01. Communication",
    title: "Clear Communication",
    content:
      "You always know where your project stands. I listen first, explain things in plain language, and keep you updated at every stage.",
    points: ["Listens first", "Plain language", "Regular updates"],
    icon: MessageCircle,
  },
  {
    step: "02. Revisions",
    title: "Revisions Until It's Right",
    content:
      "Your feedback shapes the result. I refine the work with you until the final product matches what you had in mind.",
    points: ["Feedback welcome", "Refinements included", "Your approval first"],
    icon: RefreshCw,
  },
  {
    step: "03. Reliability",
    title: "Honest, Reliable Delivery",
    content:
      "Realistic timelines, honest progress reports, and early notice if anything changes, so deadlines never turn into surprises.",
    points: ["Realistic timelines", "Honest progress", "Early heads-up"],
    icon: Clock,
  },
  {
    step: "04. Support",
    title: "Full Support",
    content:
      "I stay available after launch to fix issues, answer questions, and help your product keep growing.",
    points: ["Post-launch help", "Bug fixes", "Questions answered"],
    icon: LifeBuoy,
  },
];

/* -------------------------------------------------------------------------- */
/*  FeatureSteps (controlled: the active step comes from scroll position)     */
/* -------------------------------------------------------------------------- */

// Slides the stage up when scrolling down, and down when scrolling back up
const stageVariants: Variants = {
  enter: (dir: number) => ({ y: dir * 80, opacity: 0, rotateX: dir * -15 }),
  center: { y: 0, opacity: 1, rotateX: 0 },
  exit: (dir: number) => ({ y: dir * -80, opacity: 0, rotateX: dir * 15 }),
};

interface FeatureStepsProps {
  features: Feature[];
  activeIndex: number;
  direction: number;
  onSelect: (index: number) => void;
  className?: string;
  imageHeight?: string;
}

function FeatureSteps({
  features,
  activeIndex,
  direction,
  onSelect,
  className,
  imageHeight = "h-[260px] sm:h-[380px] md:h-[500px]",
}: FeatureStepsProps) {
  const active = features[activeIndex];
  const ActiveIcon = active.icon;

  // Mouse-driven 3D tilt for the stage panel
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 150, damping: 18 });
  const springY = useSpring(tiltY, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const shineX = useTransform(springX, [-0.5, 0.5], ["10%", "90%"]);
  const shineY = useTransform(springY, [-0.5, 0.5], ["10%", "90%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div className={cn("p-4 md:p-8", className)}>
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading with "Why Work" and "With Me" */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <h2 className="why-title leading-[0.95] font-black uppercase tracking-tighter text-5xl sm:text-6xl lg:text-7xl">
            <motion.span
              className="inline-block text-transparent"
              style={{ WebkitTextStroke: "1.5px #171717" }}
              {...slide("left", 0.15, 0.9)}
            >
              Why Work
            </motion.span>{" "}
            <motion.span
              className="inline-block text-[#8023FE]"
              {...slide("right", 0.15, 0.9)}
            >
              With Me
            </motion.span>
          </h2>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Step list */}
          <div className="why-list order-2 md:order-1 space-y-3 md:space-y-6 w-full">
            {features.map((feature, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={feature.step}
                  role="button"
                  tabIndex={0}
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => onSelect(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(index);
                    }
                  }}
                  className={cn(
                    "relative overflow-hidden flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-2xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400",
                    isActive
                      ? "bg-white border-violet-500/40 shadow-lg shadow-violet-500/5"
                      : "bg-white/50 border-black/5 hover:border-black/10 hover:bg-white"
                  )}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    className={cn(
                      "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border shrink-0 transition-transform font-bold text-sm md:text-base",
                      isActive
                        ? "bg-violet-600 border-violet-600 text-white scale-105 shadow-md shadow-violet-500/30"
                        : index < activeIndex
                        ? "bg-violet-100 border-violet-300 text-violet-700"
                        : "bg-neutral-100 border-black/10 text-neutral-500"
                    )}
                  >
                    {index < activeIndex ? (
                      <span>✓</span>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base md:text-xl font-bold text-neutral-900">
                      {feature.title}
                    </h3>
                    {/* On phones only the active step shows its description, to keep the pinned view short */}
                    <p
                      className={cn(
                        "text-xs md:text-sm text-neutral-600 font-light mt-1 leading-relaxed",
                        !isActive && "hidden md:block"
                      )}
                    >
                      {feature.content}
                    </p>
                  </div>

                  {/* Scroll progress for this step, filled by ScrollTrigger */}
                  <span
                    aria-hidden="true"
                    className="step-bar absolute left-0 bottom-0 h-[3px] w-0 bg-violet-500"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Stage */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            className={cn(
              "why-stage order-1 md:order-2 relative w-full overflow-hidden rounded-3xl border border-black/10 bg-violet-950 shadow-xl",
              imageHeight
            )}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={stageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-900"
              >
                {active.image ? (
                  <Image
                    src={active.image}
                    alt={active.step}
                    className="w-full h-full object-cover"
                    width={1000}
                    height={600}
                    unoptimized
                    priority
                  />
                ) : (
                  <>
                    {/* Moving cursor-follow sheen */}
                    <motion.div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none mix-blend-soft-light"
                      style={{
                        background: `radial-gradient(420px circle at ${shineX} ${shineY}, rgba(255,255,255,0.55), transparent 65%)`,
                      }}
                    />

                    {/* Faint dot grid for texture */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle,_white_1px,_transparent_1px)] [background-size:24px_24px]"
                    />

                    {/* Orbiting dashed rings behind the icon */}
                    <div className="absolute left-5 top-5 md:left-8 md:top-8 w-24 h-24 md:w-32 md:h-32">
                      <motion.svg
                        viewBox="0 0 100 100"
                        className="absolute inset-0 w-full h-full text-white/25"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="46"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="6 10"
                        />
                      </motion.svg>
                      <motion.svg
                        viewBox="0 0 100 100"
                        className="absolute inset-0 w-full h-full text-white/15"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="36"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeDasharray="2 8"
                        />
                      </motion.svg>

                      {/* Pulsing glow + icon, centered in the rings */}
                      <div className="absolute inset-0 grid place-items-center">
                        <motion.span
                          aria-hidden="true"
                          className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 blur-xl"
                          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.9, 0.5] }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="relative grid place-items-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 text-white shadow-lg">
                          <ActiveIcon className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                      </div>
                    </div>

                    {/* Floating glass mockup card: a little "proof" widget per step */}
                    <motion.div
                      className="hidden sm:block absolute right-5 top-6 md:right-8 md:top-10 w-40 md:w-48 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-3 md:p-4"
                      style={{ transformStyle: "preserve-3d" }}
                      initial={{ opacity: 0, y: -12, rotate: 6 }}
                      animate={{
                        opacity: 1,
                        y: [0, -8, 0],
                        rotate: 6,
                      }}
                      transition={{
                        opacity: { duration: 0.5, delay: 0.15 },
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      }}
                    >
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span className="w-2 h-2 rounded-full bg-rose-300/80" />
                        <span className="w-2 h-2 rounded-full bg-amber-300/80" />
                        <span className="w-2 h-2 rounded-full bg-emerald-300/80" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-1.5 rounded-full bg-white/40 w-full" />
                        <div className="h-1.5 rounded-full bg-white/25 w-4/5" />
                        <div className="h-1.5 rounded-full bg-white/25 w-3/5" />
                      </div>
                      <div className="mt-3 flex items-center gap-1.5 text-white/90">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-semibold tracking-wide uppercase">
                          On track
                        </span>
                      </div>
                    </motion.div>
                  </>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Caption */}
                <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6 text-white space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {active.points.map((point) => (
                      <span
                        key={point}
                        className="rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                  <span className="block text-xs font-mono text-violet-200 uppercase tracking-widest font-semibold">
                    {active.step}
                  </span>
                  <h4 className="text-lg font-bold">{active.title}</h4>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

// How much scrolling each step takes, as a fraction of the screen height
const SCROLL_PER_STEP = 0.75;

export default function WhyChooseMe() {
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  // Neural Network Background Particle Canvas
  useParticleCanvas(canvasRef);

  const [{ index, dir }, setActive] = useState({ index: 0, dir: 1 });
  const total = WHY_CHOOSE_ME_STEPS.length;

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const bars = gsap.utils.toArray<HTMLElement>(".step-bar");

      // Pin the section, then let scroll position choose the active step
      triggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 16px",
        end: () => `+=${window.innerHeight * total * SCROLL_PER_STEP}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const raw = self.progress * total;
          const next = Math.min(total - 1, Math.floor(raw));

          setActive((prev) =>
            prev.index === next
              ? prev
              : { index: next, dir: next > prev.index ? 1 : -1 }
          );

          // Fill each step's bar directly, without re-rendering React
          bars.forEach((bar, i) => {
            gsap.set(bar, {
              width: `${gsap.utils.clamp(0, 1, raw - i) * 100}%`,
            });
          });
        },
      });

      // Ambient glow + entrances (skipped for people who prefer reduced motion)
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (glowRef.current) {
          gsap.to(glowRef.current, {
            scale: 1.25,
            opacity: 0.35,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        const enter = () => ({
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        });

        gsap.from(".why-choose-header", {
          y: -40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: enter(),
        });
        gsap.from(".why-title", {
          y: -30,
          opacity: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: enter(),
        });
        gsap.from(".why-list", {
          x: -80,
          opacity: 0,
          duration: 0.9,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: enter(),
        });
        gsap.from(".why-stage", {
          x: 80,
          opacity: 0,
          duration: 0.9,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: enter(),
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  // Clicking a step scrolls to the middle of that step's stretch
  const goToStep = (i: number) => {
    const st = triggerRef.current;
    if (!st) return;
    const top = st.start + (st.end - st.start) * ((i + 0.5) / total);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="why-choose-me"
      className="portfolio-section section min-h-[calc(100svh-2rem)] w-full relative flex flex-col items-center justify-center overflow-hidden bg-[#FAFAF8] rounded-2xl border border-black/5 my-4 py-8 md:py-16"
    >
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      />

      {/* Background soft glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full bg-violet-300/25 blur-[120px] pointer-events-none z-0"
      />

      <div className="section-content relative z-10 w-full max-w-6xl">
        {/* Header badge */}
       

        {/* Feature steps */}
        <FeatureSteps
          features={WHY_CHOOSE_ME_STEPS}
          activeIndex={index}
          direction={dir}
          onSelect={goToStep}
        />
      </div>
    </section>
  );
}