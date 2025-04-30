
import React from "react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const CTA = () => {
  const [isVisible, ref] = useIntersectionObserver();

  return (
    <section
      id="cta"
      ref={ref}
      className={`py-20 bg-gradient-to-br from-blue-500 to-violet-600 relative overflow-hidden ${
        isVisible ? "animate-reveal revealed" : "animate-reveal"
      }`}
    >
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
        <svg
          className="absolute right-0 top-0 h-full opacity-10"
          width="400"
          height="600"
          viewBox="0 0 400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="250" cy="150" r="100" fill="white" />
          <circle cx="50" cy="300" r="200" fill="white" />
          <circle cx="350" cy="450" r="150" fill="white" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Start warming up your inbox today
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of email marketers and sales professionals who have
            improved their deliverability with InboxWarm.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-6 h-auto text-lg w-full sm:w-auto"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 h-auto text-lg w-full sm:w-auto"
            >
              Schedule a Demo
            </Button>
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-center text-blue-100 space-y-4 md:space-y-0 md:space-x-12">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>No credit card required</span>
            </div>

            <div className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>14-day free trial</span>
            </div>

            <div className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="flex justify-center space-x-4">
              <img
                src="https://via.placeholder.com/100x30?text=Client+1"
                alt="Client logo"
                className="h-8 opacity-70"
              />
              <img
                src="https://via.placeholder.com/100x30?text=Client+2"
                alt="Client logo"
                className="h-8 opacity-70"
              />
              <img
                src="https://via.placeholder.com/100x30?text=Client+3"
                alt="Client logo"
                className="h-8 opacity-70"
              />
            </div>
            <p className="text-sm text-blue-200 mt-4">
              Trusted by leading companies worldwide
            </p>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .pulse-element {
          animation: pulse 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default CTA;
