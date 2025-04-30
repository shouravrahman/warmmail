
import React, { useState } from "react";
import LayoutShell from "@/components/dashboard/LayoutShell";
import InboxCard from "@/components/dashboard/InboxCard";
import AIInsightBox from "@/components/dashboard/AIInsightBox";
import WarmupLogTable from "@/components/dashboard/WarmupLogTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Mock data
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatarUrl: "https://via.placeholder.com/40",
};

const mockInboxes = [
  {
    id: "1",
    email: "info@company.com",
    healthScore: 82,
    dailySent: 24,
    dailyReplied: 18,
    dailySpam: 1,
    status: "warming",
  },
  {
    id: "2",
    email: "sales@company.com",
    healthScore: 65,
    dailySent: 15,
    dailyReplied: 9,
    dailySpam: 3,
    status: "warming",
  },
  {
    id: "3",
    email: "support@company.com",
    healthScore: 94,
    dailySent: 30,
    dailyReplied: 29,
    dailySpam: 0,
    status: "completed",
  }
];

const mockWarmupLogs = [
  { id: "l1", date: "2025-04-30", subject: "Follow-up on our conversation", status: "inbox" },
  { id: "l2", date: "2025-04-29", subject: "Re: Project timeline update", status: "replied" },
  { id: "l3", date: "2025-04-28", subject: "Introduction to our services", status: "inbox" },
  { id: "l4", date: "2025-04-27", subject: "Discount opportunity", status: "spam" },
  { id: "l5", date: "2025-04-26", subject: "Weekly newsletter", status: "inbox" },
];

const Dashboard = () => {
  const [selectedInbox, setSelectedInbox] = useState<string | null>("1");
  const [notificationCount] = useState(3);
  
  const handleSelectInbox = (id: string) => {
    setSelectedInbox(id);
  };

  const handleViewProfile = () => {
    console.log("View profile");
  };

  const handleViewBilling = () => {
    console.log("View billing");
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  const handleViewNotifications = () => {
    console.log("View notifications");
  };

  const selectedInboxData = mockInboxes.find(inbox => inbox.id === selectedInbox);

  return (
    <LayoutShell
      user={mockUser}
      inboxes={mockInboxes}
      onSelectInbox={handleSelectInbox}
      onViewProfile={handleViewProfile}
      onViewBilling={handleViewBilling}
      onLogout={handleLogout}
      notificationCount={notificationCount}
      onViewNotifications={handleViewNotifications}
    >
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Inbox Dashboard</h1>
            <p className="text-gray-500">Manage and monitor your email warm-up</p>
          </div>
          <Button className="mt-4 md:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Add New Inbox
          </Button>
        </div>

        {/* Inbox cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockInboxes.map((inbox) => (
            <InboxCard
              key={inbox.id}
              id={inbox.id}
              email={inbox.email}
              healthScore={inbox.healthScore}
              status={inbox.status}
              dailySent={inbox.dailySent}
              dailyReplied={inbox.dailyReplied}
              dailySpam={inbox.dailySpam}
              selected={selectedInbox === inbox.id}
              onViewDetails={() => setSelectedInbox(inbox.id)}
            />
          ))}
        </div>

        {/* Selected inbox details */}
        {selectedInboxData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Warm-up Activity</CardTitle>
                  <CardDescription>Recent email warm-up logs for {selectedInboxData.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <WarmupLogTable entries={mockWarmupLogs} />
                </CardContent>
              </Card>
            </div>
            <div>
              <AIInsightBox 
                inbox={selectedInboxData.email}
                healthScore={selectedInboxData.healthScore}
                insights={[
                  "Your open rate rose by 12% this week.",
                  "Spam flags dropped below 5%.",
                  "You're ready to start outreach soon."
                ]}
                estimatedCompletion="5 days"
              />
            </div>
          </div>
        )}
      </div>
    </LayoutShell>
  );
};

export default Dashboard;
