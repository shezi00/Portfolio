"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function PortfolioPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".portfolio-section");
      const panelsToAnimate = panels.slice(0, -1);

      panelsToAnimate.forEach((panel) => {
        const innerPanel = panel.querySelector(".section-inner") as HTMLElement;
        if (!innerPanel) return;

        const panelHeight = innerPanel.offsetHeight;
        const windowHeight = window.innerHeight;
        const difference = panelHeight - windowHeight;

        const fakeScrollRatio =
          difference > 0 ? difference / (difference + windowHeight) : 0;

        if (fakeScrollRatio) {
          panel.style.marginBottom = `${panelHeight * fakeScrollRatio}px`;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "bottom bottom",
            end: () =>
              fakeScrollRatio ? `+=${innerPanel.offsetHeight}` : "bottom top",
            pinSpacing: false,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        if (fakeScrollRatio) {
          tl.to(innerPanel, {
            yPercent: -100,
            y: window.innerHeight,
            duration: 1 / (1 - fakeScrollRatio) - 1,
            ease: "none",
          });
        }

        tl.fromTo(
          panel,
          { scale: 1, opacity: 1 },
          { scale: 0.7, opacity: 0.5, duration: 0.9 }
        ).to(panel, { opacity: 0, duration: 0.1 });
      });

      gsap.fromTo(
        ".about-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".skill-card",
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#skills",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".project-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#projects",
            start: "top 80%",
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#000000] text-white min-h-screen selection:bg-emerald-500 selection:text-black">
      <Navbar />

      <div ref={wrapperRef} className="slides-wrapper pt-16">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}