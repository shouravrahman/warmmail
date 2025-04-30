
import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const ValueCalculator = () => {
  const [isVisible, ref] = useIntersectionObserver();
  const [emailCount, setEmailCount] = useState(2);
  const [competitorPrice, setCompetitorPrice] = useState(49);
  
  // Calculate values
  const competitorTotal = emailCount * competitorPrice;
  const warmupPilotPrice = emailCount <= 2 ? 5 : emailCount <= 5 ? 4 : 3;
  const warmupPilotTotal = emailCount * warmupPilotPrice;
  const savings = competitorTotal - warmupPilotTotal;
  const savingsPercentage = Math.round((savings / competitorTotal) * 100);
  const yearlySavings = savings * 12;
  
  return (
    <section 
      id="calculator" 
      ref={ref}
      className={`py-16 bg-gray-50 ${isVisible ? "animate-reveal revealed" : "animate-reveal"}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                The Simple Math
              </h2>
              
              <div className="space-y-6 text-lg">
                <p className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center mr-4">1</span>
                  <span>
                    <strong>{emailCount} emails</strong> × <strong>${competitorPrice}</strong> = <strong>${competitorTotal}/month</strong> with competitors
                  </span>
                </p>
                
                <p className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mr-4">2</span>
                  <span>
                    <strong>{emailCount} emails</strong> × <strong>${warmupPilotPrice}</strong> = <strong>${warmupPilotTotal}/month</strong> with WarmUpPilot
                  </span>
                </p>
                
                <div className="flex items-center py-4 px-6 bg-blue-50 border border-blue-100 rounded-lg">
                  <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">=</span>
                  <span className="font-bold text-xl">
                    That's <span className="text-gradient">${savings}/month savings</span> ({savingsPercentage}%)
                  </span>
                </div>
                
                <div className="flex items-center py-4 px-6 bg-violet-50 border border-violet-100 rounded-lg">
                  <span className="w-8 h-8 rounded-full bg-violet-500 text-white flex items-center justify-center mr-4">💰</span>
                  <span className="font-bold text-xl">
                    ${yearlySavings}/year back in your pocket
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-2xl font-bold text-center mb-6">How much would you save?</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Number of emails you need to warm:
                  </label>
                  
                  <div className="flex items-center">
                    <input 
                      type="range" 
                      min="1" 
                      max="15" 
                      value={emailCount}
                      onChange={(e) => setEmailCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                    />
                    <span className="w-10 text-center font-medium ml-3">{emailCount}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Average competitor price per email:
                  </label>
                  
                  <div className="flex items-center">
                    <input 
                      type="range" 
                      min="29" 
                      max="99" 
                      step="10"
                      value={competitorPrice}
                      onChange={(e) => setCompetitorPrice(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                    />
                    <span className="w-12 text-center font-medium ml-3">${competitorPrice}</span>
                  </div>
                </div>
                
                <hr className="my-6 border-gray-200" />
                
                <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-6 rounded-lg text-white">
                  <div className="text-center space-y-4">
                    <div>
                      <div className="text-sm opacity-80">Total with competitors:</div>
                      <div className="text-2xl font-bold">${competitorTotal}/month</div>
                    </div>
                    
                    <div>
                      <div className="text-sm opacity-80">Total with WarmUpPilot:</div>
                      <div className="text-2xl font-bold">${warmupPilotTotal}/month</div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/20">
                      <div className="text-sm opacity-80">You save:</div>
                      <div className="text-3xl font-bold">${savings}/month</div>
                      <div className="text-lg font-medium mt-1">${yearlySavings}/year</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center pt-4">
                  <button className="btn-gradient px-8 py-3 rounded-md text-white font-medium text-lg transition-shadow hover:shadow-lg">
                    Start My Free Trial
                  </button>
                  <div className="text-sm text-gray-500 mt-2">
                    No credit card required for trial
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueCalculator;
