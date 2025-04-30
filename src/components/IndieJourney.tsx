
import React from 'react';
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const timelineSteps = [
  {
    id: 1,
    title: "The Goal",
    description: "I wanted to try cold outreach for my SaaS product",
    icon: "🎯"
  },
  {
    id: 2,
    title: "The Research",
    description: "Discovered I needed to warm up my professional emails first",
    icon: "🔍"
  },
  {
    id: 3,
    title: "The Problem",
    description: "Found only expensive options ($49+ per month)",
    icon: "💸"
  },
  {
    id: 4,
    title: "The Need",
    description: "Just wanted 2 emails warmed up for about $10/month",
    icon: "💡"
  },
  {
    id: 5,
    title: "The Solution",
    description: "Built my own warm-up tool that just works",
    icon: "🛠️"
  },
  {
    id: 6,
    title: "The Result",
    description: "Now sending 200 emails/day with minimal spam",
    icon: "🚀"
  }
];

const IndieJourney = () => {
  const [isVisible, ref] = useIntersectionObserver();
  const [activeStep, setActiveStep] = React.useState<number>(0);

  return (
    <section 
      id="journey" 
      ref={ref}
      className={`py-20 bg-white ${isVisible ? "animate-reveal revealed" : "animate-reveal"}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why I Built <span className="text-gradient">WarmUpPilot</span>
          </h2>
          <p className="text-lg text-gray-600">
            My journey from frustration to solution
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-100"></div>
          
          {/* Timeline steps */}
          <div className="space-y-8 md:space-y-0">
            {timelineSteps.map((step, index) => (
              <div 
                key={step.id}
                className={`relative ${
                  index % 2 === 0 ? 'md:ml-auto md:mr-[50%] md:pr-12' : 'md:mr-auto md:ml-[50%] md:pl-12'
                } md:w-[42%] transition-all duration-300 group ${
                  activeStep === step.id ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setActiveStep(step.id)}
                onFocus={() => setActiveStep(step.id)}
              >
                <div 
                  className={`p-6 bg-white rounded-xl shadow-md border transition-all duration-300 ${
                    activeStep === step.id 
                      ? 'border-blue-300 shadow-lg' 
                      : 'border-gray-100 hover:border-blue-200 hover:shadow'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{step.icon}</span>
                    <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>

                  {/* Special callouts for key steps */}
                  {step.id === 3 && (
                    <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100 text-amber-700 text-sm">
                      "I couldn't believe they wanted $49 per month PER EMAIL. That would be $100/month just for my two email accounts!"
                    </div>
                  )}
                  
                  {step.id === 5 && (
                    <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-emerald-700 text-sm">
                      "If the big companies can do it for $49/email, I can build something similar for $5/email that works just as well."
                    </div>
                  )}
                </div>
                
                {/* Timeline circle */}
                <div className="hidden md:block absolute top-6 left-0 md:left-auto md:right-0 transform md:translate-x-1/2 w-6 h-6 rounded-full border-4 border-white bg-blue-500 shadow-md"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-xl mx-auto mt-16 text-center p-6 bg-gradient-to-r from-blue-500 to-violet-600 rounded-xl shadow-md text-white">
          <h3 className="text-xl font-bold mb-4">The Bottom Line</h3>
          <p className="text-lg mb-4">
            After one month with WarmUpPilot, my two email accounts could reliably send 200 emails per day with minimal spam. That's 6,000 emails monthly!
          </p>
          <div className="flex justify-center">
            <a href="#pricing" className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors">
              See How Much You Could Save
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndieJourney;
