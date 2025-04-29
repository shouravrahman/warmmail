
import React, { useState, useEffect } from 'react';
import { X, ChevronUp } from 'lucide-react';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  if (!isVisible) return null;
  
  if (isCollapsed) {
    return (
      <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
        <button
          onClick={() => setIsCollapsed(false)}
          className="w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
        >
          <ChevronUp size={20} />
        </button>
      </div>
    );
  }
  
  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isScrolledDown ? 'transform translate-y-0 opacity-100' : 'transform translate-y-20 opacity-0'}`}>
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden w-72">
        <div className="bg-gradient-to-r from-blue-500 to-violet-500 p-3 flex justify-between items-center">
          <h3 className="text-white font-medium">Ready to improve deliverability?</h3>
          <div className="flex space-x-1">
            <button
              onClick={() => setIsCollapsed(true)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Minimize"
            >
              <ChevronUp size={18} />
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">
            Start warming your inbox today with our free 14-day trial.
          </p>
          
          <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition-colors">
            Start Free Trial
          </button>
          
          <div className="mt-3 flex items-center justify-center text-xs text-gray-500">
            <svg className="w-4 h-4 text-emerald-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>No credit card required</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCTA;
