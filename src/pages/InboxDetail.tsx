
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LayoutShell from "@/components/dashboard/LayoutShell";
import HealthScoreGauge from "@/components/dashboard/HealthScoreGauge";
import WarmupLogTable from "@/components/dashboard/WarmupLogTable";
import WarmupControlPanel from "@/components/dashboard/WarmupControlPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from "recharts";

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

const mockChartData = [
  { date: '04/24', sent: 5, replied: 3, spam: 1 },
  { date: '04/25', sent: 7, replied: 5, spam: 0 },
  { date: '04/26', sent: 10, replied: 7, spam: 1 },
  { date: '04/27', sent: 12, replied: 10, spam: 0 },
  { date: '04/28', sent: 15, replied: 13, spam: 0 },
  { date: '04/29', sent: 18, replied: 15, spam: 0 },
  { date: '04/30', sent: 20, replied: 17, spam: 0 },
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
  { 
    id: "l6", 
    date: "2025-04-25T11:10:33Z", 
    subject: "Meeting request", 
    status: "replied" as const,
    fromEmail: "contact@network.com",
    toEmail: "info@company.com",
    openTime: "2025-04-25T11:15:22Z",
    replyTime: "2025-04-25T11:45:18Z",
    contentPreview: "I'd like to schedule a meeting to discuss potential collaboration...",
    aiGenerated: false,
    deliveryScore: 94
  },
  { 
    id: "l7", 
    date: "2025-04-24T08:30:15Z", 
    subject: "Important update", 
    status: "inbox" as const,
    fromEmail: "system@warmupsender.com",
    toEmail: "info@company.com",
    openTime: "2025-04-24T09:05:42Z",
    contentPreview: "I wanted to share an important update regarding our upcoming...",
    aiGenerated: true,
    deliveryScore: 85
  },
];

const InboxDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [isActive, setIsActive] = useState(true);
  const [notificationCount] = useState(3);

  const inbox = mockInboxes.find(inbox => inbox.id === id);
  
  const handleSelectInbox = (id: string) => {
    console.log(`Selected inbox: ${id}`);
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

  const handleUpdateSettings = (settings: {
    isActive?: boolean;
    dailyEmailCount?: number;
    timeRange?: {
      start: string;
      end: string;
    };
  }) => {
    console.log("Update settings:", settings);
    if (typeof settings.isActive !== 'undefined') {
      setIsActive(settings.isActive);
    }
  };

  if (!inbox) {
    return <div>Inbox not found</div>;
  }

  // Format data for better display on charts
  const formattedChartData = mockChartData.map(item => ({
    ...item,
    date: new Date(2025, 3, parseInt(item.date.split('/')[1])).toLocaleDateString('en-US', {
      month: 'short', 
      day: 'numeric'
    })
  }));

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
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="inline-flex items-center mb-2">
              <h1 className="text-2xl font-bold">{inbox.email}</h1>
              <div className="ml-3">
                <div className="flex items-center">
                  <Badge variant={isActive ? "secondary" : "outline"} className="mr-2">
                    {isActive ? "Active" : "Paused"}
                  </Badge>
                  <Switch
                    id="inbox-status"
                    checked={isActive}
                    onCheckedChange={(checked) => {
                      setIsActive(checked);
                      handleUpdateSettings({ isActive: checked });
                    }}
                  />
                </div>
              </div>
            </div>
            <p className="text-gray-500">Manage inbox warming settings and view performance</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <HealthScoreGauge score={inbox.healthScore} size={60} />
              <div>
                <div className="text-sm text-gray-500">Health Score</div>
                <div className="text-xl font-bold">{inbox.healthScore}%</div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Email Activity</CardTitle>
                  <CardDescription>Daily emails sent, replied, and spam placement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={formattedChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <RechartsTooltip 
                          formatter={(value, name) => {
                            return [`${value} emails`, name];
                          }}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Bar dataKey="sent" fill="#3B82F6" name="Sent" />
                        <Bar dataKey="replied" fill="#10B981" name="Replied" />
                        <Bar dataKey="spam" fill="#EF4444" name="Spam" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Spam Rate</CardTitle>
                  <CardDescription>Percentage of emails marked as spam</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={formattedChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <RechartsTooltip 
                          formatter={(value) => [`${value}%`, 'Spam Rate']} 
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Line 
                          type="monotone" 
                          dataKey={(entry) => (entry.spam / entry.sent) * 100} 
                          stroke="#EF4444" 
                          name="Spam Rate" 
                          dot={{ r: 4 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest warm-up emails</CardDescription>
              </CardHeader>
              <CardContent>
                <WarmupLogTable entries={mockWarmupLogs.slice(0, 5)} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Detailed history of warm-up emails</CardDescription>
              </CardHeader>
              <CardContent>
                <WarmupLogTable entries={mockWarmupLogs} showDetailedView={true} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <WarmupControlPanel 
              isActive={isActive} 
              dailyEmailCount={inbox.dailySent} 
              timeRange={{ start: "09:00", end: "17:00" }}
              onUpdateSettings={handleUpdateSettings}
            />
          </TabsContent>
        </Tabs>
      </div>
    </LayoutShell>
  );
};

export default InboxDetail;
