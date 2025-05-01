
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const IndieHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const emailIconRef = useRef<HTMLDivElement>(null);
  const dollarIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !emailIconRef.current || !dollarIconRef.current) return;

      // Get mouse position relative to container
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - left;
      const mouseY = e.clientY - top;

      // Calculate position as percentage
      const xPercent = mouseX / width;
      const yPercent = mouseY / height;

      // Apply subtle movement to elements
      emailIconRef.current.style.transform = `translate(${xPercent * 20 - 10}px, ${yPercent * 20 - 10}px)`;
      dollarIconRef.current.style.transform = `translate(${-xPercent * 15 + 7.5}px, ${-yPercent * 15 + 7.5}px)`;
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl">
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium animate-bounce-light">
              Built by an indie hacker, for indie hackers
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              I Needed Warm Emails. <span className="text-gradient">Not a Warm Wallet.</span>
            </h1>
            <p className="text-lg text-gray-600">
              I built WarmUpPilot because $49/month was too much for warming up 2 emails. Now you can do it for just $10/month.
            </p>

            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-blue-100 shadow-sm">
              <p className="text-gray-700 italic text-sm">
                <span className="font-semibold">"As an indie hacker, every dollar counts.</span> That's why I created the email warm-up tool I wish existed."
              </p>
              <div className="flex items-center mt-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                  DC
                </div>
                <div className="ml-2">
                          <div className="text-sm font-medium">Shourav Rahman</div>
                  <div className="text-xs text-gray-500">Creator, WarmUpPilot</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="btn-gradient text-base">
                  Start Free Trial
                </Button>
              </Link>
              <a href="#journey">
                <Button size="lg" variant="outline" className="text-base group">
                  See My Journey
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>

            <div className="flex items-center text-sm text-gray-500 pt-2">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-emerald-500 mr-2">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
              No credit card required for free trial
            </div>
          </div>

          <div className="relative h-full flex items-center justify-center">
            {/* Background effects */}
            <div className="absolute w-72 h-72 bg-blue-300/20 rounded-full filter blur-xl animate-pulse"></div>
            <div className="absolute w-48 h-48 bg-violet-300/20 rounded-full filter blur-xl animate-pulse" style={{ animationDelay: '1s', left: '25%', top: '15%' }}></div>

            {/* Comparison visualization */}
            <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200 max-w-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">The Simple Math</h3>

              {/* Competitor pricing */}
              <div className="flex items-center mb-6 p-4 bg-red-50 rounded-lg border border-red-100 relative">
                <div ref={dollarIconRef} className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mr-4 transition-transform duration-300 ease-out">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-800 font-medium">Competitors:</div>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold text-gray-800">$98</span>
                    <span className="text-gray-600 ml-1">/month</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    2 emails × $49 each
                  </div>
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* WarmUpPilot pricing */}
              <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100 relative">
                <div ref={emailIconRef} className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-4 transition-transform duration-300 ease-out">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-800 font-medium">WarmUpPilot:</div>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold text-blue-600">$10</span>
                    <span className="text-gray-600 ml-1">/month</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    2 emails × $5 each
                  </div>
                </div>
              </div>

              {/* Savings highlight */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-800 font-medium">You save:</div>
                    <div className="text-xl font-bold text-green-600">$88/month</div>
                  </div>
                  <div className="bg-white px-3 py-1 rounded-full text-green-600 font-bold text-lg border border-green-200">
                    90% OFF
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  That's <span className="font-medium">$1,056 yearly savings</span> with the same warming results
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated wave at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#FFFFFF" className="w-full h-auto">
          <path d="M0,96L60,85.3C120,75,240,53,360,53.3C480,53,600,75,720,85.3C840,96,960,96,1080,85.3C1200,75,1320,53,1380,42.7L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" className="transition-transform duration-300 ease-out"></path>
        </svg>
      </div>
    </div>
  );
};

export default IndieHero;
