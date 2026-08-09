"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { ArrowRight } from "lucide-react";

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Skip GSAP initialization entirely on mobile devices (< 768px)
    if (window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger, Flip);

    let flipCtx: gsap.Context | null = null;

    const createTween = () => {
      const galleryElement = document.querySelector("#gallery-8");
      if (!galleryElement) return;
      const galleryItems = galleryElement.querySelectorAll(".gallery__item");

      if (flipCtx) flipCtx.revert();
      galleryElement.classList.remove("gallery--final");

      flipCtx = gsap.context(() => {
        galleryElement.classList.add("gallery--final");
        const flipState = Flip.getState(galleryItems);
        galleryElement.classList.remove("gallery--final");

        const flip = Flip.to(flipState, {
          simple: true,
          ease: "expoScale(1, 5)",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: galleryElement,
            start: "center center",
            end: "+=120%",
            scrub: true,
            pin: galleryElement.parentElement,
            invalidateOnRefresh: true,
          },
        });

        tl.add(flip);
      }, containerRef);
    };

    createTween();
    window.addEventListener("resize", createTween);

    return () => {
      window.removeEventListener("resize", createTween);
      if (flipCtx) flipCtx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="portfolio-section bg-[#000000] text-white w-full min-h-screen relative overflow-hidden flex flex-col justify-center"
    >
      {/* Top Header for Context */}
      <div className="pt-16 pb-8 text-center space-y-2 px-6 max-w-3xl mx-auto z-10 relative">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          Featured{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Work
          </span>
        </h2>
        <p className="text-neutral-400 text-xs md:text-sm font-light">
          <span className="hidden md:inline">
            Scroll down to experience the bento gallery zoom animation into our flagship platform.
          </span>
          <span className="md:hidden">Explore our flagship autonomous AI platform.</span>
        </p>
      </div>

      {/* MOBILE VIEW (< 768px): Only display clean static card for The Axora without GSAP */}
      <div className="md:hidden px-6 py-4 max-w-md mx-auto w-full space-y-6 z-10">
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative h-48 w-full">
            <img
              src="/axora/axora.png"
              alt="The Axora AI Platform"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/90 px-2 py-1 rounded border border-emerald-800">
                Flagship Platform
              </span>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-white">
              The Axora
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed font-light">
              Autonomous AI chat and voice assistants engineered to convert raw web traffic into confirmed customer appointments 24/7, coupled with custom, premium web applications.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs font-mono text-neutral-400 border-t border-neutral-800">
              <span>
                🌐{" "}
                <a
                  href="https://www.theaxora.com"
                  target="_blank"
                  className="text-emerald-400 hover:underline"
                >
                  www.theaxora.com
                </a>
              </span>
            </div>
            <div className="pt-2">
              <Link
                href="https://www.theaxora.com"
                target="_blank"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                Visit Website <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW (>= 768px): Full interactive Bento Gallery and GSAP animation */}
      <div className="hidden md:block">
        <div className="gallery-wrap">
          <div className="gallery gallery--bento gallery--switch" id="gallery-8">
            <div className="gallery__item">
              <img src="/plant/plant.jpeg" alt="Project Image 1" />
            </div>
            <div className="gallery__item">
              <img src="/faq/faq.PNG" alt="Project Image 2" />
            </div>
            <div className="gallery__item relative group">
              <img src="/axora/axora.png" alt="The Axora AI Platform" />
              <div className="absolute inset-0 bg-emerald-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"></div>
            </div>
            <div className="gallery__item">
              <img src="/DineX/dinex.png" alt="Project Image 4" />
            </div>
            <div className="gallery__item">
              <img src="/Dental/dental.png" alt="Project Image 5" />
            </div>
            <div className="gallery__item">
              <img src="/deepfake/deepfake.PNG" alt="Project Image 6" />
            </div>
            <div className="gallery__item">
              <img src="/cv/ai1.PNG" alt="Project Image 7" />
            </div>
            <div className="gallery__item">
              <img src="/clinic/clinic.PNG" alt="Project Image 8" />
            </div>
          </div>
        </div>

        <div className="section max-w-4xl mx-auto space-y-6">
          <div className="space-y-2 border-b border-neutral-800 pb-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              The Axora (
              <a
                href="https://www.theaxora.com"
                target="_blank"
                className="text-emerald-400 hover:underline"
              >
                www.theaxora.com
              </a>
              )
            </h2>
            <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
              Autonomous AI chat and voice assistants engineered to convert raw web traffic into confirmed customer appointments 24/7, coupled with custom, premium web applications. Built for high-performance businesses seeking seamless automation and elite frontend experiences.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-800 text-xs font-mono text-neutral-400">
            <span>
              🌐 Live Platform:{" "}
              <a
                href="https://www.theaxora.com"
                target="_blank"
                className="text-emerald-400 hover:underline"
              >
                www.theaxora.com
              </a>
            </span>
            <span>
              📧 Direct Contact:{" "}
              <a href="mailto:hello@theaxora.com" className="text-emerald-400 hover:underline">
                hello@theaxora.com
              </a>
            </span>
            <Link
              href="https://www.theaxora.com"
              target="_blank"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Visit Website <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx global>{`
        .gallery-wrap {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .gallery {
          position: relative;
          width: 100%;
          height: 100%;
          flex: none;
        }

        .gallery__item {
          background-position: 50% 50%;
          background-size: cover;
          flex: none;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
        }

        .gallery__item img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .gallery--bento {
          display: grid;
          gap: 1vh;
          grid-template-columns: repeat(3, 32.5vw);
          grid-template-rows: repeat(4, 23vh);
          justify-content: center;
          align-content: center;
        }

        .gallery--final.gallery--bento {
          grid-template-columns: repeat(3, 100vw);
          grid-template-rows: repeat(4, 49.5vh);
          gap: 1vh;
        }

        .gallery--bento .gallery__item:nth-child(1) {
          grid-area: 1 / 1 / 3 / 2;
        }

        .gallery--bento .gallery__item:nth-child(2) {
          grid-area: 1 / 2 / 2 / 3;
        }

        .gallery--bento .gallery__item:nth-child(3) {
          grid-area: 2 / 2 / 4 / 3;
        }

        .gallery--bento .gallery__item:nth-child(4) {
          grid-area: 1 / 3 / 3 / 3;
        }

        .gallery--bento .gallery__item:nth-child(5) {
          grid-area: 3 / 1 / 3 / 2;
        }

        .gallery--bento .gallery__item:nth-child(6) {
          grid-area: 3 / 3 / 5 / 4;
        }

        .gallery--bento .gallery__item:nth-child(7) {
          grid-area: 4 / 1 / 5 / 2;
        }

        .gallery--bento .gallery__item:nth-child(8) {
          grid-area: 4 / 2 / 5 / 3;
        }

        .section {
          padding: 3rem 2rem 5rem 2rem;
        }

        @media (min-width: 768px) {
          .section {
            padding: 3rem 5rem 6rem 5rem;
          }
        }
      `}</style>
    </section>
  );
}