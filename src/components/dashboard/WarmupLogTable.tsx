
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export interface WarmupLogEntry {
  id: string;
  date: string;
  subject: string;
  status: "inbox" | "spam" | "replied";
}

interface WarmupLogTableProps {
  entries: WarmupLogEntry[];
  isLoading?: boolean;
}

const WarmupLogTable = ({ entries, isLoading = false }: WarmupLogTableProps) => {
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

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <div className="h-8 bg-gray-100 animate-pulse rounded w-1/4"></div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Date</TableHead>
              <TableHead>Subject</TableHead>
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">Date</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead className="w-[100px] text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell className="font-medium">{entry.date}</TableCell>
            <TableCell>{entry.subject}</TableCell>
            <TableCell className="text-right">{getStatusBadge(entry.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WarmupLogTable;
