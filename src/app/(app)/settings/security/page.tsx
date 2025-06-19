"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, KeyRound, Smartphone, Clock } from "lucide-react";
import React from "react";

export default function SecuritySettingsPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Placeholder state for 2FA
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);

  const handleSaveChanges = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Security settings updated (Demo)!");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-headline font-semibold text-foreground">Security Settings</h2>
        <p className="text-muted-foreground">Manage your account security options.</p>
      </div>
      <Separator />

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline text-lg flex items-center"><KeyRound className="mr-2 h-5 w-5 text-primary"/>Change Password</CardTitle>
          <CardDescription>It&apos;s a good idea to use a strong password that you&apos;re not using elsewhere.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Password management is handled in the Profile settings.</p>
            <Button variant="outline" asChild>
                <a href="/settings">Go to Profile Settings</a>
            </Button>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline text-lg flex items-center"><Smartphone className="mr-2 h-5 w-5 text-primary"/>Two-Factor Authentication (2FA)</CardTitle>
          <CardDescription>Add an extra layer of security to your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-md">
            <Label htmlFor="two-factor-auth" className="flex flex-col space-y-1">
              <span>Enable Two-Factor Authentication</span>
              <span className="font-normal leading-snug text-muted-foreground">
                {twoFactorEnabled ? "2FA is currently active." : "Protect your account with an additional verification step."}
              </span>
            </Label>
            <Switch 
              id="two-factor-auth" 
              checked={twoFactorEnabled} 
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>
          {twoFactorEnabled && (
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-md text-blue-700">
              <p className="text-sm font-semibold">Two-Factor Authentication is Active</p>
              <p className="text-xs">You will be prompted for a verification code from your authenticator app when logging in.</p>
              <Button variant="link" className="p-0 h-auto text-xs mt-1 text-blue-700">Manage 2FA Devices (Placeholder)</Button>
            </div>
          )}
          {!twoFactorEnabled && (
            <Button onClick={() => setTwoFactorEnabled(true)} variant="secondary">Set Up 2FA (Placeholder)</Button>
          )}
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline text-lg flex items-center"><Clock className="mr-2 h-5 w-5 text-primary"/>Login History</CardTitle>
          <CardDescription>Review recent login activity on your account.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center py-8 border-2 border-dashed rounded-md">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Your login history will appear here.</p>
                <p className="text-xs text-muted-foreground">(Feature coming soon)</p>
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
          <Button onClick={handleSaveChanges} disabled={isLoading}>
            {isLoading ? <Shield className="mr-2 h-4 w-4 animate-spin" /> : <Shield className="mr-2 h-4 w-4"/>} {/* Using Shield as Loader2 already in use */}
            Save Security Settings
          </Button>
        </div>
    </div>
  );
}
