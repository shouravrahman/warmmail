
import React from 'react';
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  const [isVisible, ref] = useIntersectionObserver();
  
  return (
    <section 
      id="final-cta" 
      ref={ref}
      className={`py-20 bg-gradient-to-br from-blue-600 to-violet-600 relative overflow-hidden ${
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to warm your emails without warming your wallet?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Start today and in ~30 days, you'll be sending up to 200 emails daily with minimal spam issues.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-lg mx-auto mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Start your warming journey</h3>
            
            <form className="space-y-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 rounded-md bg-white/90 border border-white/50 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              
              <Link to="/register" className="block w-full">
                <Button size="lg" className="w-full bg-white hover:bg-blue-50 text-blue-600 font-semibold text-lg">
                  Start My 3-Day Free Trial
                </Button>
              </Link>
            </form>
            
            <p className="text-blue-100 mt-4 text-sm">
              No credit card required for trial. Just $10/month for 2 emails after that.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center text-blue-100 space-y-4 md:space-y-0 md:space-x-12">
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
              <span>14-day money back guarantee</span>
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
          
          <div className="mt-16 flex justify-center space-x-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-1">100+</div>
              <div className="text-blue-200 text-sm">Indie hackers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-1">$50k+</div>
              <div className="text-blue-200 text-sm">Annual savings</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-1">200+</div>
              <div className="text-blue-200 text-sm">Emails/day capacity</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
