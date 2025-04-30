
import React from "react";

interface HealthScoreGaugeProps {
  score: number;
  size?: number;
}

const HealthScoreGauge = ({ score, size = 120 }: HealthScoreGaugeProps) => {
  // Normalize the score to be between 0 and 100
  const normalizedScore = Math.max(0, Math.min(100, score));
  
  // Calculate the stroke dash offset for the progress circle
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;
  
  // Determine the color based on the score
  const getColor = () => {
    if (score >= 80) return "#10B981"; // Green for good
    if (score >= 50) return "#F59E0B"; // Amber for medium
    return "#EF4444"; // Red for poor
  };
  
  const color = getColor();
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100"
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="8"
        />
        
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Score text */}
      <div 
        className="absolute inset-0 flex items-center justify-center flex-col"
        style={{ transform: "rotate(0deg)" }}
      >
        <span className="text-xl font-bold">{normalizedScore}%</span>
        <span className="text-xs text-gray-500">Health</span>
      </div>
    </div>
  );
};

export default HealthScoreGauge;
