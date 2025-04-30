
import React, { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  savings: string;
  avatar: string;
}

const TestimonialsIndieHackers = () => {
  const [isVisible, ref] = useIntersectionObserver();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Indie Game Developer",
      company: "PixelForge Studios",
      testimonial: "Saved $80/month warming two emails. Same results, way less cost. I was skeptical that something at this price point could match the expensive services, but after 30 days my emails were getting the same deliverability as before with the overpriced service.",
      savings: "$960/year",
      avatar: "AR"
    },
    {
      id: 2,
      name: "Sarah Meade",
      role: "Solo Founder",
      company: "MetricMind Analytics",
      testimonial: "I just needed basic warming for my outreach campaigns. This is perfect and affordable. As a bootstrapped founder, every dollar counts, and WarmUpPilot gave me exactly what I needed without forcing me to pay for features I don't use.",
      savings: "$528/year",
      avatar: "SM"
    },
    {
      id: 3,
      name: "Miguel Torres",
      role: "Developer & Consultant",
      company: "CodeCraft Solutions",
      testimonial: "Finally, email warming priced for bootstrappers, not venture-backed startups! I had been manually warming my emails (super tedious) before finding WarmUpPilot. Now I save time AND money compared to both manual work and enterprise services.",
      savings: "$1,056/year",
      avatar: "MT"
    },
    {
      id: 4,
      name: "Priya Sharma",
      role: "Content Marketer",
      company: "Clearway Content",
      testimonial: "I switched from a $49/mo service and honestly can't tell the difference except my bank account is happier. After warming up my two outreach accounts, I'm hitting the same open rates and inbox placement as I did with the expensive solution.",
      savings: "$888/year",
      avatar: "PS"
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
    <section 
      id="testimonials" 
      ref={ref}
      className={`py-20 bg-blue-50 ${isVisible ? "animate-reveal revealed" : "animate-reveal"}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Fellow <span className="text-gradient">Indie Hackers</span> Who Were Tired of Overpaying
          </h2>
          <p className="text-lg text-gray-600">
            Real people, real savings, real results
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Carousel */}
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((item) => (
                <div key={item.id} className="min-w-full px-4">
                  <div 
                    className={`bg-white rounded-xl shadow-lg p-6 border border-blue-100 transition-all duration-300 ${
                      expanded === item.id ? 'transform -translate-y-2 shadow-xl' : 'cursor-pointer hover:shadow-md'
                    }`}
                    onClick={() => handleCardClick(item.id)}
                  >
                    <div className="flex flex-col md:flex-row items-start">
                      <div className="mb-6 md:mb-0 md:mr-6 flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white text-xl font-bold">
                          {item.avatar}
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-4">
                          <svg className="w-8 h-8 text-blue-200 mb-4" fill="currentColor" viewBox="0 0 32 32">
                            <path d="M10,8H6a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2h4v8H8A8,8,0,0,1,0,16V8A8,8,0,0,1,8,0h2Zm20,0H26a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2h4v8H28A8,8,0,0,1,20,16V8A8,8,0,0,1,28,0h2Z" />
                          </svg>
                          
                          <p className={`text-gray-600 ${expanded === item.id ? '' : 'line-clamp-3'}`}>
                            {item.testimonial}
                          </p>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800">{item.name}</span>
                          <span className="text-sm text-gray-500">{item.role}, {item.company}</span>
                        </div>
                        
                        <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                          <div className="text-xs text-emerald-700">Annual Savings</div>
                          <div className="font-bold text-emerald-600 text-lg">{item.savings}</div>
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
                aria-label={`View testimonial ${index + 1}`}
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
        
        <div className="max-w-3xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Join 100+ indie hackers</h3>
            <p className="text-gray-600 mb-6">
              Who are saving money while getting the same results as expensive services
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 opacity-70"
                >
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                +88
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsIndieHackers;
