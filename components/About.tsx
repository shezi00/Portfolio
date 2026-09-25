"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Code2,
  Layers,
  Server,
  Cpu,
  Workflow,
  GraduationCap,
  MapPin,
  ArrowUpRight,
  Award,
  Calendar,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import gsap from "gsap";
import { useParticleCanvas } from "@/app/hooks/useParticleCanvas";

/* -------------------------------------------------------------------------- */
/*  Directional animation helpers                                             */
/* -------------------------------------------------------------------------- */

type Direction = "left" | "right" | "top" | "bottom";

// How far each element travels before settling into place
const OFFSETS: Record<Direction, { x: number; y: number }> = {
  left: { x: -90, y: 0 },
  right: { x: 90, y: 0 },
  top: { x: 0, y: -70 },
  bottom: { x: 0, y: 70 },
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// once: false → replays every time the element re-enters the viewport,
// no refresh needed
const VIEWPORT = { once: false, amount: 0.2 };

const slide = (from: Direction, delay = 0, duration = 0.8) => ({
  initial: { opacity: 0, ...OFFSETS[from] },
  whileInView: { opacity: 1, x: 0, y: 0 },
  viewport: VIEWPORT,
  transition: { duration, delay, ease: EASE },
});

/** Wraps any content and slides it in from the chosen side. */
function Reveal({
  from,
  delay = 0,
  className,
  children,
}: {
  from: Direction;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div className={className} {...slide(from, delay)}>
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

const SERVICES = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Full-Stack Development",
    description:
      "I build modern websites and web apps that are clean, fast, and easy to use.",
    position: "left",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "React & Next.js",
    description:
      "Fast, responsive front ends built with React, Next.js, and TypeScript.",
    position: "left",
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Python & Node.js Backend",
    description:
      "I build fast and reliable backends and APIs that keep your websites and apps running smoothly.",
    position: "left",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "AI Applications",
    description:
      "I build AI assistants that answer questions, understand your business, and capture leads from your website.",
    position: "right",
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "Business Automation",
    description:
      "I build smart tools that automate repetitive tasks, save time, and make business processes easier.",
    position: "right",
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Scalable Architecture",
    description:
      "Modern web architectures that keep working as your product and traffic grow.",
    position: "right",
  },
] as const;

type Stat = {
  icon: React.ReactNode;
  value: number;
  label: string;
  from: Direction;
};

const STATS: Stat[] = [
  { icon: <Award className="w-6 h-6" />, value: 10, label: "Projects built", from: "left" },
  { icon: <Calendar className="w-6 h-6" />, value: 3, label: "Years coding", from: "bottom" },
  { icon: <TrendingUp className="w-6 h-6" />, value: 30, label: "Technologies used", from: "right" },
];

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Neural Network Background Particle Canvas
  useParticleCanvas(canvasRef);

  // Two ambient glows that drift in opposite directions as you scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const glowYReverse = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="about"
        className="portfolio-section section w-full relative overflow-hidden bg-[#FAFAF8] text-neutral-900 rounded-2xl border border-black/5 my-4 px-6 md:px-12 py-16 md:py-24"
      >
        {/* Particle Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 pointer-events-none w-full h-full"
        />

        {/* Ambient glows */}
        <motion.div
          style={{ y: glowY }}
          className="absolute bottom-0 left-0 w-[32rem] h-[32rem] rounded-full bg-violet-300/20 blur-[130px] pointer-events-none z-0"
        />
        <motion.div
          style={{ y: glowYReverse }}
          className="absolute top-0 right-0 w-[26rem] h-[26rem] rounded-full bg-violet-200/20 blur-[120px] pointer-events-none z-0"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* ------------------------------ Header ------------------------------ */}
          <div className="flex flex-col items-center text-center">
            <motion.h2
              initial={{ opacity: 0, rotate: 0 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE }}
              className="leading-[0.95] font-black uppercase tracking-tighter text-5xl sm:text-6xl lg:text-7xl"
            >
              <motion.span
                className="inline-block text-transparent"
                style={{ WebkitTextStroke: "1.5px #171717" }}
                {...slide("left", 0.1, 0.9)}
              >
                About
              </motion.span>{" "}
              <motion.span
                className="inline-block text-[#8023FE]"
                {...slide("right", 0.1, 0.9)}
              >
                Me
              </motion.span>
            </motion.h2>
          </div>

          {/* ------------------- Intro + education pills ------------------- */}
          <div className="mt-12 mb-16 flex flex-col items-center gap-6">
            <Reveal from="top" delay={0.2}>
              <p className="max-w-2xl text-center text-neutral-600 text-sm md:text-base leading-relaxed font-light">
                I’m Muhammad Shehzore, a Software Developer and Founder of{" "}
                <span className="text-[#8023FE] font-medium">The Axora</span>.
                I enjoy turning ideas into useful digital products and building
                solutions that make everyday business processes simpler and
                smarter.
              </p>
            </Reveal>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-neutral-500">
              <Reveal from="left" delay={0.35}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 bg-white">
                  <GraduationCap className="w-3.5 h-3.5 text-[#8023FE]" />
                  BS Computer Science, CUST · 2023 - 2027
                </span>
              </Reveal>

              <Reveal from="right" delay={0.45}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 bg-white">
                  <MapPin className="w-3.5 h-3.5 text-[#8023FE]" />
                  Islamabad, Pakistan
                </span>
              </Reveal>
            </div>
          </div>

          {/* ------------------------ Services + Photo ------------------------ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative">
            {/* Left column */}
            <div className="space-y-12">
              {SERVICES.filter((s) => s.position === "left").map((s, i) => (
                <ServiceItem
                  key={s.title}
                  icon={s.icon}
                  title={s.title}
                  description={s.description}
                  from="left"
                  delay={i * 0.15}
                />
              ))}
            </div>

            {/* Center photo with hand-drawn purple line art behind it */}
            <div className="flex justify-center items-center order-first md:order-none">
              <Reveal
                from="bottom"
                delay={0.1}
                className="relative w-full max-w-xs flex justify-center items-center"
              >
                {/* Purple Ambient Glow */}
                <div className="absolute -inset-6 rounded-full bg-[#8023FE]/20 blur-[60px] pointer-events-none -z-10" />

                {/* Hand-Drawn Purple Line Art Accent */}
                <svg
                  viewBox="0 0 300 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -inset-8 w-[115%] h-[115%] -z-10 pointer-events-none"
                >
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A78BFA" />
                      <stop offset="50%" stopColor="#8023FE" />
                      <stop offset="100%" stopColor="#6D28D9" />
                    </linearGradient>
                    <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#C4B5FD" stopOpacity="1" />
                      <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Slow-rotating dashed outer ring for depth */}
                  <motion.circle
                    cx="150"
                    cy="200"
                    r="175"
                    stroke="#8023FE"
                    strokeWidth="1"
                    strokeDasharray="2 10"
                    strokeOpacity="0.35"
                    initial={{ rotate: 0, opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    animate={{ rotate: 360 }}
                    viewport={VIEWPORT}
                    transition={{
                      opacity: { duration: 1, delay: 0.4 },
                      rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                    }}
                    style={{ transformOrigin: "150px 200px" }}
                  />

                  {/* Second inner dashed ring, counter-rotating */}
                  <motion.circle
                    cx="150"
                    cy="200"
                    r="150"
                    stroke="#A78BFA"
                    strokeWidth="1"
                    strokeDasharray="1 14"
                    strokeOpacity="0.3"
                    initial={{ rotate: 0, opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    animate={{ rotate: -360 }}
                    viewport={VIEWPORT}
                    transition={{
                      opacity: { duration: 1, delay: 0.5 },
                      rotate: { duration: 55, repeat: Infinity, ease: "linear" },
                    }}
                    style={{ transformOrigin: "150px 200px" }}
                  />

                  {/* Main hand-drawn organic path */}
                  <motion.path
                    d="M 40 100 C 10 30, 290 30, 260 150 C 230 270, 10 270, 40 370"
                    stroke="url(#lineGradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="8 6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.9 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
                  />

                  {/* Glowing dot that travels along the main path forever */}
                  <motion.circle
                    r="5"
                    fill="url(#dotGlow)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={VIEWPORT}
                    transition={{ delay: 1.6, duration: 0.6 }}
                  >
                    <animateMotion
                      dur="6s"
                      repeatCount="indefinite"
                      path="M 40 100 C 10 30, 290 30, 260 150 C 230 270, 10 270, 40 370"
                    />
                  </motion.circle>
                  <motion.circle
                    r="2.5"
                    fill="#C4B5FD"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={VIEWPORT}
                    transition={{ delay: 1.6, duration: 0.6 }}
                  >
                    <animateMotion
                      dur="6s"
                      repeatCount="indefinite"
                      path="M 40 100 C 10 30, 290 30, 260 150 C 230 270, 10 270, 40 370"
                    />
                  </motion.circle>

                  {/* Sparkle Accents */}
                  {[
                    { d: "M 15 50 L 30 50 M 22.5 42.5 L 22.5 57.5", delay: 0.7, loopDelay: 0 },
                    { d: "M 265 340 L 280 340 M 272.5 332.5 L 272.5 347.5", delay: 0.8, loopDelay: 0.6 },
                    { d: "M 270 70 L 282 70 M 276 64 L 276 76", delay: 0.9, loopDelay: 1.2 },
                    { d: "M 20 320 L 32 320 M 26 314 L 26 326", delay: 1.0, loopDelay: 1.8 },
                  ].map((sparkle, i) => (
                    <motion.path
                      key={i}
                      d={sparkle.d}
                      stroke="#8023FE"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{
                        scale: [0, 1.3, 1, 1, 0.7, 1],
                        opacity: [0, 1, 1, 0.4, 1, 1],
                      }}
                      viewport={VIEWPORT}
                      transition={{
                        duration: 2.5,
                        delay: sparkle.delay,
                        times: [0, 0.2, 0.3, 0.6, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: sparkle.loopDelay,
                        ease: "easeInOut",
                      }}
                      style={{ transformOrigin: "center" }}
                    />
                  ))}

                  {/* Small orbiting accent dots */}
                  {[
                    { cx: 260, cy: 60, r: 3, delay: 1.2 },
                    { cx: 30, cy: 200, r: 2.5, delay: 1.4 },
                    { cx: 250, cy: 330, r: 2, delay: 1.6 },
                  ].map((dot, i) => (
                    <motion.circle
                      key={i}
                      cx={dot.cx}
                      cy={dot.cy}
                      r={dot.r}
                      fill="#A78BFA"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: [0.3, 1, 0.3], scale: 1 }}
                      viewport={VIEWPORT}
                      transition={{
                        opacity: {
                          duration: 2.4,
                          repeat: Infinity,
                          delay: dot.delay,
                          ease: "easeInOut",
                        },
                        scale: { duration: 0.5, delay: dot.delay },
                      }}
                    />
                  ))}
                </svg>

                {/* Clean Photo */}
                <div className="relative aspect-[3/4] w-full max-w-[280px]">
                  <Image
                    src="/mebg.png"
                    alt="Muhammad Shehzore"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 80vw, 320px"
                    className="object-contain object-bottom"
                  />
                </div>
              </Reveal>
            </div>

            {/* Right column */}
            <div className="space-y-12">
              {SERVICES.filter((s) => s.position === "right").map((s, i) => (
                <ServiceItem
                  key={s.title}
                  icon={s.icon}
                  title={s.title}
                  description={s.description}
                  from="right"
                  delay={i * 0.15}
                />
              ))}
            </div>
          </div>

          {/* ------------------------------ Stats ------------------------------ */}
          <div className="mt-24 flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl [perspective:1000px]">
              {STATS.map((stat, i) => (
                <StatCounter key={stat.label} delay={i * 0.1} {...stat} />
              ))}
            </div>
          </div>

          {/* ------------------------------- CTA ------------------------------- */}
          <Reveal
            from="bottom"
            className="mt-16 bg-[#8023FE] text-white p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden"
          >
            <Reveal from="left" delay={0.3} className="text-center md:text-left">
              <h3 className="text-2xl font-bold tracking-tight mb-2">
                Have a project in mind?
              </h3>

              <p className="text-white/80 text-sm md:text-base font-light">
                Let&apos;s build something useful together.
              </p>
            </Reveal>

            <Reveal from="right" delay={0.4}>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-100 text-[#8023FE] font-semibold text-sm transition-colors"
              >
                Let&apos;s collaborate
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </Reveal>
        </div>
      </section>
    </MotionConfig>
  );
}

/* -------------------------------------------------------------------------- */
/*  ServiceItem                                                               */
/* -------------------------------------------------------------------------- */

function ServiceItem({
  icon,
  title,
  description,
  from,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  from: Direction;
  delay: number;
}) {
  return (
    <Reveal from={from} delay={delay}>
      <motion.div
        className="group flex flex-col"
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-violet-50 border border-violet-200 text-[#8023FE] flex items-center justify-center transition-colors duration-300 group-hover:bg-violet-100">
            {icon}
          </div>

          <h3 className="text-lg font-bold tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-[#8023FE]">
            {title}
          </h3>
        </div>

        <p className="pl-[60px] text-sm text-neutral-600 leading-relaxed font-light">
          {description}
        </p>
      </motion.div>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/*  StatCounter (3D Animated Card)                                           */
/* -------------------------------------------------------------------------- */

function StatCounter({
  icon,
  value,
  label,
  from,
  delay,
}: Stat & { delay: number }) {
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: false, amount: 0.5 });

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 14,
  });

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest)
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    } else {
      springValue.set(0);
    }
  }, [isInView, value, springValue]);

  // Dynamic 3D Tilt handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
      boxShadow: "0px 20px 40px -15px rgba(128, 35, 254, 0.18)",
      borderColor: "rgba(128, 35, 254, 0.4)",
      duration: 0.25,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
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
    <Reveal from={from} delay={delay}>
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative p-6 rounded-3xl bg-white border border-black/8 shadow-sm flex flex-col items-center text-center space-y-4 cursor-pointer [transform-style:preserve-3d] transition-colors duration-300"
      >
        <div className="w-14 h-14 rounded-full bg-[#8023FE]/10 border border-[#8023FE]/20 flex items-center justify-center text-[#8023FE] group-hover:bg-[#8023FE] group-hover:text-white transition-all duration-300 [transform:translateZ(30px)]">
          {icon}
        </div>

        <div className="space-y-1 w-full [transform:translateZ(20px)]">
          <div
            ref={countRef}
            className="text-4xl font-black tracking-tighter text-neutral-900 flex items-center justify-center gap-1"
          >
            <motion.span>{displayValue}</motion.span>
            <motion.span
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#8023FE]"
            >
              <Sparkles className="w-5 h-5" />
            </motion.span>
          </div>

          <p className="text-xs text-neutral-500 font-mono tracking-tight group-hover:text-[#8023FE] transition-colors">
            {label}
          </p>
        </div>
      </div>
    </Reveal>
  );
}