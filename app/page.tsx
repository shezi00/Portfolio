import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Services";
import RecentProjects from "@/components/RecentProjects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhyChooseMe from "@/components/WhyChooseMe";

export default function PortfolioPage() {
  return (
    <main className="bg-[#FAFAF8] text-neutral-900 min-h-screen selection:bg-violet-500 selection:text-white pt-0 mt-0 w-full overflow-x-clip">
      <Navbar />

      <div className="slides-wrapper pt-0 mt-0 w-full">
        <Hero />
        <About />
        <Skills />
        <RecentProjects />
        <WhyChooseMe />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}