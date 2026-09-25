"use client";

import React, { useRef } from "react";
import {
  Code2,
  Workflow,
  Bot,
  MessageCircle,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useParticleCanvas } from "@/app/hooks/useParticleCanvas";

/* -------------------------------------------------------------------------- */
/*  Directional animation helpers (same as About)                             */
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

// Set `once: false` to replay every animation each time you scroll back
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

type GradientName = "violet" | "indigo" | "fuchsia" | "slate";

const SKILLS: {
  badgeText: string;
  badgeColor: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  icon: LucideIcon;
  gradient: GradientName;
  from: Direction;
}[] = [
  {
    badgeText: "Web development",
    badgeColor: "#8023FE",
    title: "Full Stack Website Development",
    description:
      "I build complete websites and web apps, from the backend to a clean and modern interface.",
    ctaText: "See my projects",
    ctaHref: "#projects",
    icon: Code2,
    gradient: "violet",
    from: "left",
  },
  {
    badgeText: "Automation",
    badgeColor: "#6366F1",
    title: "AI Automation",
    description:
      "I build AI-powered solutions that automate repetitive tasks and save your team time.",
    ctaText: "Automate my work",
    ctaHref: "#contact",
    icon: Workflow,
    gradient: "indigo",
    from: "top",
  },
  {
    badgeText: "Conversational AI",
    badgeColor: "#D946EF",
    title: "AI Assistants",
    description:
      "I build custom AI assistants that answer questions, understand your business, and help your customers.",
    ctaText: "Build an assistant",
    ctaHref: "#contact",
    icon: Bot,
    gradient: "fuchsia",
    from: "bottom",
  },
  {
    badgeText: "Messaging",
    badgeColor: "#4B5563",
    title: "WhatsApp Automation",
    description:
      "I build WhatsApp solutions that automate business tasks, handle customer requests, and make daily processes easier.",
    ctaText: "Automate WhatsApp",
    ctaHref: "#contact",
    icon: MessageCircle,
    gradient: "slate",
    from: "right",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function Skills() {
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
    // reducedMotion="user" turns off movement for people who ask for it
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="skills"
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
          className="absolute top-0 right-0 w-[32rem] h-[32rem] rounded-full bg-violet-300/20 blur-[130px] pointer-events-none z-0"
        />
        <motion.div
          style={{ y: glowYReverse }}
          className="absolute bottom-0 left-0 w-[26rem] h-[26rem] rounded-full bg-violet-200/20 blur-[120px] pointer-events-none z-0"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* ------------------------------ Header ------------------------------ */}
          <div className="flex flex-col items-center text-center mb-14">
            {/* "My" slides in from the left, "Services" from the right */}
            <h2 className="leading-[0.95] font-black uppercase tracking-tighter text-5xl sm:text-6xl lg:text-7xl">
              <motion.span
                className="inline-block text-transparent"
                style={{ WebkitTextStroke: "1.5px #171717" }}
                {...slide("left", 0.15, 0.9)}
              >
                My
              </motion.span>{" "}
              <motion.span
                className="inline-block text-[#8023FE]"
                {...slide("right", 0.15, 0.9)}
              >
                Services
              </motion.span>
            </h2>
          </div>

          {/* ------------------------------ Cards ------------------------------ */}
          {/* Each card arrives from a different side: left, top, bottom, right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {SKILLS.map((skill, i) => (
              <GradientCard key={skill.title} delay={i * 0.12} {...skill} />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

/* -------------------------------------------------------------------------- */
/*  GradientCard (inlined; no cva / cn / shadcn tokens needed)                */
/* -------------------------------------------------------------------------- */

const GRADIENTS: Record<GradientName, { bg: string; icon: string }> = {
  violet: {
    bg: "bg-gradient-to-br from-violet-100 to-indigo-200/50",
    icon: "text-[#8023FE]/20",
  },
  indigo: {
    bg: "bg-gradient-to-br from-indigo-100 to-blue-200/50",
    icon: "text-indigo-600/20",
  },
  fuchsia: {
    bg: "bg-gradient-to-br from-fuchsia-100 to-purple-200/50",
    icon: "text-fuchsia-600/20",
  },
  slate: {
    bg: "bg-gradient-to-br from-slate-100 to-slate-200/50",
    icon: "text-slate-600/20",
  },
};

const cardAnimation: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -4 },
};

const iconAnimation: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.1, rotate: 3 },
};

function GradientCard({
  badgeText,
  badgeColor,
  title,
  description,
  ctaText,
  ctaHref,
  icon: Icon,
  gradient,
  from,
  delay,
}: {
  badgeText: string;
  badgeColor: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  icon: LucideIcon;
  gradient: GradientName;
  from: Direction;
  delay: number;
}) {
  const g = GRADIENTS[gradient];

  return (
    // Entrance and hover live on separate elements so the hover
    // animation doesn't inherit the entrance delay.
    <Reveal from={from} delay={delay} className="h-full">
      <motion.div
        variants={cardAnimation}
        initial="rest"
        animate="rest"
        whileHover="hover"
        className="h-full"
      >
        <div
          className={`relative flex flex-col justify-between h-full min-h-[18rem] w-full overflow-hidden rounded-2xl border border-black/5 p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg ${g.bg}`}
        >
          {/* Oversized decorative icon */}
          <motion.div
            className="absolute -right-6 -bottom-6 pointer-events-none"
            initial={{ opacity: 0, x: 40, y: 60, rotate: -12 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: delay + 0.35, ease: EASE }}
            aria-hidden="true"
          >
            <motion.div
              variants={iconAnimation}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className={g.icon}
            >
              <Icon className="w-44 h-44" strokeWidth={1} />
            </motion.div>
          </motion.div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Badge */}
            <motion.div
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-sm font-medium text-neutral-700 backdrop-blur-sm w-fit"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: delay + 0.3, ease: EASE }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: badgeColor }}
              />
              {badgeText}
            </motion.div>

            <div className="flex-grow">
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900 mb-2">
                {title}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed font-light max-w-[16rem]">
                {description}
              </p>
            </div>

            {/* Link */}
            <motion.a
              href={ctaHref}
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 w-fit"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: delay + 0.5, ease: EASE }}
            >
              {ctaText}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}