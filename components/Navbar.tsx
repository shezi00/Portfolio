"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto">
      <nav className="flex items-center gap-6 px-6 py-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl">
        <div className="flex items-center gap-5 text-xs font-medium text-neutral-300">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="hover:text-white transition-colors uppercase tracking-widest"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}