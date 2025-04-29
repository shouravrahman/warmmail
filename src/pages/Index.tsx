
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustLogos from "@/components/TrustLogos";
import Benefits from "@/components/Benefits";
import EmailJourney from "@/components/EmailJourney";
import HowItWorks from "@/components/HowItWorks";
import InboxHealth from "@/components/InboxHealth";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Index = () => {
  useEffect(() => {
    // Add intersection observer to reveal elements as they come into view
    const animatedElements = document.querySelectorAll('.animate-reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach((el) => observer.observe(el));
    
    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <TrustLogos />
        <Benefits />
        <EmailJourney />
        <HowItWorks />
        <InboxHealth />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
