
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Mail, Clock, AlertCircle } from "lucide-react";

export interface WarmupLogEntry {
  id: string;
  date: string; // ISO date string
  subject: string;
  status: "inbox" | "spam" | "replied";
  fromEmail?: string;
  toEmail?: string;
  openTime?: string; // ISO date string for when email was opened
  replyTime?: string; // ISO date string for when email was replied to
  spamTime?: string; // ISO date string for when email was marked as spam
  contentPreview?: string;
  aiGenerated?: boolean;
  deliveryScore?: number;
}

interface WarmupLogTableProps {
  entries: WarmupLogEntry[];
  isLoading?: boolean;
  showDetailedView?: boolean;
}

const WarmupLogTable = ({ 
  entries, 
  isLoading = false, 
  showDetailedView = false 
}: WarmupLogTableProps) => {
  const getStatusBadge = (status: WarmupLogEntry["status"]) => {
    switch (status) {
      case "inbox":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Inbox</Badge>;
      case "spam":
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Spam</Badge>;
      case "replied":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Replied</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM d, yyyy 'at' h:mm a");
    } catch (e) {
      return dateString;
    }
  };

  const formatShortDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM d, h:mm a");
    } catch (e) {
      return dateString;
    }
  };

  const getTimeTooltip = (entry: WarmupLogEntry) => {
    let tooltipText = "";
    
    if (entry.status === "replied" && entry.replyTime) {
      const sentTime = new Date(entry.date);
      const replyTime = new Date(entry.replyTime);
      const diffInMinutes = Math.round((replyTime.getTime() - sentTime.getTime()) / (1000 * 60));
      
      tooltipText = `Replied after ${diffInMinutes} minutes`;
    } else if (entry.status === "spam" && entry.spamTime) {
      tooltipText = `Marked as spam at ${formatShortDate(entry.spamTime)}`;
    } else if (entry.openTime) {
      tooltipText = `Opened at ${formatShortDate(entry.openTime)}`;
    }
    
    return tooltipText;
  };

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <div className="h-8 bg-gray-100 animate-pulse rounded w-1/4"></div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Date & Time</TableHead>
              <TableHead>Subject</TableHead>
              {showDetailedView && <TableHead>Details</TableHead>}
              <TableHead className="w-[100px] text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(5).fill(0).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  <div className="h-4 bg-gray-100 animate-pulse rounded w-2/3"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-100 animate-pulse rounded w-full"></div>
                </TableCell>
                {showDetailedView && (
                  <TableCell>
                    <div className="h-4 bg-gray-100 animate-pulse rounded w-full"></div>
                  </TableCell>
                )}
                <TableCell className="text-right">
                  <div className="h-6 bg-gray-100 animate-pulse rounded w-20 ml-auto"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-medium text-gray-500">No warmup activity yet</h3>
        <p className="mt-2 text-sm text-gray-400">
          Activity logs will appear here once the warm-up process begins
        </p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Date & Time</TableHead>
            <TableHead>Subject</TableHead>
            {showDetailedView && <TableHead>Details</TableHead>}
            <TableHead className="w-[100px] text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">
                {formatDateTime(entry.date)}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="mr-2">{entry.subject}</span>
                  {entry.aiGenerated && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className="bg-violet-100 text-violet-800 text-xs">AI</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>AI-generated content</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                
                {showDetailedView && entry.contentPreview && (
                  <div className="mt-1 text-sm text-gray-500 line-clamp-1">{entry.contentPreview}</div>
                )}
              </TableCell>
              
              {showDetailedView && (
                <TableCell>
                  <div className="space-y-1">
                    {(entry.fromEmail || entry.toEmail) && (
                      <div className="flex flex-col text-xs">
                        {entry.fromEmail && <span className="text-gray-500">From: <span className="text-gray-700">{entry.fromEmail}</span></span>}
                        {entry.toEmail && <span className="text-gray-500">To: <span className="text-gray-700">{entry.toEmail}</span></span>}
                      </div>
                    )}
                    
                    {entry.deliveryScore !== undefined && (
                      <div className="flex items-center mt-2">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              entry.deliveryScore > 80 ? 'bg-green-500' : 
                              entry.deliveryScore > 50 ? 'bg-amber-500' : 
                              'bg-red-500'
                            }`}
                            style={{ width: `${entry.deliveryScore}%` }}
                          ></div>
                        </div>
                        <span className="text-xs ml-2 text-gray-600">{entry.deliveryScore}%</span>
                      </div>
                    )}
                  </div>
                </TableCell>
              )}
              
              <TableCell className="text-right">
                <div className="flex flex-col items-end">
                  {getStatusBadge(entry.status)}
                  
                  {(entry.openTime || entry.replyTime || entry.spamTime) && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {entry.status === "replied" ? "Replied" : entry.status === "spam" ? "Flagged" : "Opened"}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{getTimeTooltip(entry)}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
};

export default WarmupLogTable;
