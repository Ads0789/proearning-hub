"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Camera, Loader2 } from "lucide-react";
import React from "react";

// Placeholder user data
const user = {
  fullName: "Demo User",
  email: "user@example.com",
  bio: "Experienced professional seeking new opportunities.",
  avatarUrl: "https://placehold.co/150x150.png",
};

export default function ProfileSettingsPage() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Profile updated (Demo)!");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-headline font-semibold text-foreground">Profile Settings</h2>
        <p className="text-muted-foreground">Update your personal information and preferences.</p>
      </div>
      <Separator />
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage src={user.avatarUrl} alt={user.fullName} data-ai-hint="profile picture" />
              <AvatarFallback>{user.fullName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background hover:bg-secondary">
                <Camera className="h-4 w-4"/>
                <span className="sr-only">Change avatar</span>
            </Button>
          </div>
          <div>
            <Label htmlFor="avatarFile" className="text-sm font-medium text-primary hover:underline cursor-pointer">
                Upload new picture
            </Label>
            <Input id="avatarFile" type="file" className="hidden"/>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 5MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" defaultValue={user.fullName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue={user.email} disabled />
            <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" defaultValue={user.bio} placeholder="Tell us a bit about yourself..." className="min-h-[100px]" />
        </div>

        <Separator />
        
        <div>
            <h3 className="text-lg font-headline font-medium">Password Change</h3>
            <p className="text-sm text-muted-foreground mb-4">Leave blank if you don&apos;t want to change your password.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                </div>
            </div>
        </div>


        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
