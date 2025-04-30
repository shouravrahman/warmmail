
import React, { useState } from "react";
import { StepWizard, Step } from "@/components/onboarding/StepWizard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Mail, Inbox } from "lucide-react";

interface InboxSetupWizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

const InboxSetupWizard: React.FC<InboxSetupWizardProps> = ({ onComplete, onCancel }) => {
  const [emailProvider, setEmailProvider] = useState<string>("gmail");
  const [emailDetails, setEmailDetails] = useState({
    email: "",
    password: "",
    server: "",
    port: "",
  });
  const [warmupPlan, setWarmupPlan] = useState<string>("slow");
  const [dailyEmails, setDailyEmails] = useState<number>(5);
  const [timeRange, setTimeRange] = useState({
    start: "09:00",
    end: "17:00",
  });

  const handleEmailDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const timeOptions = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0');
    timeOptions.push(`${hour}:00`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Setup Your Inbox</CardTitle>
          <CardDescription>Connect your email to start warming it up</CardDescription>
        </CardHeader>
        <CardContent>
          <StepWizard onComplete={onComplete} onCancel={onCancel}>
            {/* Step 1: Choose Email Provider */}
            <Step title="Choose Email Provider">
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                    <Mail size={24} />
                  </div>
                  <h3 className="text-lg font-medium">Select your email provider</h3>
                  <p className="text-sm text-gray-500 mt-1">We'll customize the setup process based on your provider</p>
                </div>

                <RadioGroup value={emailProvider} onValueChange={setEmailProvider} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="gmail" id="gmail" className="peer sr-only" />
                    <Label 
                      htmlFor="gmail" 
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
                    >
                      <div className="mb-3 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 7L12 13L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M4 7V17H20V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M4 7H20V17H4V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Gmail</p>
                        <p className="text-sm text-gray-500">Connect via OAuth</p>
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="outlook" id="outlook" className="peer sr-only" />
                    <Label 
                      htmlFor="outlook" 
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
                    >
                      <div className="mb-3 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                          <path d="M3 10L12 15L21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Outlook</p>
                        <p className="text-sm text-gray-500">Connect via OAuth</p>
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="smtp" id="smtp" className="peer sr-only" />
                    <Label 
                      htmlFor="smtp" 
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
                    >
                      <div className="mb-3 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6H20C21.1 6 22 6.9 22 8V16C22 17.1 21.1 18 20 18H4C2.9 18 2 17.1 2 16V8C2 6.9 2.9 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M22 8L12 13L2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">SMTP</p>
                        <p className="text-sm text-gray-500">Manual configuration</p>
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="imap" id="imap" className="peer sr-only" />
                    <Label 
                      htmlFor="imap" 
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
                    >
                      <div className="mb-3 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M5.45 5.11L2 12V19C2 19.5304 2.21071 20.0391 2.58579 20.4142C2.96086 20.7893 3.46957 21 4 21H20C20.5304 21 21.0391 20.7893 21.4142 20.4142C21.7893 20.0391 22 19.5304 22 19V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M16 16C16 17.1046 15.1046 18 14 18C12.8954 18 12 17.1046 12 16C12 14.8954 12.8954 14 14 14C15.1046 14 16 14.8954 16 16Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">IMAP</p>
                        <p className="text-sm text-gray-500">Manual configuration</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </Step>

            {/* Step 2: Connect Email */}
            <Step title="Connect Your Email">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                    <Inbox size={24} />
                  </div>
                  <h3 className="text-lg font-medium">Enter email credentials</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {emailProvider === 'gmail' || emailProvider === 'outlook'
                      ? 'Click to authorize with your account'
                      : 'Configure your email server details'}
                  </p>
                </div>

                {(emailProvider === 'gmail' || emailProvider === 'outlook') ? (
                  <div className="flex justify-center">
                    <Button className="w-full max-w-sm">
                      Connect with {emailProvider === 'gmail' ? 'Google' : 'Microsoft'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="your@email.com" 
                          value={emailDetails.email} 
                          onChange={handleEmailDetailsChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                          id="password" 
                          name="password" 
                          type="password" 
                          placeholder="Your email password" 
                          value={emailDetails.password} 
                          onChange={handleEmailDetailsChange} 
                        />
                      </div>
                    </div>

                    {emailProvider === 'smtp' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="server">SMTP Server</Label>
                          <Input 
                            id="server" 
                            name="server" 
                            placeholder="smtp.example.com" 
                            value={emailDetails.server} 
                            onChange={handleEmailDetailsChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="port">Port</Label>
                          <Input 
                            id="port" 
                            name="port" 
                            placeholder="587" 
                            value={emailDetails.port} 
                            onChange={handleEmailDetailsChange} 
                          />
                        </div>
                      </div>
                    )}

                    {emailProvider === 'imap' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="server">IMAP Server</Label>
                          <Input 
                            id="server" 
                            name="server" 
                            placeholder="imap.example.com" 
                            value={emailDetails.server} 
                            onChange={handleEmailDetailsChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="port">Port</Label>
                          <Input 
                            id="port" 
                            name="port" 
                            placeholder="993" 
                            value={emailDetails.port} 
                            onChange={handleEmailDetailsChange} 
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Step>

            {/* Step 3: Choose Warm-up Plan */}
            <Step title="Choose Warm-up Plan">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium">Select your warm-up strategy</h3>
                  <p className="text-sm text-gray-500 mt-1">Choose how fast you want to warm up your inbox</p>
                </div>

                <RadioGroup value={warmupPlan} onValueChange={setWarmupPlan} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="slow" id="slow" className="peer sr-only" />
                    <Label 
                      htmlFor="slow" 
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
                    >
                      <div className="mb-3 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Start Slow</p>
                        <p className="text-sm text-gray-500">5 emails per day</p>
                        <p className="text-xs text-gray-400 mt-1">Recommended for new inboxes</p>
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="fast" id="fast" className="peer sr-only" />
                    <Label 
                      htmlFor="fast" 
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
                    >
                      <div className="mb-3 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Fast Recovery</p>
                        <p className="text-sm text-gray-500">15 emails per day</p>
                        <p className="text-xs text-gray-400 mt-1">For damaged reputations</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="space-y-4 pt-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Daily Emails</Label>
                      <span className="font-medium">{dailyEmails} emails/day</span>
                    </div>
                    <Slider 
                      value={[dailyEmails]} 
                      min={1} 
                      max={30} 
                      step={1} 
                      onValueChange={(value) => setDailyEmails(value[0])} 
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">Conservative</span>
                      <span className="text-xs text-gray-500">Aggressive</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-time">Start Time</Label>
                      <Select value={timeRange.start} onValueChange={(value) => setTimeRange(prev => ({ ...prev, start: value }))}>
                        <SelectTrigger id="start-time">
                          <SelectValue placeholder="Select start time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={`start-${time}`} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-time">End Time</Label>
                      <Select value={timeRange.end} onValueChange={(value) => setTimeRange(prev => ({ ...prev, end: value }))}>
                        <SelectTrigger id="end-time">
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
              </div>
            </Step>

            {/* Step 4: Summary */}
            <Step title="Review & Finish">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium">You're all set!</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Your inbox warming will start immediately
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="font-medium">{emailDetails.email || `Connected ${emailProvider} account`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Warm-up Plan:</span>
                    <span className="font-medium">{warmupPlan === 'slow' ? 'Start Slow (5/day)' : 'Fast Recovery (15/day)'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Daily Emails:</span>
                    <span className="font-medium">{dailyEmails} emails/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Active Hours:</span>
                    <span className="font-medium">{timeRange.start} - {timeRange.end}</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-medium text-blue-800">What happens next?</h4>
                      <p className="mt-1 text-sm text-blue-700">
                        Your inbox will start receiving and sending warm-up emails automatically. You'll see your health score improve over time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
          </StepWizard>
        </CardContent>
      </Card>
    </div>
  );
};

export default InboxSetupWizard;
