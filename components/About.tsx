"use client";

import React, { useRef, useEffect } from "react";
import {
  Sparkles,
  Cpu,
  Layers,
  GraduationCap,
  Code2,
  MapPin,
} from "lucide-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 6;
    const rotateX = -((y - centerY) / centerY) * 6;

    gsap.to(card, {
      rotateY,
      rotateX,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Ambient pulsing background glow inside cards
      gsap.to(".card-glow", {
        scale: 1.3,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.easeInOut",
        stagger: 0.5,
      });

      // 2. SplitText Header animation
      if (headerRef.current) {
        const split = new SplitText(headerRef.current, { type: "chars" });
        const chars = split.chars as HTMLElement[];
        gsap.set(chars, { yPercent: 100, opacity: 0 });
        gsap.to(chars, {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.03,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        });
      }

      // 3. Subheader / badge entrance
      gsap.fromTo(
        ".about-badge",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );

      // 4. Staggered card entrance with 3D scale/rotation
      gsap.fromTo(
        ".about-card",
        { y: 60, opacity: 0, scale: 0.94, rotationX: 10 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="portfolio-section section min-h-[calc(100vh-64px)] w-full flex items-center justify-center bg-neutral-900/90 text-white rounded-2xl border border-white/5 my-4 backdrop-blur-lg"
    >
      <div className="section-content w-full h-full flex justify-center px-6 md:px-16 py-12">
        <div className="section-inner max-w-6xl w-full flex flex-col justify-center space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <p className="about-badge text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get To Know Me</span>
            </p>
            <h2
              ref={headerRef}
              className="text-4xl md:text-5xl font-extrabold tracking-tight overflow-hidden pb-1"
            >
              About Me
            </h2>
          </div>

          {/* About Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch text-left">
            
            {/* Card 1: Expertise */}
            <div
              ref={card1Ref}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="about-card relative group p-8 rounded-3xl bg-neutral-950/60 border border-neutral-800/90 backdrop-blur-xl flex flex-col justify-between space-y-6 hover:border-emerald-500/50 transition-colors duration-500 overflow-hidden shadow-2xl cursor-default"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="card-glow absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500 pointer-events-none" />

              <div className="space-y-6 z-10">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-neutral-500 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/80">
                    Core Expertise
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
                  Building Intelligent Digital Products
                </h3>

                <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-light">
                  I design and develop AI-powered applications and modern
                  full-stack solutions that help businesses automate
                  processes, improve customer experiences, and unlock new
                  opportunities.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 z-10">
                <div className="flex items-start gap-3">
                  <Layers className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                    I build everything from intelligent chatbots and document
                    Q&A systems to scalable web applications and AI-driven
                    business tools.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Education */}
            <div
              ref={card2Ref}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="about-card relative group p-8 rounded-3xl bg-neutral-950/60 border border-neutral-800/90 backdrop-blur-xl flex flex-col justify-between space-y-6 hover:border-teal-500/50 transition-colors duration-500 overflow-hidden shadow-2xl cursor-default"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="card-glow absolute -bottom-24 -right-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all duration-500 pointer-events-none" />

              <div className="space-y-6 z-10">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-neutral-500 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/80">
                    Academic Background
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Education
                </h3>

                <div className="space-y-2 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/60">
                  <h4 className="text-lg font-semibold text-emerald-400 leading-snug">
                    Capital University of Science and Technology (CUST)
                  </h4>
                  <p className="text-neutral-200 text-sm font-medium flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-neutral-400" />
                    Bachelors of Computer Science
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80 text-xs font-mono text-neutral-400 z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                  2023 - 2027
                </span>
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" /> Islamabad,
                  Pakistan
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}