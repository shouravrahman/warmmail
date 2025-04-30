
import React, { useState } from 'react';
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  emailCount: number;
  perEmail: number;
  features: string[];
  popularFlag?: boolean;
}

const IndiePricing = () => {
  const [isVisible, ref] = useIntersectionObserver();
  const [emailCount, setEmailCount] = useState(2);
  
  const plans: PricingPlan[] = [
    {
      id: "solo",
      name: "Solo",
      description: "Perfect for 1-2 emails",
      price: 5,
      priceUnit: "per email / month",
      emailCount: 1,
      perEmail: 5,
      features: [
        "Connect 1-2 email accounts",
        "Warm up to 200+ emails/day capacity",
        "30-day warming cycle",
        "Basic email metrics",
        "Gmail & Outlook support",
        "Custom SMTP support"
      ]
    },
    {
      id: "starter",
      name: "Starter",
      description: "For small teams or multiple projects",
      price: 20,
      priceUnit: "for 5 emails / month",
      emailCount: 5,
      perEmail: 4,
      popularFlag: true,
      features: [
        "Connect 3-5 email accounts",
        "Warm up to 200+ emails/day capacity",
        "30-day warming cycle",
        "Detailed email metrics",
        "Gmail & Outlook support",
        "Custom SMTP support",
        "Priority support"
      ]
    },
    {
      id: "growth",
      name: "Growth",
      description: "For serious outreachers",
      price: 45,
      priceUnit: "for 15 emails / month",
      emailCount: 15,
      perEmail: 3,
      features: [
        "Connect 6-15 email accounts",
        "Warm up to 200+ emails/day capacity",
        "30-day warming cycle",
        "Advanced email analytics",
        "Gmail & Outlook support",
        "Custom SMTP support",
        "Priority support",
        "API access"
      ]
    }
  ];
  
  return (
    <section 
      id="pricing" 
      ref={ref}
      className={`py-20 bg-gradient-to-br from-blue-50 to-violet-50 ${isVisible ? "animate-reveal revealed" : "animate-reveal"}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            The Pricing I <span className="text-gradient">Wished For</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            When I was looking for a solution, all I wanted was simple, transparent pricing without the enterprise tax. So that's exactly what I built:
          </p>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 max-w-xl mx-auto">
            <h3 className="text-xl font-medium mb-4">How many emails do you need?</h3>
            
            <div className="mb-6">
              <input 
                type="range" 
                min="1" 
                max="15"
                step="1" 
                value={emailCount}
                onChange={(e) => setEmailCount(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
              />
              
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>1</span>
                <span>5</span>
                <span>10</span>
                <span>15</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div>
                <div className="text-sm text-gray-500">You selected:</div>
                <div className="text-2xl font-bold">{emailCount} emails</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Your price:</div>
                <div className="text-2xl font-bold text-blue-600">
                  ${emailCount <= 2 
                    ? emailCount * 5 
                    : emailCount <= 5 
                      ? 20 
                      : 45
                  }/mo
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                plan.popularFlag ? 'border-2 border-blue-500' : 'border border-gray-100'
              }`}
            >
              {plan.popularFlag && (
                <div className="absolute top-0 right-0">
                  <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold text-gray-800">${plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.priceUnit}</span>
                  </div>
                  <div className="text-sm text-blue-600 font-medium mt-1">
                    ${plan.perEmail} per email
                  </div>
                </div>
                
                <div className="mb-6">
                  <Link to="/register" className="block w-full">
                    <Button 
                      className={`w-full ${
                        plan.popularFlag 
                          ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                          : 'bg-white border border-blue-500 text-blue-500 hover:bg-blue-50'
                      }`}
                      size="lg"
                    >
                      Start Free Trial
                    </Button>
                  </Link>
                  <div className="text-center text-xs text-gray-500 mt-2">
                    14-day trial, no credit card required
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-medium text-sm text-gray-800 mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600">No hidden fees</span>
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600">Cancel anytime</span>
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600">14-day money back guarantee</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-500 mt-8 italic">
            "No contracts. No upsells. No feature gates. Just email warming that works."
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndiePricing;
