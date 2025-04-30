
import React from 'react';
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface FeatureCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  enterpriseDetails: string;
  simplicity: string;
}

const WhatYouGet = () => {
  const [isVisible, ref] = useIntersectionObserver();
  const [flippedCard, setFlippedCard] = React.useState<number | null>(null);
  
  const features: FeatureCard[] = [
    {
      id: 1,
      title: "Automatic Warm-up Messages",
      description: "Set it up once and let the system automatically send and respond to warm-up emails.",
      icon: "📧",
      enterpriseDetails: "Complex configuration options, AI templates, and advanced strategies you'll never use.",
      simplicity: "Simple setup and automatic handling without overwhelming options."
    },
    {
      id: 2,
      title: "Simple Deliverability Tracking",
      description: "Clear metrics showing inbox placement rates and overall warming progress.",
      icon: "📊",
      enterpriseDetails: "Dozens of confusing metrics, complex reports, and data overload.",
      simplicity: "Only the metrics that matter: inbox placement and warming progress."
    },
    {
      id: 3,
      title: "Wide Email Provider Support",
      description: "Works with Gmail, Outlook, and any provider supporting SMTP/IMAP.",
      icon: "🔌",
      enterpriseDetails: "Integration requirements, API setup, and technical complexity.",
      simplicity: "Simple connection for Gmail, Outlook, or custom SMTP in just 2 minutes."
    },
    {
      id: 4,
      title: "'Set It & Forget It' Process",
      description: "Start the process and come back in 30 days to a fully warmed inbox.",
      icon: "⏰",
      enterpriseDetails: "Constant monitoring, manual interventions, and constant adjustments.",
      simplicity: "True automation with no ongoing maintenance required."
    },
    {
      id: 5,
      title: "200+ Email/Day Capacity",
      description: "Warm up to a capacity suitable for serious outbound campaigns.",
      icon: "🚀",
      enterpriseDetails: "Complex capacity planning and tiered pricing for higher volume.",
      simplicity: "All plans aim for the same goal: reliable delivery of 200+ emails per day."
    }
  ];
  
  const handleFlip = (id: number) => {
    if (flippedCard === id) {
      setFlippedCard(null);
    } else {
      setFlippedCard(id);
    }
  };
  
  return (
    <section 
      id="features" 
      ref={ref}
      className={`py-20 bg-gray-50 ${isVisible ? "animate-reveal revealed" : "animate-reveal"}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What You <span className="text-gradient">Actually Get</span>
          </h2>
          <p className="text-lg text-gray-600">
            I stripped away all the enterprise fluff and kept only what indie hackers like us actually need
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className={`feature-card h-64 cursor-pointer perspective-1000`}
              onClick={() => handleFlip(feature.id)}
            >
              <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                flippedCard === feature.id ? 'rotate-y-180' : ''
              }`}>
                {/* Front of card */}
                <div className="absolute w-full h-full p-6 backface-hidden">
                  <div className="h-full flex flex-col">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm flex-grow">{feature.description}</p>
                    <div className="text-blue-500 mt-4 text-sm font-medium flex items-center">
                      Click to compare
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Back of card */}
                <div className="absolute w-full h-full p-6 backface-hidden rotate-y-180 bg-gradient-to-br from-violet-500 to-blue-600 text-white rounded-xl">
                  <div className="h-full flex flex-col">
                    <h4 className="font-bold mb-1 text-lg">Enterprise Complexity:</h4>
                    <p className="text-sm text-white/90 mb-4">{feature.enterpriseDetails}</p>
                    
                    <h4 className="font-bold mb-1 text-lg">WarmUpPilot Simplicity:</h4>
                    <p className="text-sm text-white/90">{feature.simplicity}</p>
                    
                    <div className="mt-auto text-white/90 text-sm font-medium flex items-center">
                      Click to flip back
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="max-w-2xl mx-auto mt-16 p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <svg className="w-24 h-24 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">My Promise To You</h3>
              <p className="text-gray-600 mb-4">
                This tool helped me successfully send 6,000 emails monthly with minimal spam issues. If it doesn't work equally well for you within 14 days, I'll refund you immediately. No questions asked.
              </p>
              <div className="flex items-center">
                <span className="font-medium text-gray-900">David Campbell</span>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-gray-600">Creator of WarmUpPilot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default WhatYouGet;
