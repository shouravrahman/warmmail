
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CTA = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
      
      toast({
        title: "Success!",
        description: "Your free trial has been created. Check your email for next steps.",
        variant: "default",
      });
      
      // Create confetti effect
      createConfetti();
    }, 1500);
  };
  
  const createConfetti = () => {
    const confettiCount = 100;
    const container = document.querySelector('.confetti-container') as HTMLElement;
    
    if (!container) return;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      
      // Random properties
      const size = Math.random() * 10 + 5;
      const color = `hsl(${Math.random() * 360}, 80%, 60%)`;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 2;
      
      // Apply styles
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = color;
      confetti.style.left = `${left}%`;
      confetti.style.animationDuration = `${animationDuration}s`;
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      
      container.appendChild(confetti);
      
      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove();
      }, animationDuration * 1000);
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-r from-blue-600 to-violet-600 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white opacity-10 rounded-full animate-pulse"></div>
      </div>
      
      <div className="container relative mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to stop landing in spam?
          </h2>
          <p className="text-lg text-white opacity-90 mb-8 mx-auto max-w-2xl">
            Join 5,000+ businesses that use InboxWarm to improve deliverability and reach more inboxes. Start your free 14-day trial today.
          </p>
          
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-3 rounded-lg border border-transparent focus:border-white focus:ring-2 focus:ring-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70"
              />
              <Button 
                type="submit" 
                className="bg-white text-blue-600 hover:bg-blue-50 transition-colors font-medium px-6"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Start Free Trial'}
              </Button>
            </form>
            
            <p className="text-sm text-white/80 mt-4">
              No credit card required. Cancel anytime.
            </p>
            
            <div className="flex items-center justify-center mt-8">
              <div className="flex -space-x-2">
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=40&h=40&q=80" alt="User" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=40&h=40&q=80" alt="User" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=40&h=40&q=80" alt="User" />
              </div>
              <p className="text-sm text-white ml-4">
                Joined by <span className="font-semibold">243</span> new users this week
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Container for confetti animation */}
      <div className="confetti-container absolute inset-0 overflow-hidden pointer-events-none"></div>
      
      <style jsx>{`
        .confetti {
          position: absolute;
          top: -20px;
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 0;
          animation: fall linear forwards;
        }
        
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default CTA;
