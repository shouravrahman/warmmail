
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InsightItem {
  title: string;
  description: string;
  type: "positive" | "warning" | "info";
}

interface AIInsightBoxProps {
  inboxEmail: string;
  insights: InsightItem[];
  estimatedCompletion?: string;
}

const AIInsightBox = ({
  inboxEmail,
  insights,
  estimatedCompletion,
}: AIInsightBoxProps) => {
  const getTypeStyles = (type: "positive" | "warning" | "info") => {
    switch (type) {
      case "positive":
        return "bg-green-50 border-l-4 border-green-500 text-green-800";
      case "warning":
        return "bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800";
      case "info":
        return "bg-blue-50 border-l-4 border-blue-500 text-blue-800";
      default:
        return "bg-gray-50 border-l-4 border-gray-500 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-violet-600 text-white">
        <CardTitle className="flex items-center space-x-2">
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <span>AI Health Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">{inboxEmail}</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {insights.map((insight, index) => (
            <div key={index} className={`p-4 ${getTypeStyles(insight.type)}`}>
              <h4 className="font-semibold">{insight.title}</h4>
              <p className="mt-1 text-sm opacity-80">{insight.description}</p>
            </div>
          ))}
        </div>

        {estimatedCompletion && (
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Estimated completion</span>
              <span className="text-sm font-bold">{estimatedCompletion}</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full w-3/4"></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsightBox;
