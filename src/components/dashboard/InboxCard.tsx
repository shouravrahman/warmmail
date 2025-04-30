
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HealthScoreGauge from "./HealthScoreGauge";
import { Mail, Pause, Play } from "lucide-react";

interface InboxCardProps {
  email: string;
  healthScore: number;
  sentCount: number;
  repliedCount: number;
  spamCount: number;
  status: "warming" | "completed" | "paused";
  onViewActivity: () => void;
  onToggleStatus: () => void;
}

const InboxCard = ({
  email,
  healthScore,
  sentCount,
  repliedCount,
  spamCount,
  status,
  onViewActivity,
  onToggleStatus,
}: InboxCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "warming": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "paused": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "warming": return "Warming";
      case "completed": return "Completed";
      case "paused": return "Paused";
      default: return "Unknown";
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <CardTitle className="text-lg font-bold">{email}</CardTitle>
            </div>
            <Badge 
              variant="outline" 
              className={`mt-2 ${getStatusColor()}`}
            >
              {getStatusText()}
            </Badge>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={onToggleStatus}
          >
            {status === "paused" ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between">
          <HealthScoreGauge score={healthScore} size={80} />
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-sm font-medium text-gray-400">Sent</div>
              <div className="font-bold">{sentCount}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-400">Replies</div>
              <div className="font-bold">{repliedCount}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-400">Spam</div>
              <div className="font-bold">{spamCount}</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={onViewActivity}
        >
          View Activity
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InboxCard;
