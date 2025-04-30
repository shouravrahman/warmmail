
import React from 'react';
import Navbar from "@/components/Navbar";
import IndieHero from "@/components/IndieHero";
import IndieJourney from "@/components/IndieJourney";
import ValueCalculator from "@/components/ValueCalculator";
import HowWarmupWorks from "@/components/HowWarmupWorks";
import WhatYouGet from "@/components/WhatYouGet";
import TestimonialsIndieHackers from "@/components/TestimonialsIndieHackers";
import IndiePricing from "@/components/IndiePricing";
import IndieFAQ from "@/components/IndieFAQ";
import FounderNote from "@/components/FounderNote";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  React.useEffect(() => {
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
        <IndieHero />
        <IndieJourney />
        <ValueCalculator />
        <HowWarmupWorks />
        <WhatYouGet />
        <TestimonialsIndieHackers />
        <IndiePricing />
        <IndieFAQ />
        <FounderNote />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
