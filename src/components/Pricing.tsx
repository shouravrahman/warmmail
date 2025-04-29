
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals and small businesses',
      priceMonthly: 29,
      priceYearly: 19,
      features: [
        'Warm up to 5 inboxes',
        'Up to 30 emails/day per inbox',
        'Basic deliverability tracking',
        'Priority inbox placement',
        'Email analytics dashboard',
        'Email support',
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing teams and businesses',
      priceMonthly: 79,
      priceYearly: 59,
      features: [
        'Warm up to 15 inboxes',
        'Up to 100 emails/day per inbox',
        'Advanced deliverability tracking',
        'Priority inbox placement',
        'Email analytics dashboard',
        'API access',
        'Priority support',
        'Dedicated account manager',
        'Custom warming schedules',
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For agencies and large organizations',
      priceMonthly: 199,
      priceYearly: 149,
      features: [
        'Unlimited inboxes',
        'Unlimited emails/day',
        'Advanced deliverability tracking',
        'Priority inbox placement',
        'Email analytics dashboard',
        'API access',
        'Priority support',
        'Dedicated account manager',
        'Custom warming schedules',
        'White-label reports',
        'Team management',
        'SSO authentication',
      ],
      popular: false
    }
  ];
  
  const savePercentage = 33;
  
  const handlePlanClick = (planId: string) => {
    setSelectedPlan(planId);
    
    // Simulating a scroll to the form
    setTimeout(() => {
      const element = document.getElementById('signup-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-lg text-gray-600">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
          
          {/* Pricing toggle */}
          <div className="flex items-center justify-center mt-8">
            <span className={`text-sm ${!isAnnual ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>Monthly</span>
            <label className="mx-4 relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isAnnual}
                onChange={() => setIsAnnual(!isAnnual)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className={`text-sm ${isAnnual ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
              Annual
              <span className="ml-1 inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                Save {savePercentage}%
              </span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`bg-white rounded-xl overflow-hidden transition-all duration-300 ${
                plan.popular ? 'shadow-xl border-2 border-blue-500 transform md:-translate-y-2' : 'shadow-lg border border-gray-200'
              } ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''}`}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white py-1 px-4 text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <p className="text-gray-500 mb-6 h-12">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold text-gray-800">
                      ${isAnnual ? plan.priceYearly : plan.priceMonthly}
                    </span>
                    <span className="text-gray-500 ml-2 mb-1">/mo</span>
                  </div>
                  {isAnnual && (
                    <p className="text-sm text-emerald-600 mt-1">
                      Billed annually (${plan.priceYearly * 12}/year)
                    </p>
                  )}
                </div>
                
                <button
                  onClick={() => handlePlanClick(plan.id)}
                  className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors ${
                    plan.popular 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-800'
                  }`}
                >
                  Start 14-day free trial
                </button>
                
                <div className="mt-8 space-y-4">
                  <p className="text-sm font-medium text-gray-700">Plan includes:</p>
                  
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Signup form (appears when a plan is selected) */}
        {selectedPlan && (
          <div id="signup-form" className="max-w-lg mx-auto mt-16 bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Start your free trial of {plans.find(p => p.id === selectedPlan)?.name}
            </h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              
              <div className="pt-2">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium">
                  Create account
                </Button>
              </div>
            </form>
            
            <p className="text-sm text-gray-500 mt-4 text-center">
              By signing up, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
            </p>
          </div>
        )}
        
        <div className="max-w-3xl mx-auto mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Frequently Asked Pricing Questions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Is there a free trial?</h4>
              <p className="text-gray-600 text-sm">Yes, all plans include a 14-day free trial with full access to all features. No credit card required.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Can I change plans later?</h4>
              <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600 text-sm">We accept all major credit cards, PayPal, and ACH transfers for annual plans.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Do you offer refunds?</h4>
              <p className="text-gray-600 text-sm">We offer a 30-day money-back guarantee if you're not satisfied with our service.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
