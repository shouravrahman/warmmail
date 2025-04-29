
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";

const InboxHealth = () => {
  const [score, setScore] = useState(87);
  const [warmedDays, setWarmedDays] = useState(14);
  const [sendingVolume, setSendingVolume] = useState(30);
  
  const getHealthColor = (value: number) => {
    if (value < 40) return 'red-500';
    if (value < 70) return 'amber-500';
    return 'emerald-500';
  };
  
  const healthColor = getHealthColor(score);
  const circumference = 2 * Math.PI * 45; // Circle radius is 45
  const dashoffset = circumference - (circumference * score) / 100;
  
  const handleDaysChange = (value: number[]) => {
    const days = value[0];
    setWarmedDays(days);
    
    // Adjust score based on warming days
    let newScore = Math.min(Math.max(30 + (days * 4), 30), 95);
    
    // Adjust for sending volume (penalize if too high too early)
    if (days < 10 && sendingVolume > 30) {
      newScore = Math.max(newScore - (sendingVolume - 30) * 1.5, 30);
    }
    
    setScore(Math.round(newScore));
  };
  
  const handleVolumeChange = (value: number[]) => {
    const volume = value[0];
    setSendingVolume(volume);
    
    // Adjust score based on days and volume
    let newScore = Math.min(Math.max(30 + (warmedDays * 4), 30), 95);
    
    // Penalize if volume is too high too early
    if (warmedDays < 10 && volume > 30) {
      newScore = Math.max(newScore - (volume - 30) * 1.5, 30);
    }
    
    setScore(Math.round(newScore));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Monitor Your <span className="text-gradient">Inbox Health</span>
          </h2>
          <p className="text-lg text-gray-600">
            Our interactive dashboard gives you real-time insights into your email performance.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Health Score Meter */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 md:col-span-1">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Inbox Health Score</h3>
            
            <div className="relative w-48 h-48 mx-auto">
              {/* Background circle */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                
                {/* Progress circle */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke={`rgb(var(--${healthColor}))`.replace('--red-500', '--destructive').replace('--amber-500', '--amber-500').replace('--emerald-500', '--secondary')} 
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-500 ease-out"
                />
                
                {/* Score text */}
                <text x="50" y="45" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#1F2937">
                  {score}%
                </text>
                <text x="50" y="65" textAnchor="middle" fontSize="12" fill="#6B7280">
                  Health Score
                </text>
              </svg>
            </div>
            
            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <p className={`text-center text-${healthColor} font-semibold`}>
                {score < 40 ? 'Poor' : score < 70 ? 'Average' : 'Excellent'}
              </p>
            </div>
          </div>
          
          {/* Interactive Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 md:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Interactive Simulator</h3>
            
            <div className="space-y-8">
              {/* Days of warming slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">Days of warming</label>
                  <span className="text-sm font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                    {warmedDays} days
                  </span>
                </div>
                <Slider 
                  defaultValue={[warmedDays]} 
                  max={30} 
                  min={0} 
                  step={1}
                  onValueChange={(value) => handleDaysChange(value)} 
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>New</span>
                  <span>2 weeks</span>
                  <span>1 month</span>
                </div>
              </div>
              
              {/* Daily sending volume slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">Daily sending volume</label>
                  <span className="text-sm font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                    {sendingVolume} emails/day
                  </span>
                </div>
                <Slider 
                  defaultValue={[sendingVolume]} 
                  max={100} 
                  min={5} 
                  step={5}
                  onValueChange={(value) => handleVolumeChange(value)} 
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
              
              {/* Recommendations */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2">Recommendation</h4>
                <p className="text-sm text-blue-700">
                  {score < 50 
                    ? "Your current settings may lead to deliverability issues. Consider warming for longer before increasing volume." 
                    : score < 80
                      ? "You're on the right track! Continue warming at this pace to reach optimal deliverability."
                      : "Excellent! Your inbox is healthy and ready for your full sending volume."}
                </p>
              </div>
              
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Spam Risk</div>
                  <div className={`font-bold text-${score > 70 ? 'emerald-500' : score > 50 ? 'amber-500' : 'red-500'}`}>
                    {score > 70 ? 'Low' : score > 50 ? 'Medium' : 'High'}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Inbox Placement</div>
                  <div className="font-bold text-blue-700">{Math.round(score * 0.9)}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InboxHealth;
