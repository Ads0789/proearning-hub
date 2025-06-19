"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BellRing, Mail, MessageSquare } from "lucide-react";
import React from "react";

export default function NotificationSettingsPage() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Notification settings updated (Demo)!");
    }, 1500);
  };

  // Placeholder state for switches - in a real app, this would come from user preferences
  const [notificationsState, setNotificationsState] = React.useState({
    newOpportunities: true,
    paymentUpdates: true,
    appAnnouncements: true,
    emailNewOpportunities: false,
    emailPaymentUpdates: true,
    emailAppAnnouncements: true,
  });

  const handleSwitchChange = (key: keyof typeof notificationsState) => {
    setNotificationsState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-headline font-semibold text-foreground">Notification Settings</h2>
        <p className="text-muted-foreground">Manage how you receive notifications from ProEarning Hub.</p>
      </div>
      <Separator />
      <form onSubmit={handleSubmit} className="space-y-8">
        
        <section className="space-y-4">
            <h3 className="text-lg font-headline font-medium flex items-center"><BellRing className="mr-2 h-5 w-5 text-primary" /> In-App Notifications</h3>
            <div className="flex items-center justify-between p-4 border rounded-md">
                <Label htmlFor="notif-new-opportunities" className="flex flex-col space-y-1">
                    <span>New Opportunity Alerts</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                    Get notified about new opportunities matching your profile.
                    </span>
                </Label>
                <Switch 
                    id="notif-new-opportunities" 
                    checked={notificationsState.newOpportunities} 
                    onCheckedChange={() => handleSwitchChange('newOpportunities')}
                />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-md">
                <Label htmlFor="notif-payment-updates" className="flex flex-col space-y-1">
                    <span>Payment Updates</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                    Receive notifications for successful payments and earnings.
                    </span>
                </Label>
                <Switch 
                    id="notif-payment-updates" 
                    checked={notificationsState.paymentUpdates} 
                    onCheckedChange={() => handleSwitchChange('paymentUpdates')}
                />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-md">
                <Label htmlFor="notif-app-announcements" className="flex flex-col space-y-1">
                    <span>Platform Announcements</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                    Stay informed about new features and important updates.
                    </span>
                </Label>
                <Switch 
                    id="notif-app-announcements" 
                    checked={notificationsState.appAnnouncements} 
                    onCheckedChange={() => handleSwitchChange('appAnnouncements')}
                />
            </div>
        </section>

        <Separator />

        <section className="space-y-4">
            <h3 className="text-lg font-headline font-medium flex items-center"><Mail className="mr-2 h-5 w-5 text-primary" /> Email Notifications</h3>
             <div className="flex items-center justify-between p-4 border rounded-md">
                <Label htmlFor="email-new-opportunities" className="flex flex-col space-y-1">
                    <span>New Opportunity Digest</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                    Receive a daily/weekly summary of relevant opportunities.
                    </span>
                </Label>
                <Switch 
                    id="email-new-opportunities" 
                    checked={notificationsState.emailNewOpportunities} 
                    onCheckedChange={() => handleSwitchChange('emailNewOpportunities')}
                />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-md">
                <Label htmlFor="email-payment-updates" className="flex flex-col space-y-1">
                    <span>Payment Confirmations</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                    Get email receipts for your earnings and payments.
                    </span>
                </Label>
                <Switch 
                    id="email-payment-updates" 
                    checked={notificationsState.emailPaymentUpdates} 
                    onCheckedChange={() => handleSwitchChange('emailPaymentUpdates')}
                />
            </div>
             <div className="flex items-center justify-between p-4 border rounded-md">
                <Label htmlFor="email-app-announcements" className="flex flex-col space-y-1">
                    <span>Newsletter & Updates</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                    Occasional emails about platform news and tips.
                    </span>
                </Label>
                <Switch 
                    id="email-app-announcements" 
                    checked={notificationsState.emailAppAnnouncements} 
                    onCheckedChange={() => handleSwitchChange('emailAppAnnouncements')}
                />
            </div>
        </section>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <MessageSquare className="mr-2 h-4 w-4 animate-spin" />} {/* Using MessageSquare as Loader2 already in use */}
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
