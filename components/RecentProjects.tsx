"use client";

import React, {
  createContext,
  useContext,
  useRef,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ExternalLink, CheckCircle2 } from "lucide-react";

// Utility Function
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

// Helper function to extract Video ID and return a valid Embed URL
const getEmbedUrl = (url: string) => {
  if (!url) return "";
  let videoId = "";

  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/watch")) {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    videoId = urlParams.get("v") || "";
  } else if (url.includes("youtube.com/embed/")) {
    return url;
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const PROJECTS = [
  {
    id: "axora",
    title: "The Axora",
    description:
      "An AI automation SaaS agency delivering embeddable AI receptionists, modern high converting web applications, and automated customer communication workflows.",
    highlights: [
      "Embeddable AI Receptionist Widgets",
      "Multi tenant SaaS Architecture",
      "Paddle Subscription Billing Integration",
      "Next.js & Modern Gemini AI Engine",
    ],
    liveUrl: "https://www.theaxora.com/",
    youtubeUrl: "https://youtu.be/pJPRjdzcUf8?si=e_CZhUjR1JXnH1rd",
  },
  {
    id: "rak-services",
    title: "RAK Services WhatsApp IT Support",
    description:
      "An automated enterprise WhatsApp IT support system enabling instant password resets, automated site assignments, and direct database webhooks via Meta Graph API.",
    highlights: [
      "Laravel PHP Webhook Integration",
      "Meta Graph API & WhatsApp Workflows",
      "Automated Password Reset Flows",
      "MySQL & Oracle Database Connectivity",
    ],
    liveUrl: "#",
    youtubeUrl: "https://youtu.be/mPI8tAVba7Y?si=PdJ8J6BYSV3qR15t",
  },
];

/* ---------------------------------------------------------------- */
/* Stacking Cards Engine Primitives                                 */
/* ---------------------------------------------------------------- */

interface StackingCardsProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  scrollOptions?: UseScrollOptions;
  scaleMultiplier?: number;
  totalCards: number;
}

interface StackingCardItemProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  index: number;
  topPosition?: string;
}

const StackingCardsContext = createContext<{
  progress: MotionValue<number>;
  scaleMultiplier?: number;
  totalCards?: number;
} | null>(null);

const useStackingCardsContext = () => {
  const context = useContext(StackingCardsContext);
  if (!context) {
    throw new Error("StackingCardItem must be used within StackingCards");
  }
  return context;
};

function StackingCards({
  children,
  className,
  scrollOptions,
  scaleMultiplier = 0.035,
  totalCards,
  ...props
}: StackingCardsProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
    ...scrollOptions,
  });

  return (
    <StackingCardsContext.Provider
      value={{ progress: scrollYProgress, scaleMultiplier, totalCards }}
    >
      <div className={cn("relative w-full", className)} ref={targetRef} {...props}>
        {children}
      </div>
    </StackingCardsContext.Provider>
  );
}

function StackingCardItem({
  index,
  topPosition,
  className,
  children,
  ...props
}: StackingCardItemProps) {
  const {
    progress,
    scaleMultiplier,
    totalCards = 0,
  } = useStackingCardsContext();

  const startProgress = index / totalCards;
  const midProgress = (index + 0.5) / totalCards;
  const endProgress = 1;

  const targetScaleEnd = 1 - (totalCards - 1 - index) * (scaleMultiplier ?? 0.035);

  const scale = useTransform(
    progress,
    [startProgress, midProgress, endProgress],
    [0.96, 1, targetScaleEnd]
  );

  const baseStickyTop = topPosition ?? "clamp(1.5rem, 4vh, 3rem)";

  return (
    <div
      className={cn("sticky w-full py-2 sm:py-3", className)}
      style={{
        top: baseStickyTop,
        zIndex: index + 1,
      }}
      {...props}
    >
      <motion.div
        className="origin-center relative w-full"
        style={{
          scale,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Portfolio Component Implementation                               */
/* ---------------------------------------------------------------- */

export default function RecentProjects() {
  return (
    <section
      id="projects"
      className="portfolio-section section min-h-screen w-full relative bg-[#FAFAF8] rounded-2xl border border-black/5 my-4 py-12 sm:py-16 px-4 sm:px-8 md:px-12 font-sans overflow-x-clip"
    >
      {/* Background Soft Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[45rem] h-72 sm:h-[45rem] rounded-full bg-violet-300/25 blur-[100px] sm:blur-[140px] pointer-events-none"
      />

      <div className="section-content relative z-10 w-full max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <h2 className="leading-[0.95] font-black uppercase tracking-tighter text-5xl sm:text-6xl lg:text-7xl">
            <motion.span
              className="inline-block text-transparent"
              style={{ WebkitTextStroke: "1.5px #171717" }}
              {...slide("left", 0.15, 0.9)}
            >
              Recent
            </motion.span>{" "}
            <motion.span
              className="inline-block text-[#8023FE]"
              {...slide("right", 0.15, 0.9)}
            >
              Projects
            </motion.span>
          </h2>
        </div>

        {/* Stacking Cards Container */}
        <StackingCards
          totalCards={PROJECTS.length}
          scaleMultiplier={0.03}
          className="w-full max-w-7xl mx-auto pb-[15vh]"
        >
          {PROJECTS.map((project, index) => {
            return (
              <StackingCardItem key={project.id} index={index}>
                <article className="project-card group relative rounded-2xl sm:rounded-[2rem] bg-white border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] md:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-2xl hover:border-violet-400/50 transition-all duration-300 p-5 sm:p-8 md:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                  
                  {/* Left Side: Project Details */}
                  <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-neutral-600 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Highlights */}
                    <ul className="space-y-2 sm:space-y-3 pt-1">
                      {project.highlights.map((highlight, hIdx) => (
                        <li
                          key={hIdx}
                          className="flex items-center gap-2.5 text-xs sm:text-sm md:text-base font-medium text-neutral-800"
                        >
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Actions */}
                    {project.liveUrl !== "#" && (
                      <div className="pt-2 sm:pt-4">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-neutral-900 text-white font-semibold text-xs sm:text-base hover:bg-violet-600 transition-colors shadow-md"
                        >
                          Visit Website <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Right Side: Embedded YouTube Video Container */}
                  <div className="lg:col-span-7 w-full h-full flex items-center">
                    <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-black/10 shadow-lg group-hover:shadow-violet-500/10 transition-shadow">
                      <iframe
                        src={getEmbedUrl(project.youtubeUrl)}
                        title={`${project.title} Video Showcase`}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </article>
              </StackingCardItem>
            );
          })}

          {/* Scroll buffer space */}
          <div className="h-[20vh] w-full" aria-hidden="true" />
        </StackingCards>
      </div>
    </section>
  );
}