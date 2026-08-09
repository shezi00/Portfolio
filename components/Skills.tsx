"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Bot,
  Database,
} from "lucide-react";

// Embedded skill categories data tailored for AI & Full-Stack development
const SKILL_CATEGORIES = [
  {
    title: "Full Stack Dev",
    description:
      "Full-Stack Web Development, RESTful APIs, & Scalable Web Applications",
    icon: Code2,
    iconBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    barGradient: "from-emerald-500 to-cyan-400",
    tags: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "Laravel",
      "Fast Api",
      "TypeScript",
      "Tailwind CSS",
      
      "CSS",
    ],
  },
  {
    title: "AI Automation",
    description: "LLMs, RAG Systems, & Autonomous AI Agents",
    icon: Bot,
    iconBg: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    barGradient: "from-teal-400 to-emerald-500",
    tags: [
      "OpenAI",
      "LangChain",
      "Vector DBs",
      "RAG Pipelines",
      "FastApi",
      "Gemini",
      "Hugging Face",
    ],
  },
  {
    title: "Databases",
    description:
      "Relational & NoSQL Database Management, Schema Design, & Data Querying",
    icon: Database,
    iconBg: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    barGradient: "from-cyan-400 to-teal-500",
    tags: ["MongoDB", "PostgreSQL", "MySQL", "ChromaDB"],
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.fromTo(
        ".skills-header",
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

      // Skill cards entrance animation
      gsap.fromTo(
        ".skill-card",
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // Skill tag badges stagger reveal
      gsap.fromTo(
        ".skill-tag",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.03,
          ease: "power1.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );

      // Progress bar fill animation
      gsap.fromTo(
        ".skill-progress-bar",
        { width: "0%" },
        {
          width: "66%",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="portfolio-section section min-h-[calc(100vh-64px)] w-full flex items-center justify-center bg-neutral-950 text-white rounded-2xl border border-white/5 my-4"
    >
      <div className="section-content w-full h-full flex justify-center px-6 md:px-12 py-12">
        <div className="section-inner max-w-7xl w-full flex flex-col items-center justify-center space-y-10">
          
          {/* Section Header */}
          <div className="skills-header text-center space-y-3">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Technical{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            <p className="text-neutral-400 text-sm md:text-base max-w-lg mx-auto font-light">
              Technologies I work with to build intelligent solutions.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-center">
            {SKILL_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="skill-card relative p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl flex flex-col justify-between items-center space-y-6 hover:border-emerald-500/40 transition-all duration-300 shadow-xl overflow-hidden group"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${cat.iconBg} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-light px-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2.5 w-full pt-2">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="skill-tag px-3.5 py-1.5 rounded-full bg-neutral-950/80 border border-neutral-800 text-xs font-mono text-neutral-300 hover:border-neutral-600 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="w-full pt-4">
                    <div className="w-full h-1 rounded-full bg-neutral-800 overflow-hidden">
                      <div
                        className={`skill-progress-bar h-full bg-gradient-to-r ${cat.barGradient} rounded-full group-hover:!w-full transition-all duration-500`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}