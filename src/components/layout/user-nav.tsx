"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOut, Settings, User, Bell, Sun, Moon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from 'react';
import { useTheme } from "next-themes";


// This is a placeholder. In a real app, you'd get this from your auth context/session.
const useUser = () => {
  const [user, setUser] = useState<{ name: string; email: string; imageUrl?: string } | null>(null);

  useEffect(() => {
    setUser({
      name: "Demo User",
      email: "user@example.com",
      imageUrl: "https://placehold.co/100x100.png",
    });
  }, []);
  
  return user;
};

const useNotifications = () => {
  const [notifications, setNotifications] = useState<{ id: string; title: string; description: string; read: boolean }[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Simulate fetching notifications
    const fetchedNotifications = [
      { id: '1', title: 'New Opportunity: Web Developer', description: 'A new high-paying opportunity matches your skills.', read: false },
      { id: '2', title: 'Payment Processed', description: 'Your payment of $250 has been processed.', read: false },
      { id: '3', title: 'Profile Update Reminder', description: 'Keep your profile updated for better matches.', read: true },
    ];
    setNotifications(fetchedNotifications);
    setUnreadCount(fetchedNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => prev > 0 ? prev - 1 : 0);
  };

  return { notifications, unreadCount, markAsRead };
};


export function UserNav() {
  const user = useUser();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!user) {
    return (
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  if (!mounted) {
    // Render a placeholder or null until theme is resolved to avoid hydration mismatch
    return (
        <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div> {/* Placeholder for theme toggle */}
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div> {/* Placeholder for bell icon */}
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div> {/* Placeholder for avatar */}
        </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 sm:space-x-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {resolvedTheme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <div className="p-4 font-medium border-b">Notifications</div>
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">No new notifications.</p>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {notifications.map(notification => (
                <div key={notification.id} className={`p-4 border-b last:border-b-0 ${notification.read ? 'opacity-70' : ''}`}>
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-xs text-muted-foreground">{notification.description}</p>
                  {!notification.read && (
                    <Button variant="link" size="sm" className="p-0 h-auto text-xs mt-1" onClick={() => markAsRead(notification.id)}>
                      Mark as read
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.imageUrl} alt={user.name} data-ai-hint="user profile" />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/dashboard">
                <User className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
               <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings/billing">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => alert("Logout functionality to be implemented.")}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
