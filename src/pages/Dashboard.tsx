
import React, { useState } from "react";
import LayoutShell from "@/components/dashboard/LayoutShell";
import InboxCard from "@/components/dashboard/InboxCard";
import AIInsightBox from "@/components/dashboard/AIInsightBox";
import WarmupLogTable from "@/components/dashboard/WarmupLogTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InboxSetupWizard from "@/components/onboarding/InboxSetupWizard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

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
    status: "warming" as const,
  },
  {
    id: "2",
    email: "sales@company.com",
    healthScore: 65,
    dailySent: 15,
    dailyReplied: 9,
    dailySpam: 3,
    status: "warming" as const,
  },
  {
    id: "3",
    email: "support@company.com",
    healthScore: 94,
    dailySent: 30,
    dailyReplied: 29,
    dailySpam: 0,
    status: "completed" as const,
  }
];

// Enhanced mock data with more details
const mockWarmupLogs = [
  { 
    id: "l1", 
    date: "2025-04-30T14:25:32Z", 
    subject: "Follow-up on our conversation", 
    status: "inbox" as const,
    fromEmail: "system@warmupsender.com",
    toEmail: "info@company.com",
    openTime: "2025-04-30T14:32:15Z",
    contentPreview: "I wanted to follow up on our previous conversation regarding...",
    aiGenerated: true,
    deliveryScore: 95
  },
  { 
    id: "l2", 
    date: "2025-04-29T10:15:44Z", 
    subject: "Re: Project timeline update", 
    status: "replied" as const,
    fromEmail: "partner@network.com",
    toEmail: "info@company.com",
    openTime: "2025-04-29T10:18:22Z",
    replyTime: "2025-04-29T10:25:30Z",
    contentPreview: "Thanks for sending over the project timeline update. I've reviewed...",
    aiGenerated: false,
    deliveryScore: 92
  },
  { 
    id: "l3", 
    date: "2025-04-28T16:40:12Z", 
    subject: "Introduction to our services", 
    status: "inbox" as const,
    fromEmail: "system@warmupsender.com",
    toEmail: "info@company.com", 
    openTime: "2025-04-28T16:52:01Z",
    contentPreview: "I'd like to introduce our comprehensive service offerings that...",
    aiGenerated: true,
    deliveryScore: 88
  },
  { 
    id: "l4", 
    date: "2025-04-27T09:05:23Z", 
    subject: "Discount opportunity", 
    status: "spam" as const,
    fromEmail: "system@warmupsender.com",
    toEmail: "info@company.com",
    spamTime: "2025-04-27T09:06:45Z",
    contentPreview: "Limited time discount opportunity for your consideration...",
    aiGenerated: true,
    deliveryScore: 42
  },
  { 
    id: "l5", 
    date: "2025-04-26T13:22:56Z", 
    subject: "Weekly newsletter", 
    status: "inbox" as const,
    fromEmail: "newsletter@network.com",
    toEmail: "info@company.com",
    openTime: "2025-04-26T14:15:30Z",
    contentPreview: "This week's top stories and updates from around the industry...",
    aiGenerated: false,
    deliveryScore: 90
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedInbox, setSelectedInbox] = useState<string | null>("1");
  const [notificationCount] = useState(3);
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const [activityView, setActivityView] = useState<"recent" | "all">("recent");
  
  const handleSelectInbox = (id: string) => {
    setSelectedInbox(id);
  };

  const handleViewProfile = () => {
    console.log("View profile");
  };

  const handleViewBilling = () => {
    console.log("View billing");
    navigate("/billing");
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  const handleViewNotifications = () => {
    console.log("View notifications");
  };

  const handleInboxSetupComplete = () => {
    setShowSetupWizard(false);
  };

  const handleAddNewInbox = () => {
    setShowSetupWizard(true);
  };

  const handleViewInboxDetail = (id: string) => {
    navigate(`/inbox/${id}`);
  };

  const selectedInboxData = mockInboxes.find(inbox => inbox.id === selectedInbox);

  if (showSetupWizard) {
    return <InboxSetupWizard onComplete={handleInboxSetupComplete} onCancel={() => setShowSetupWizard(false)} />;
  }

  // Filter logs based on selected inbox
  const filteredLogs = selectedInbox 
    ? mockWarmupLogs.filter(log => log.toEmail === selectedInboxData?.email) 
    : mockWarmupLogs;

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
          <Button className="mt-4 md:mt-0" onClick={handleAddNewInbox}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Inbox
          </Button>
        </div>

        {/* Inbox cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockInboxes.map((inbox) => (
            <InboxCard
              key={inbox.id}
              email={inbox.email}
              healthScore={inbox.healthScore}
              sentCount={inbox.dailySent}
              repliedCount={inbox.dailyReplied}
              spamCount={inbox.dailySpam}
              status={inbox.status}
              onViewActivity={() => handleViewInboxDetail(inbox.id)}
              onToggleStatus={() => console.log(`Toggle status for ${inbox.email}`)}
            />
          ))}
        </div>

        {/* Activity summary box */}
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Warm-up Activity Summary</CardTitle>
              <CardDescription>Overview of all warming activities across inboxes</CardDescription>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{format(new Date(), "MMMM d, yyyy")}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-sm text-blue-600 font-medium">Total Emails Sent</div>
                <div className="text-2xl font-bold mt-1">{mockInboxes.reduce((sum, inbox) => sum + inbox.dailySent, 0)}</div>
                <div className="text-xs text-blue-500 mt-1">Last 24 hours</div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="text-sm text-green-600 font-medium">Total Replies</div>
                <div className="text-2xl font-bold mt-1">{mockInboxes.reduce((sum, inbox) => sum + inbox.dailyReplied, 0)}</div>
                <div className="text-xs text-green-500 mt-1">Last 24 hours</div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="text-sm text-red-600 font-medium">Spam Flags</div>
                <div className="text-2xl font-bold mt-1">{mockInboxes.reduce((sum, inbox) => sum + inbox.dailySpam, 0)}</div>
                <div className="text-xs text-red-500 mt-1">Last 24 hours</div>
              </div>
              
              <div className="bg-violet-50 p-4 rounded-lg border border-violet-100">
                <div className="text-sm text-violet-600 font-medium">Average Health Score</div>
                <div className="text-2xl font-bold mt-1">
                  {Math.round(mockInboxes.reduce((sum, inbox) => sum + inbox.healthScore, 0) / mockInboxes.length)}%
                </div>
                <div className="text-xs text-violet-500 mt-1">Across all inboxes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected inbox details */}
        {selectedInboxData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Warm-up Activity</CardTitle>
                    <CardDescription>Recent email warm-up logs for {selectedInboxData.email}</CardDescription>
                  </div>
                  <Tabs 
                    value={activityView} 
                    onValueChange={(value) => setActivityView(value as "recent" | "all")}
                    className="w-auto"
                  >
                    <TabsList className="grid w-[180px] grid-cols-2">
                      <TabsTrigger value="recent">Recent</TabsTrigger>
                      <TabsTrigger value="all">All Activity</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <WarmupLogTable 
                    entries={activityView === "recent" ? filteredLogs.slice(0, 5) : filteredLogs} 
                    showDetailedView={activityView === "all"} 
                  />
                  
                  {activityView === "recent" && filteredLogs.length > 5 && (
                    <div className="mt-4 text-center">
                      <Button 
                        variant="outline" 
                        onClick={() => setActivityView("all")}
                        className="text-blue-600"
                      >
                        View All Activity
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div>
              <AIInsightBox 
                inboxEmail={selectedInboxData.email}
                insights={[
                  { 
                    title: "Open Rate Improvement", 
                    description: "Your open rate rose by 12% this week.", 
                    type: "positive" 
                  },
                  { 
                    title: "Spam Flags Reduced", 
                    description: "Spam flags dropped below 5%.", 
                    type: "positive" 
                  },
                  { 
                    title: "Ready for Outreach", 
                    description: "You're ready to start outreach soon.", 
                    type: "info" 
                  }
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
