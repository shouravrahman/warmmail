
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19h18M3 5h18M3 12h18" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">InboxWarm</span>
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-blue-500 transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-blue-500 transition-colors">How it Works</a>
          <a href="#pricing" className="text-gray-600 hover:text-blue-500 transition-colors">Pricing</a>
          <a href="#faq" className="text-gray-600 hover:text-blue-500 transition-colors">FAQ</a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="font-medium">
            Login
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
            Start Free Trial
          </Button>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-600 focus:outline-none">
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-5 shadow-lg absolute top-full left-0 w-full">
          <nav className="flex flex-col space-y-4">
            <a href="#features" className="text-gray-600 hover:text-blue-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#faq" className="text-gray-600 hover:text-blue-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
              <Button variant="outline" className="w-full font-medium">
                Login
              </Button>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium">
                Start Free Trial
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
