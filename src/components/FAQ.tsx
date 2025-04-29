
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  category: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick, category }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex justify-between items-start w-full py-5 px-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-lg"
        onClick={onClick}
      >
        <div className="flex items-start">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full mr-3 mt-1">
            {category}
          </span>
          <span className="font-medium text-gray-800">{question}</span>
        </div>
        <ChevronDown className={`flex-shrink-0 w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-3 pb-5" dangerouslySetInnerHTML={{ __html: answer }}></div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqItems = [
    {
      question: "What is email warming?",
      answer: "Email warming is the process of gradually increasing your email sending volume over time to establish a positive reputation with email service providers. Our system automates this process by exchanging emails between your inbox and our network of accounts, mimicking natural human email behavior patterns.",
      category: "Basics"
    },
    {
      question: "How long does it take to warm up an email?",
      answer: "Most email accounts show significant improvement within 2-4 weeks of consistent warming. However, the exact timeline depends on several factors including your domain age, previous sending history, and target sending volume. Our dashboard provides real-time metrics to track your progress.",
      category: "Process"
    },
    {
      question: "Is this compatible with my email provider?",
      answer: "Yes! InboxWarm works with all major email providers including Gmail, GSuite, Outlook/Office 365, Yahoo, and any custom SMTP server. We support both personal and business email accounts across all providers.",
      category: "Technical"
    },
    {
      question: "Will this affect my existing emails?",
      answer: "No. Our system only interacts with emails from our warming network and never accesses, reads, or modifies your existing emails. We use dedicated folders and labels to keep warming activity separate from your regular inbox.",
      category: "Privacy"
    },
    {
      question: "How many emails should I warm up daily?",
      answer: "We recommend starting with 5-10 emails per day and gradually increasing to your target sending volume. Our system automatically adjusts the warming volume based on your performance metrics to ensure optimal results without triggering spam filters.",
      category: "Process"
    },
    {
      question: "Do I need to keep warming my email forever?",
      answer: "No. Once you've established a good sending reputation (typically 4-6 weeks), you can reduce your warming activity to maintenance mode (1-2 times per week) or pause it completely. However, if you plan to significantly increase your sending volume or notice deliverability issues, we recommend resuming active warming.",
      category: "Process"
    },
    {
      question: "Is my data secure with InboxWarm?",
      answer: "Absolutely. We use industry-standard encryption and security practices to protect your data. We never read the content of your personal or business emails, and all authentication is handled through OAuth or encrypted SMTP credentials. Our system is GDPR compliant and we have a strict no-data-sharing policy.",
      category: "Privacy"
    },
    {
      question: "Can I warm up multiple email accounts?",
      answer: "Yes! Our plans support multiple email accounts, making it perfect for teams and agencies. Each account receives dedicated warming activity and separate performance tracking through our dashboard.",
      category: "Plans"
    }
  ];
  
  const filteredFAQs = searchQuery 
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Everything you need to know about email warming and our service.
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <svg className="absolute right-3 top-3 w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                category={item.category}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))
          ) : (
            <div className="py-8 px-4 text-center">
              <p className="text-gray-500">No matching questions found. Try a different search term.</p>
            </div>
          )}
        </div>
        
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? Our support team is ready to help.
          </p>
          <button className="btn-secondary">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
