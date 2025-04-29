
import React, { useState } from 'react';

const TrustLogos = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const logos = [
    { 
      id: 1, 
      name: "SendGrid", 
      testimonial: "InboxWarm helped our users improve deliverability by an average of 38%." 
    },
    { 
      id: 2, 
      name: "Mailchimp", 
      testimonial: "Great integration partner for enhancing inbox placement rates." 
    },
    { 
      id: 3, 
      name: "HubSpot", 
      testimonial: "Our clients love the seamless warm-up automation with InboxWarm." 
    },
    { 
      id: 4, 
      name: "Outlook", 
      testimonial: "Improved email authentication and sender reputation for our business users." 
    },
    { 
      id: 5, 
      name: "Gmail", 
      testimonial: "InboxWarm respects email protocols while improving delivery metrics." 
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-12">
          Trusted by smart outreachers
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <div 
              key={logo.id} 
              className="relative group"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className={`w-32 h-20 flex items-center justify-center transition-all duration-300 ${activeIndex === index ? 'scale-110' : 'grayscale hover:grayscale-0'}`}>
                <div className={`text-2xl font-bold ${activeIndex === index ? 'text-blue-500' : 'text-gray-400'} transition-colors duration-300`}>
                  {logo.name}
                </div>
              </div>
              
              {/* Testimonial tooltip */}
              {activeIndex === index && (
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-48 bg-white p-3 rounded-lg shadow-lg text-sm z-10 animate-fade-in">
                  <div className="text-gray-700">{logo.testimonial}</div>
                  <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;
