"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { allProjects } from "@/data/projectsdata";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const projectId = Number(params.id);
  const project = allProjects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-white bg-neutral-950 px-6">
        <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
        <p className="text-neutral-400 mb-4">
          The project you are looking for does not exist or has been removed.
        </p>
        <Link href="/#projects" className="text-emerald-400 font-semibold hover:underline">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const galleryImages =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.image];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 py-12 px-6 md:px-12 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => router.back()}
          className="text-emerald-400 text-sm font-semibold hover:text-emerald-300 transition-colors mb-8 inline-flex items-center"
        >
          ← Back
        </button>

        {/* Header Section */}
        <header className="mb-10">
          <span className="inline-block text-xs font-bold text-emerald-400 tracking-wider uppercase mb-2">
            {project.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-lg text-neutral-400 leading-relaxed mb-6">
              {project.subtitle}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Main Cover Image */}
        <div className="relative w-full h-[300px] sm:h-[450px] rounded-2xl overflow-hidden mb-12 border border-neutral-800 bg-neutral-900">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Detailed Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Main Content (8 cols) */}
          <div className="md:col-span-8 space-y-10">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
                Overview
              </h2>
              <p className="leading-relaxed text-neutral-300 text-base">
                {project.description}
              </p>
            </section>

            {project.workflow && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
                  System Architecture & Workflow
                </h2>
                <p className="leading-relaxed text-neutral-300 text-base">
                  {project.workflow}
                </p>
              </section>
            )}

            {project.features && project.features.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
                  Key Features & Implementation
                </h2>
                <ul className="list-disc list-inside space-y-3 text-neutral-300 text-base leading-relaxed">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="marker:text-emerald-400">
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Gallery Section */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-2">
                Project Gallery
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {galleryImages.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className="relative h-28 rounded-lg overflow-hidden border border-neutral-800 cursor-pointer group transition-all duration-200 hover:scale-[1.02] hover:border-emerald-400"
                  >
                    <Image
                      src={imgSrc}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover group-hover:brightness-110"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar (4 cols) */}
          <aside className="md:col-span-4 space-y-6">
            {project.impact && (
              <div className="bg-neutral-900/80 border border-neutral-800 p-6 rounded-xl space-y-2">
                <h3 className="text-lg font-bold text-white">Impact & Outcome</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {project.impact}
                </p>
              </div>
            )}

            {project.link && project.link !== "#" && (
              <div className="bg-neutral-900/80 border border-neutral-800 p-6 rounded-xl space-y-4">
                <h3 className="text-lg font-bold text-white">Live Demonstration</h3>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 bg-emerald-400 text-neutral-950 font-bold rounded-lg hover:bg-emerald-300 transition-colors text-sm"
                >
                  Visit Application ↗
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setActiveImageIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-emerald-400 transition-colors"
            >
              ✕
            </button>
            <div className="relative w-full h-[70vh]">
              <Image
                src={galleryImages[activeImageIndex]}
                alt="Enlarged preview"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}