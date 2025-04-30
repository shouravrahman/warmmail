
import React, { useState } from 'react';
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowWarmupWorks = () => {
  const [isVisible, ref] = useIntersectionObserver();
  const [activeDay, setActiveDay] = useState(1);
  
  const days = [
    { day: 1, emails: 5, description: "Start warming with 5 emails/day" },
    { day: 10, emails: 30, description: "Building initial reputation" },
    { day: 20, emails: 100, description: "Increasing sending volume" },
    { day: 30, emails: 200, description: "Ready for serious outreach!" },
  ];
  
  return (
    <section 
      id="how-it-works" 
      ref={ref}
      className={`py-20 bg-white ${isVisible ? "animate-reveal revealed" : "animate-reveal"}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            From Problem to Solution: <span className="text-gradient">How It Works</span>
          </h2>
          <p className="text-lg text-gray-600">
            I built exactly what I needed – nothing more, nothing less. Here's the simple 3-step process:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="relative bg-white rounded-xl shadow-md p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-4 mb-3">Connect your inbox</h3>
            <p className="text-gray-600 mb-4">
              Gmail, Outlook, or custom SMTP. Setup takes just 2 minutes with no technical headaches.
            </p>
            <div className="flex items-center text-sm text-blue-600">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 mr-1" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Simple one-click setup
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="relative bg-white rounded-xl shadow-md p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-4 mb-3">We warm it up</h3>
            <p className="text-gray-600 mb-4">
              WarmUpPilot automatically sends and receives emails, building your sender reputation.
            </p>
            <div className="flex items-center text-sm text-blue-600">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 mr-1" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Fully automated process
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="relative bg-white rounded-xl shadow-md p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-4 mb-3">Your email gets toasty</h3>
            <p className="text-gray-600 mb-4">
              After ~30 days, your email is fully warmed and ready for serious outreach campaigns.
            </p>
            <div className="flex items-center text-sm text-blue-600">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 mr-1" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              200+ emails per day capacity
            </div>
          </div>
        </div>
        
        {/* Timeline visualization */}
        <div className="max-w-4xl mx-auto bg-blue-50 rounded-xl p-6 shadow-md border border-blue-100">
          <h3 className="text-xl font-bold text-center mb-6">Your 30-Day Warming Journey</h3>
          
          <div className="relative h-16 mb-8">
            {/* Timeline bar */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-blue-200 rounded-full transform -translate-y-1/2"></div>
            
            {/* Timeline markers */}
            {days.map((day) => (
              <button
                key={day.day}
                className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all ${
                  activeDay === day.day ? 'scale-125' : 'scale-100'
                }`}
                style={{ left: `${(day.day / 30) * 100}%` }}
                onClick={() => setActiveDay(day.day)}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  activeDay === day.day 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border-2 border-blue-300'
                }`}>
                  {day.day === 30 ? '✓' : ''}
                </div>
                <div className="absolute top-8 text-xs font-medium whitespace-nowrap">
                  Day {day.day}
                </div>
              </button>
            ))}
          </div>
          
          {/* Day details */}
          {days.map((day) => (
            <div 
              key={day.day}
              className={`transition-opacity duration-300 ${
                activeDay === day.day ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            >
              <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-blue-100">
                <div>
                  <h4 className="font-bold text-gray-800">Day {day.day}: {day.description}</h4>
                  <p className="text-sm text-gray-600">
                    {day.day < 30 
                      ? `Your inbox can now handle approximately ${day.emails} emails per day` 
                      : "Congratulations! Your email is now fully warmed up!"}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{day.emails}</div>
                  <div className="text-xs text-gray-500">emails/day</div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-center mt-8">
            <Link to="/register">
              <Button size="lg" className="btn-gradient">
                Start My Warming Journey
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWarmupWorks;
