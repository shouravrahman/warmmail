
import React from 'react';
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FounderNote = () => {
  const [isVisible, ref] = useIntersectionObserver();
  
  return (
    <section 
      id="founder-note" 
      ref={ref}
      className={`py-20 bg-gray-50 ${isVisible ? "animate-reveal revealed" : "animate-reveal"}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 bg-gradient-to-br from-blue-600 to-violet-600 text-white p-8 md:w-64 flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">David Campbell</h3>
              <p className="text-blue-200">Indie Hacker & Creator of WarmUpPilot</p>
            </div>
            
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                From one indie hacker to another
              </h2>
              
              <div className="prose text-gray-600">
                <p>
                  I built WarmUpPilot because I couldn't justify spending $50+ monthly just to warm up two email accounts. I needed something affordable that just worked, without all the enterprise bloat.
                </p>
                <p>
                  This tool helped me successfully send 6,000 emails monthly with minimal spam issues. It can do the same for you.
                </p>
                <p className="font-medium">
                  If you're like me – bootstrapping, cost-conscious, but unwilling to compromise on deliverability – give WarmUpPilot a try. If it doesn't work for you, I'll refund you immediately. No questions asked.
                </p>
              </div>
              
              <div className="flex items-center mt-6">
                <svg viewBox="0 0 100 24" className="h-8 text-blue-500">
                  {[...Array(5)].map((_, i) => (
                    <path
                      key={i}
                      fill="currentColor"
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      transform={`translate(${i * 20}, 0)`}
                    />
                  ))}
                </svg>
                <span className="ml-2 text-sm text-gray-500">
                  Based on 50+ indie hackers using WarmUpPilot
                </span>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="btn-gradient w-full sm:w-auto">
                    Start Free Trial
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderNote;
