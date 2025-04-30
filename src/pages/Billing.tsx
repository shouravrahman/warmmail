
import React, { useState } from "react";
import LayoutShell from "@/components/dashboard/LayoutShell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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

interface Plan {
  id: string;
  name: string;
  price: number;
  inboxAllowance: number;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    inboxAllowance: 1,
    features: [
      "1 Inbox",
      "Basic Warm-up",
      "Email Log",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    inboxAllowance: 3,
    features: [
      "3 Inboxes",
      "Advanced Analytics",
      "Priority Support",
      "Spam Detection",
      "Custom Warm-up Schedule",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    price: 79,
    inboxAllowance: 10,
    features: [
      "10 Inboxes",
      "Team Access",
      "White-labeled Reports",
      "API Access",
      "Dedicated Account Manager",
      "Custom Warm-up Templates",
    ],
  },
];

const mockInvoices = [
  { id: "INV-001", date: "2025-04-01", amount: 29, status: "paid" },
  { id: "INV-002", date: "2025-03-01", amount: 29, status: "paid" },
  { id: "INV-003", date: "2025-02-01", amount: 29, status: "paid" },
];

const Billing = () => {
  const [notificationCount] = useState(3);
  const currentPlan = plans[1]; // Pro plan for demo
  const inboxesUsed = mockInboxes.length;
  const usagePercentage = (inboxesUsed / currentPlan.inboxAllowance) * 100;

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

  const handleManageSubscription = () => {
    console.log("Manage subscription");
  };

  const handleUpgradePlan = () => {
    console.log("Upgrade plan");
  };

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
        <div>
          <h1 className="text-2xl font-bold">Billing & Plans</h1>
          <p className="text-gray-500">Manage your subscription and billing information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your current subscription details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold">{currentPlan.name}</h3>
                    <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">Active</Badge>
                  </div>
                  <p className="text-gray-500">
                    ${currentPlan.price}/month • Renews on May 1, 2025
                  </p>
                </div>
                <Button variant="outline" onClick={handleManageSubscription}>
                  Manage Subscription
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Inbox Usage</span>
                  <span className="text-sm font-medium">
                    {inboxesUsed} of {currentPlan.inboxAllowance} inboxes
                  </span>
                </div>
                <Progress value={usagePercentage} className="h-2" />
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium mb-2">Features Included</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <svg className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {currentPlan.id !== "agency" && (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-md">
                  <div className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <h4 className="font-medium text-blue-800">Need more inboxes?</h4>
                      <p className="text-sm text-blue-600 mt-1">
                        Upgrade to the {currentPlan.id === "free" ? "Pro" : "Agency"} plan to warm up more inboxes simultaneously.
                      </p>
                      <Button className="mt-3" variant="outline" onClick={handleUpgradePlan}>
                        Upgrade Plan
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Your current payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-2 rounded">
                  <svg className="h-8 w-8 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Visa ending in 4242</div>
                  <div className="text-sm text-gray-500">Expires 12/2029</div>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  Update Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>Your recent invoices and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3">Invoice</th>
                    <th scope="col" className="px-4 py-3">Date</th>
                    <th scope="col" className="px-4 py-3">Amount</th>
                    <th scope="col" className="px-4 py-3">Status</th>
                    <th scope="col" className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockInvoices.map((invoice) => (
                    <tr key={invoice.id} className="bg-white border-b">
                      <td className="px-4 py-4 font-medium text-gray-900">{invoice.id}</td>
                      <td className="px-4 py-4">{invoice.date}</td>
                      <td className="px-4 py-4">${invoice.amount.toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <Badge 
                          variant="outline" 
                          className={invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}
                        >
                          {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <Button variant="outline">
              View All Invoices
            </Button>
          </CardFooter>
        </Card>
      </div>
    </LayoutShell>
  );
};

export default Billing;
