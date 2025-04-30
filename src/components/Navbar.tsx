
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">WarmUpPilot</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#journey" className="text-gray-600 hover:text-blue-500 transition-colors">My Journey</a>
          <a href="#calculator" className="text-gray-600 hover:text-blue-500 transition-colors">Savings</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-blue-500 transition-colors">How it Works</a>
          <a href="#features" className="text-gray-600 hover:text-blue-500 transition-colors">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-blue-500 transition-colors">Pricing</a>
          <a href="#faq" className="text-gray-600 hover:text-blue-500 transition-colors">FAQ</a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="font-medium">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="btn-gradient font-medium">
              Start Free Trial
            </Button>
          </Link>
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
            <a href="#journey" className="text-gray-600 hover:text-blue-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>My Journey</a>
            <a href="#calculator" className="text-gray-600 hover:text-blue-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Savings</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
            <a href="#features" className="text-gray-600 hover:text-blue-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#faq" className="text-gray-600 hover:text-blue-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full font-medium">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full btn-gradient font-medium">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
