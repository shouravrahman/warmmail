
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

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

const mockWarmupLogs = [
  { id: "l1", date: "2025-04-30", subject: "Follow-up on our conversation", status: "inbox" as const },
  { id: "l2", date: "2025-04-29", subject: "Re: Project timeline update", status: "replied" as const },
  { id: "l3", date: "2025-04-28", subject: "Introduction to our services", status: "inbox" as const },
  { id: "l4", date: "2025-04-27", subject: "Discount opportunity", status: "spam" as const },
  { id: "l5", date: "2025-04-26", subject: "Weekly newsletter", status: "inbox" as const },
  { id: "l6", date: "2025-04-25", subject: "Meeting request", status: "replied" as const },
  { id: "l7", date: "2025-04-24", subject: "Important update", status: "inbox" as const },
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
                  <Label htmlFor="inbox-status" className={isActive ? "text-green-600 mr-2" : "text-gray-400 mr-2"}>
                    {isActive ? "Active" : "Paused"}
                  </Label>
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
                      <BarChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
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
                      <LineChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Spam Rate']} />
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
                <WarmupLogTable entries={mockWarmupLogs} />
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
