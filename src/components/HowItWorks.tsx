
import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";

interface TimelineStepProps {
  number: number;
  title: string;
  description: string;
  isActive: boolean;
  isComplete: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

const TimelineStep: React.FC<TimelineStepProps> = ({
  number,
  title,
  description,
  isActive,
  isComplete,
  onClick,
  icon
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className={`relative ${isMobile ? 'mb-12' : ''} transition-all duration-300 ${isActive ? 'scale-105' : ''}`}
      onClick={onClick}
    >
      {/* Timeline connector (vertical on mobile, horizontal on desktop) */}
      {!isMobile && !isComplete && (
        <div className="absolute top-1/2 -right-full transform translate-x-[-8px] h-0.5 bg-gray-200 w-full z-0"></div>
      )}
      {isMobile && (
        <div className="absolute top-full left-8 transform translate-y-[-8px] w-0.5 bg-gray-200 h-12 z-0"></div>
      )}
      
      <div className={`relative ${isMobile ? '' : 'px-4'} cursor-pointer group`}>
        {/* Step marker */}
        <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center border-2 transition-colors duration-300 ${
          isComplete ? 'bg-emerald-500 border-emerald-500' : 
          isActive ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-300'
        }`}>
          <div className={`transition-opacity duration-300 ${isComplete ? 'opacity-0 absolute' : 'opacity-100'}`}>
            {icon}
          </div>
          
          {isComplete && (
            <svg className="w-8 h-8 text-white absolute animate-scale-in" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        
        {/* Content */}
        <div className={`max-w-xs ${isMobile ? '' : 'text-center'}`}>
          <p className={`text-sm font-medium transition-colors duration-300 ${
            isComplete ? 'text-emerald-500' : isActive ? 'text-blue-500' : 'text-gray-400'
          }`}>
            Step {number}
          </p>
          <h3 className="text-lg font-bold text-gray-800 mt-1 mb-2">{title}</h3>
          
          <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-40' : 'max-h-0'}`}>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
          
          <p className={`text-sm text-blue-500 mt-2 group-hover:underline ${isActive ? 'hidden' : 'block'}`}>
            {isComplete ? 'Review' : 'Learn more'}
          </p>
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % steps.length;
        if (prev !== next && !completedSteps.includes(prev)) {
          setCompletedSteps((prevCompleted) => [...prevCompleted, prev]);
        }
        return next;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [completedSteps]);
  
  const steps = [
    {
      title: "Connect your inbox",
      description: "Securely connect your email account with just a few clicks. We support Gmail, Outlook, and custom SMTP setups.",
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Configure settings",
      description: "Choose your warming speed, volume, and engagement targets based on your deliverability goals.",
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      title: "Automatic warming",
      description: "Our system begins exchanging emails with our network, building your reputation gradually with email providers.",
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: "Monitor progress",
      description: "Track your deliverability improvements through our detailed dashboard with real-time metrics and reporting.",
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Start sending campaigns",
      description: "Once your reputation is established, start sending your real email campaigns with confidence.",
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How Email Warming <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-gray-600">
            A simple 5-step process that improves your email deliverability without any technical hassle.
          </p>
        </div>
        
        <div 
          ref={timelineRef}
          className={`${isMobile ? 'flex flex-col items-start max-w-md mx-auto' : 'flex justify-between items-start'} mb-8`}
        >
          {steps.map((step, index) => (
            <TimelineStep
              key={index}
              number={index + 1}
              title={step.title}
              description={step.description}
              isActive={activeStep === index}
              isComplete={completedSteps.includes(index)}
              onClick={() => setActiveStep(index)}
              icon={step.icon}
            />
          ))}
        </div>
        
        <div className="max-w-2xl mx-auto mt-16 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-6 mb-4 md:mb-0">
              <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to start warming?</h3>
              <p className="text-gray-600 mb-4">
                Most users see significant deliverability improvements within 2-3 weeks of consistent warming.
              </p>
              <button className="btn-primary">Start Free Trial</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
