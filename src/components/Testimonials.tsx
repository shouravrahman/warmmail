
import React, { useState, useRef, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  metrics: {
    deliverability: string;
    openRate: string;
  };
  avatar: string;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Email Marketing Lead",
      company: "TechGrow Inc.",
      content: "InboxWarm has been a game-changer for our outreach campaigns. Before using it, around 30% of our emails were landing in spam. Within three weeks of warming, we've seen our deliverability jump to over 95%. The automatic warming saved us countless hours of manual work.",
      metrics: {
        deliverability: "+65%",
        openRate: "+32%"
      },
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Sales Director",
      company: "SalesForce Pro",
      content: "After switching email providers, our deliverability tanked. InboxWarm helped us rebuild our sender reputation in just under a month. The dashboard metrics were invaluable in showing our progress, and our open rates have doubled since we started using the service.",
      metrics: {
        deliverability: "+42%",
        openRate: "+100%"
      },
      avatar: "MC"
    },
    {
      id: 3,
      name: "Jessica Adams",
      role: "Founder",
      company: "Growth Agency",
      content: "I run outreach campaigns for multiple clients, and email deliverability is always a concern. InboxWarm lets me prep new domains properly before launching campaigns. The automatic warm-up process is seamless, and I love the detailed analytics showing improvements over time.",
      metrics: {
        deliverability: "+55%",
        openRate: "+47%"
      },
      avatar: "JA"
    },
    {
      id: 4,
      name: "Robert Williams",
      role: "Head of Marketing",
      company: "LeadGen Solutions",
      content: "We used to manually warm up our outreach accounts which was time-consuming and inconsistent. With InboxWarm, the entire process is automated and the results are far better than our manual efforts. The reporting is excellent and gives us confidence in our email campaigns.",
      metrics: {
        deliverability: "+38%",
        openRate: "+26%"
      },
      avatar: "RW"
    }
  ];
  
  // Auto rotation
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);
  
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    // Resume auto-rotation after 10 seconds
    setTimeout(() => setIsPaused(false), 10000);
  };
  
  const handleCardClick = (id: number) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
      setIsPaused(true);
    }
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Trusted by <span className="text-gradient">Smart Marketers</span>
          </h2>
          <p className="text-lg text-gray-600">
            See how InboxWarm has helped businesses improve their email deliverability.
          </p>
        </div>
        
        {/* Testimonial Carousel */}
        <div 
          ref={carouselRef} 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="min-w-full px-4"
                >
                  <div 
                    className={`bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100 transition-all duration-300 ${
                      expanded === testimonial.id ? 'transform -translate-y-2 shadow-xl' : 'cursor-pointer hover:shadow-md'
                    }`}
                    onClick={() => handleCardClick(testimonial.id)}
                  >
                    <div className="flex flex-col md:flex-row items-start">
                      <div className="mb-6 md:mb-0 md:mr-6 flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white text-xl font-bold">
                          {testimonial.avatar}
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-4">
                          <svg className="w-8 h-8 text-blue-200 mb-4" fill="currentColor" viewBox="0 0 32 32">
                            <path d="M10,8H6a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2h4v8H8A8,8,0,0,1,0,16V8A8,8,0,0,1,8,0h2Zm20,0H26a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2h4v8H28A8,8,0,0,1,20,16V8A8,8,0,0,1,28,0h2Z" />
                          </svg>
                          
                          <p className={`text-gray-600 ${expanded === testimonial.id ? '' : 'line-clamp-3'}`}>
                            {testimonial.content}
                          </p>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800">{testimonial.name}</span>
                          <span className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</span>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                            <div className="text-xs text-emerald-700">Deliverability</div>
                            <div className="font-bold text-emerald-600 text-lg">{testimonial.metrics.deliverability}</div>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="text-xs text-blue-700">Open Rate</div>
                            <div className="font-bold text-blue-600 text-lg">{testimonial.metrics.openRate}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                  activeIndex === index ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-gray-600 hover:text-blue-500 transition-colors focus:outline-none"
            onClick={() => handleDotClick((activeIndex - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-gray-600 hover:text-blue-500 transition-colors focus:outline-none"
            onClick={() => handleDotClick((activeIndex + 1) % testimonials.length)}
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="max-w-2xl mx-auto mt-16 flex flex-col sm:flex-row items-center justify-center text-center sm:text-left bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl shadow-lg p-6 md:p-8 text-white">
          <div className="mb-6 sm:mb-0 sm:mr-6">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Ready to improve your deliverability?</h3>
            <p className="opacity-90">Join 5,000+ businesses sending better emails.</p>
          </div>
          <button className="px-6 py-3 bg-white text-blue-700 rounded-md font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
