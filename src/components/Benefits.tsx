
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, description, icon, details }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div 
      className={`feature-card ${isExpanded ? 'transform -translate-y-2' : ''}`}
      style={{ 
        height: isExpanded ? '360px' : '280px', 
        transition: 'height 0.3s ease-out, transform 0.3s ease-out' 
      }}
    >
      <div className="p-6">
        <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center text-blue-500 mb-4">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="flex items-center text-blue-500 hover:text-blue-600 transition-colors group"
        >
          <span>{isExpanded ? 'Show less' : 'Learn more'}</span>
          <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
        </button>
        
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
            <p className="text-gray-600 text-sm">{details}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Benefits = () => {
  const benefits: BenefitCardProps[] = [
    {
      title: "Auto Send & Reply",
      description: "Automatic email exchanges that mimic natural human conversation patterns.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      details: "Our system sends and receives emails at varied times to create natural engagement patterns. Each email uses AI-generated content that looks like real conversations, not spam. This helps email providers recognize your account as legitimate and improves deliverability scores."
    },
    {
      title: "Deliverability Tracking",
      description: "Real-time metrics showing your inbox health and placement improvements.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      details: "Track your progress with detailed analytics showing inbox placement rates, open rates, and other key metrics. Our dashboard compares your current performance against historical data so you can see improvements over time and identify any deliverability issues before they affect your campaigns."
    },
    {
      title: "Easy Setup",
      description: "Connect your inbox in under 2 minutes with secure OAuth or SMTP.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      details: "No complicated DNS changes or technical configurations required. Simply connect your email account using secure OAuth for Gmail and Outlook, or enter SMTP details for other providers. Start warming up your inbox immediately and see results within days, not weeks."
    },
    {
      title: "Safety & Privacy",
      description: "Enterprise-grade security with zero access to your sensitive email content.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      details: "Your data security is our priority. We use end-to-end encryption and never read the content of your sensitive emails. Our system only interacts with warming network messages and provides detailed audit logs of all activities. We're GDPR compliant and never sell or share your data with third parties."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Warm Up Your Inbox <span className="text-gradient">The Smart Way</span>
          </h2>
          <p className="text-lg text-gray-600">
            Our intelligent warming technology uses natural engagement patterns to improve deliverability without raising spam flags.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
              details={benefit.details}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
