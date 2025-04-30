
import React, { useState } from 'react';
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const IndieFAQ = () => {
  const [isVisible, ref] = useIntersectionObserver();
  const [activeMode, setActiveMode] = useState<'straight' | 'marketing'>('straight');
  
  interface FAQItem {
    id: string;
    question: string;
    straightAnswer: string;
    marketingAnswer: string;
  }
  
  const faqs: FAQItem[] = [
    {
      id: "warming-time",
      question: "How long until my email is fully warmed?",
      straightAnswer: "About 30 days to reach full capacity (200+ emails/day). You'll see gradual improvements starting from week 1, but the full warming process takes about a month for best results.",
      marketingAnswer: "Our proprietary algorithm adapts to your specific email provider to optimize your sender reputation through an advanced AI-driven methodology that typically results in maximum deliverability within a 30-day optimization period."
    },
    {
      id: "vs-expensive",
      question: "Will this work as well as the expensive options?",
      straightAnswer: "Yes. I've tested this against services charging $49+ per email with identical results. Email warming is fundamentally a simple concept - it's just artificially priced high by competitors.",
      marketingAnswer: "WarmUpPilot leverages enterprise-grade deliverability technology to ensure world-class inbox placement comparable to industry-leading solutions at a fraction of the cost through operational efficiency."
    },
    {
      id: "technical-knowledge",
      question: "Do I need technical knowledge to set this up?",
      straightAnswer: "No. If you can log into your email account, you can set this up. Gmail/Outlook users just need to authorize access. SMTP users need their server details which your provider can give you.",
      marketingAnswer: "Our seamless onboarding process requires zero technical expertise as our advanced integration layer handles all configuration complexity behind our intuitive user interface."
    },
    {
      id: "sending-capacity",
      question: "Can I really send 200+ emails per day after warming?",
      straightAnswer: "Yes, that's what I built this for. Most email providers allow 200-500 emails/day from warmed accounts. Results may vary slightly by provider, but 200/day is a realistic target after 30 days.",
      marketingAnswer: "Our advanced warming protocol gradually elevates your sending reputation to unlock maximum provider-allocated sending quotas, typically enabling throughput of 200+ communications daily upon completion of the optimization cycle."
    },
    {
      id: "cancellation",
      question: "What if I want to cancel?",
      straightAnswer: "Click the cancel button in your account settings. That's it - no emails, no calls, no guilt trips. You can cancel anytime and your card won't be charged again.",
      marketingAnswer: "Our customer success team is standing by to process your service modification request through our streamlined retention workflow that can be initiated via your account management dashboard."
    },
    {
      id: "multiple-accounts",
      question: "Can I warm multiple email accounts?",
      straightAnswer: "Yes, you pay per email account. The Solo plan is $5 per email, Starter is $4 per email (5 emails), and Growth is $3 per email (15 emails). You can manage them all from one dashboard.",
      marketingAnswer: "WarmUpPilot Enterprise offers unlimited scalability with tiered volume discounts designed to accommodate organizational requirements from small teams to large departments requiring multi-account warming solutions."
    },
  ];
  
  return (
    <section 
      id="faq" 
      ref={ref}
      className={`py-20 bg-white ${isVisible ? "animate-reveal revealed" : "animate-reveal"}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Questions I Had When I Was In Your Shoes
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Straight answers to common questions
          </p>
          
          {/* Toggle between straight talk and marketing speak */}
          <div className="flex justify-center mb-12">
            <div className="relative inline-flex bg-gray-100 rounded-full">
              <button
                className={`relative px-6 py-2 text-sm font-medium rounded-full z-10 transition-colors ${
                  activeMode === 'straight' ? 'text-white' : 'text-gray-600'
                }`}
                onClick={() => setActiveMode('straight')}
              >
                Straight Talk
              </button>
              <button
                className={`relative px-6 py-2 text-sm font-medium rounded-full z-10 transition-colors ${
                  activeMode === 'marketing' ? 'text-white' : 'text-gray-600'
                }`}
                onClick={() => setActiveMode('marketing')}
              >
                Marketing Speak
              </button>
              <div
                className="absolute inset-0 z-0 transition-all duration-300"
                style={{
                  transform: activeMode === 'straight' ? 'translateX(0)' : 'translateX(100%)',
                  width: '50%',
                  borderRadius: '9999px', // rounded-full
                }}
              >
                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-200">
                <AccordionTrigger className="text-lg font-medium text-left py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 pt-2 pb-4">
                    {activeMode === 'straight' ? faq.straightAnswer : faq.marketingAnswer}
                  </p>
                  {activeMode === 'marketing' && (
                    <div className="mt-2 p-3 bg-amber-50 rounded-lg border border-amber-100 text-amber-700 text-sm">
                      <div className="font-medium">Translation:</div>
                      <div className="mt-1">{faq.straightAnswer}</div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className="text-xl font-bold text-blue-800 mb-3">Still have questions?</h3>
            <p className="text-gray-600 mb-4">
              I'm happy to answer any other questions you might have. Just reach out directly!
            </p>
            <button className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Email me directly
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndieFAQ;
