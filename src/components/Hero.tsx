
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<SVGPathElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Get mouse position relative to container
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - left;
      const mouseY = e.clientY - top;
      
      // Calculate position as percentage
      const xPercent = mouseX / width;
      const yPercent = mouseY / height;
      
      // Apply subtle movement to the envelope
      if (envelopeRef.current) {
        envelopeRef.current.style.transform = `translate(${xPercent * 10 - 5}px, ${yPercent * 10 - 5}px)`;
      }
      
      // Apply subtle movement to the wave
      if (wavePathRef.current) {
        wavePathRef.current.style.transform = `translateX(${xPercent * 15 - 7.5}px)`;
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden pt-16" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 max-w-xl">
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium animate-bounce-light">
              Increase Email Deliverability by 45%+
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Never Land in <span className="text-gradient">Spam</span> Again
            </h1>
            <p className="text-lg text-gray-600">
              Warm up your inbox the smart way – automatic, human-like email engagement that improves your deliverability. Free to start. No shady tactics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-gradient text-base">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-base group">
                See How It Works
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="flex items-center text-sm text-gray-500 pt-2">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-emerald-500 mr-2">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
              No credit card required for free trial
            </div>
          </div>
          
          <div className="relative h-96 flex items-center justify-center">
            <div className="absolute w-72 h-72 bg-blue-300/20 rounded-full filter blur-xl animate-pulse"></div>
            <div className="absolute w-48 h-48 bg-violet-300/20 rounded-full filter blur-xl animate-pulse" style={{ animationDelay: '1s', left: '25%', top: '15%' }}></div>
            
            <svg viewBox="0 0 300 300" width="100%" height="100%" className="relative z-10">
              {/* Envelope */}
              <g ref={envelopeRef} className="transition-transform duration-300 ease-out">
                <rect x="75" y="100" width="150" height="100" rx="8" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="4" />
                <path d="M75 120 L150 170 L225 120" stroke="#3B82F6" strokeWidth="4" fill="none" />
                <path d="M75 200 L130 150" stroke="#3B82F6" strokeWidth="4" fill="none" />
                <path d="M225 200 L170 150" stroke="#3B82F6" strokeWidth="4" fill="none" />
              </g>
              
              {/* Radiating waves */}
              <circle cx="150" cy="150" r="50" fill="none" stroke="#60A5FA" strokeWidth="2" strokeDasharray="5 5" className="opacity-70 animate-pulse" />
              <circle cx="150" cy="150" r="70" fill="none" stroke="#60A5FA" strokeWidth="2" strokeDasharray="5 5" className="opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <circle cx="150" cy="150" r="90" fill="none" stroke="#60A5FA" strokeWidth="2" strokeDasharray="5 5" className="opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Deliverability indicator */}
              <g transform="translate(215, 90)">
                <circle cx="0" cy="0" r="20" fill="#10B981" className="animate-pulse" />
                <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10" fontWeight="bold">95%</text>
                <text x="0" y="25" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="bold">DELIVERABILITY</text>
              </g>
              
              {/* Spam indicator crossed out */}
              <g transform="translate(85, 90)">
                <circle cx="0" cy="0" r="20" fill="#EF4444" className="opacity-50" />
                <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10" fontWeight="bold">SPAM</text>
                <line x1="-15" y1="-15" x2="15" y2="15" stroke="white" strokeWidth="3" />
                <text x="0" y="25" textAnchor="middle" fill="#EF4444" fontSize="8" fontWeight="bold">AVOIDED</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Animated wave at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#FFFFFF" className="w-full h-auto">
          <path ref={wavePathRef} d="M0,96L60,85.3C120,75,240,53,360,53.3C480,53,600,75,720,85.3C840,96,960,96,1080,85.3C1200,75,1320,53,1380,42.7L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" className="transition-transform duration-300 ease-out"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
