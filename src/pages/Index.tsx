import { useState } from "react";
import Navbar from "@/components/Navbar";
import FloatingShapes from "@/components/FloatingShapes";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import BuilderSection from "@/components/BuilderSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ResumeModal from "@/components/ResumeModal";
import ThemeCursorFollower from "@/components/ThemeCursorFollower";
import ThemeCustomizer from "@/components/ThemeCustomizer";

const Index = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden">
      <ThemeCursorFollower />
      <FloatingShapes />
      <Navbar onViewResume={() => setIsResumeOpen(true)} />
      <main className="relative z-10">
        <HeroSection onViewResume={() => setIsResumeOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <BuilderSection />
        <ContactSection />
      </main>
      <Footer />
      <ThemeCustomizer />
      <ResumeModal isOpen={isResumeOpen} onOpenChange={setIsResumeOpen} />
    </div>
  );
};

export default Index;
