
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

const EmailJourney = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showComparison, setShowComparison] = useState(false);
  const emailIconRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const animationRef = useRef<number | null>(null);
  
  // Path animation
  useEffect(() => {
    if (!isPlaying) return;
    
    const email = emailIconRef.current;
    const path = pathRef.current;
    
    if (!email || !path) return;
    
    let progress = 0;
    const duration = 4000; // 4 seconds
    const start = performance.now();
    
    const length = path.getTotalLength();
    
    const animate = (time: number) => {
      if (!isPlaying) return;
      
      const elapsed = time - start;
      progress = Math.min(elapsed / duration, 1);
      
      // Get point at progress
      const point = path.getPointAtLength(progress * length);
      
      // Update email position
      email.setAttribute('transform', `translate(${point.x}, ${point.y}) scale(0.5)`);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Reset animation when complete
        setTimeout(() => {
          progress = 0;
          animationRef.current = requestAnimationFrame(animate);
        }, 500);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            See How Emails <span className="text-gradient">Actually Travel</span>
          </h2>
          <p className="text-lg text-gray-600">
            Watch what happens to your emails and how warming prevents them from landing in spam.
          </p>
        </div>
        
        <div className="relative h-[400px] bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
          {/* Animation Container */}
          <svg viewBox="0 0 1000 400" className="w-full h-full">
            {/* Base paths */}
            <path 
              d="M100,200 C200,100 400,300 600,150 C800,50 900,200 900,200" 
              stroke="#E5E7EB" 
              strokeWidth="6" 
              strokeLinecap="round" 
              fill="none"
              strokeDasharray="5,5"
            />
            
            {/* Animated path */}
            <path 
              ref={pathRef}
              d="M100,200 C200,100 400,300 600,150 C800,50 900,200 900,200" 
              stroke={showComparison ? "#EF4444" : "#3B82F6"} 
              strokeWidth="6" 
              strokeLinecap="round" 
              fill="none"
              strokeDasharray="1000"
              strokeDashoffset="0"
              className="transition-colors duration-500"
            />
            
            {/* Email icon */}
            <g ref={emailIconRef} transform="translate(100, 200) scale(0.5)" className="transition-transform duration-300">
              <rect x="-20" y="-15" width="40" height="30" rx="2" fill={showComparison ? "#EF4444" : "#3B82F6"} className="transition-colors duration-500" />
              <path d="M-20,-15 L0,0 L20,-15" stroke="white" strokeWidth="2" fill="none" />
            </g>
            
            {/* Obstacles */}
            <g className={`transition-opacity duration-500 ${showComparison ? 'opacity-100' : 'opacity-30'}`}>
              <circle cx="300" cy="220" r="20" fill="#F59E0B" fillOpacity="0.8" />
              <text x="300" y="220" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">FILTER</text>
              
              <circle cx="500" cy="180" r="25" fill="#EF4444" fillOpacity="0.8" />
              <text x="500" y="180" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">SPAM</text>
              
              <circle cx="700" cy="120" r="15" fill="#F59E0B" fillOpacity="0.8" />
              <text x="700" y="120" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">AUTH</text>
            </g>
            
            {/* Inbox destination */}
            <g className="transition-opacity duration-500" opacity={showComparison ? "0.5" : "1"}>
              <rect x="880" y="180" width="40" height="40" rx="4" fill={showComparison ? "#EF4444" : "#10B981"} fillOpacity="0.2" stroke={showComparison ? "#EF4444" : "#10B981"} strokeWidth="2" />
              <text x="900" y="205" textAnchor="middle" fill={showComparison ? "#EF4444" : "#10B981"} fontSize="10" fontWeight="bold">INBOX</text>
            </g>
            
            {/* Email source */}
            <g>
              <rect x="80" y="180" width="40" height="40" rx="4" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
              <text x="100" y="205" textAnchor="middle" fill="#3B82F6" fontSize="10" fontWeight="bold">SENDER</text>
            </g>
            
            {/* Legend */}
            <g transform="translate(100, 350)">
              <rect x="0" y="0" width="15" height="15" fill="#3B82F6" />
              <text x="20" y="12" fontSize="12" fill="#3B82F6">Warmed Email</text>
              
              <rect x="120" y="0" width="15" height="15" fill="#EF4444" />
              <text x="140" y="12" fontSize="12" fill="#EF4444">Cold Email</text>
            </g>
          </svg>
          
          {/* Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
            <Button 
              variant={isPlaying ? "outline" : "default"} 
              onClick={togglePlay} 
              size="sm"
              className="bg-white"
            >
              {isPlaying ? 'Pause' : 'Play'} Animation
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowComparison(!showComparison)} 
              size="sm"
              className={`${showComparison ? 'border-red-300 text-red-700' : 'border-blue-300 text-blue-700'} bg-white`}
            >
              {showComparison ? 'Show Warmed' : 'Show Cold'}
            </Button>
          </div>
        </div>
        
        <div className="mt-8 max-w-2xl mx-auto bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="ml-3 text-sm text-blue-800">
              {showComparison 
                ? "Without warming, emails often hit spam filters and authentication barriers, reducing deliverability by up to 55%." 
                : "With proper warming, your emails establish trust with filters and gain priority routing to the primary inbox."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailJourney;
