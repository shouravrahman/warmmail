
import React from 'react';
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const WhatYouGet = () => {
  const [isVisible, ref] = useIntersectionObserver();
  
  const features = [
    {
      title: "Automatic Email Exchange",
      description: "Our network automatically exchanges emails between member inboxes, creating natural engagement patterns.",
      icon: "mail"
    },
    {
      title: "Smart Sending Patterns",
      description: "AI-driven scheduling mimics human sending behavior to avoid ESP spam detection algorithms.",
      icon: "clock"
    },
    {
      title: "Real-Time Health Monitoring",
      description: "Track your inbox health score and deliverability metrics with our intuitive dashboard.",
      icon: "activity"
    },
    {
      title: "Personalized Warming Plans",
      description: "Customize your warm-up speed based on your outreach goals and timeline requirements.",
      icon: "settings"
    },
    {
      title: "Diverse Content Generation",
      description: "Our AI creates varied, natural-looking emails that avoid repetitive content patterns.",
      icon: "file-text"
    },
    {
      title: "Gradual Volume Increase",
      description: "We start slow and methodically increase your sending volume to build credibility with ESPs.",
      icon: "trending-up"
    }
  ];

  return (
    <section 
      id="features" 
      ref={ref} 
      className={`py-20 ${isVisible ? "animate-reveal revealed" : "animate-reveal"}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">What You Actually Get</span>
          </h2>
          <p className="text-lg text-gray-600">
            I stripped away all the enterprise fluff and kept only what indie hackers like us actually need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card p-6 h-full flex flex-col">
              <div className="mb-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </div>
              <p className="text-gray-600 flex-grow">{feature.description}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-blue-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Included in all plans</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto p-6 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="md:mr-6 mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-blue-800 mb-2">How is this different from other services?</h4>
              <p className="text-blue-700">
                Unlike enterprise solutions charging $49+ per inbox, WarmUpPilot was built by an indie hacker for indie hackers. 
                We focus on affordability without compromising effectiveness. Same results, 90% lower cost.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for the animated wave background - removing the jsx attribute that caused the error */}
      <style>
        {`.wave-animation {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }
        
        .wave-path {
          animation: wave 10s linear infinite;
        }
        
        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }`}
      </style>
    </section>
  );
};

export default WhatYouGet;
