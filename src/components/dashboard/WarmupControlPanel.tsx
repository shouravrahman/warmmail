
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoIcon } from "lucide-react";

interface WarmupControlPanelProps {
  isActive: boolean;
  dailyEmailCount: number;
  timeRange: {
    start: string;
    end: string;
  };
  onUpdateSettings: (settings: {
    isActive?: boolean;
    dailyEmailCount?: number;
    timeRange?: {
      start: string;
      end: string;
    };
  }) => void;
}

const WarmupControlPanel = ({
  isActive,
  dailyEmailCount,
  timeRange,
  onUpdateSettings,
}: WarmupControlPanelProps) => {
  const [localDailyCount, setLocalDailyCount] = useState(dailyEmailCount);
  
  const handleCountChange = (values: number[]) => {
    setLocalDailyCount(values[0]);
  };
  
  const handleCountChangeCommitted = () => {
    onUpdateSettings({ dailyEmailCount: localDailyCount });
  };
  
  const handleTimeRangeChange = (key: 'start' | 'end', value: string) => {
    onUpdateSettings({
      timeRange: {
        ...timeRange,
        [key]: value,
      },
    });
  };

  const handleToggleActive = () => {
    onUpdateSettings({ isActive: !isActive });
  };

  const timeOptions = [
    "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Warm-up Settings</CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="warmup-active" className={isActive ? "text-green-600" : "text-gray-400"}>
              {isActive ? "Active" : "Paused"}
            </Label>
            <Switch
              id="warmup-active"
              checked={isActive}
              onCheckedChange={handleToggleActive}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Daily Email Count Control */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h3 className="text-sm font-medium">Daily Email Count</h3>
              <div className="ml-2 text-gray-500 cursor-help">
                <InfoIcon size={16} />
              </div>
            </div>
            <div className="text-xl font-semibold">{localDailyCount}</div>
          </div>
          <Slider
            disabled={!isActive}
            value={[localDailyCount]}
            min={5}
            max={50}
            step={5}
            onValueChange={handleCountChange}
            onValueCommit={handleCountChangeCommitted}
            className={!isActive ? "opacity-50" : ""}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Conservative (5)</span>
            <span>Aggressive (50)</span>
          </div>
        </div>

        {/* Time Range Controls */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Active Hours (UTC)</h3>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="start-time" className="text-xs text-gray-500 mb-1">Start Time</Label>
              <Select
                disabled={!isActive}
                value={timeRange.start}
                onValueChange={(value) => handleTimeRangeChange('start', value)}
              >
                <SelectTrigger id="start-time" className={!isActive ? "opacity-50" : ""}>
                  <SelectValue placeholder="Select start time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={`start-${time}`} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="end-time" className="text-xs text-gray-500 mb-1">End Time</Label>
              <Select
                disabled={!isActive}
                value={timeRange.end}
                onValueChange={(value) => handleTimeRangeChange('end', value)}
              >
                <SelectTrigger id="end-time" className={!isActive ? "opacity-50" : ""}>
                  <SelectValue placeholder="Select end time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={`end-${time}`} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Email Template Preview */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Email Template</h3>
          <div className="border rounded-md p-3 bg-gray-50">
            <div className="bg-white border rounded p-3 text-sm text-gray-600">
              <p className="font-medium mb-2">Subject: InboxWarm System Update</p>
              <p>Hello,</p>
              <p className="my-2">This is an automated warm-up email to help improve your email deliverability...</p>
              <p>Best,<br/>InboxWarm System</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Advanced Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WarmupControlPanel;
