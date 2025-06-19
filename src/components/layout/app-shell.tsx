"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { UserNav } from "@/components/layout/user-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Briefcase, DollarSign, Settings, Bot, BarChart3 } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/opportunities", label: "Opportunities", icon: Briefcase },
  { href: "/ranker", label: "AI Ranker", icon: Bot },
  { href: "/earnings", label: "Earnings", icon: DollarSign }, 
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

const bottomNavItems = [
    { href: "/settings", label: "Settings", icon: Settings },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Get initial sidebar state from cookie or default to true (expanded)
  const getInitialSidebarOpen = () => {
    if (typeof window === 'undefined') return true; // Default for SSR
    try {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('sidebar_state='))
        ?.split('=')[1];
      return cookieValue ? cookieValue === 'true' : true;
    } catch (e) {
      return true; // Default if cookie access fails
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(getInitialSidebarOpen());

  const handleSidebarOpenChange = (open: boolean) => {
    setIsSidebarOpen(open);
    // Persist to cookie (optional, could be handled by SidebarProvider if it supports it directly)
    if (typeof window !== 'undefined') {
      document.cookie = `sidebar_state=${open}; path=/; max-age=${60*60*24*7}`;
    }
  };


  return (
    <SidebarProvider defaultOpen={isSidebarOpen} onOpenChange={handleSidebarOpenChange}>
      <Sidebar collapsible="icon" variant="sidebar" className="border-r">
        <SidebarHeader className="p-4 flex items-center justify-between">
          <Link href="/dashboard" aria-label="ProEarning Hub dashboard">
             <Icons.AppLogo className="hidden group-data-[state=expanded]:flex items-center space-x-2" />
             <Briefcase className="h-6 w-6 text-primary group-data-[state=expanded]:hidden" />
          </Link>
          <SidebarTrigger className="group-data-[state=expanded]:hidden mr-auto ml-2" />
        </SidebarHeader>

        <ScrollArea className="flex-grow">
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={{children: item.label, className: "bg-primary text-primary-foreground"}}
                    disabled={item.disabled}
                    aria-disabled={item.disabled}
                  >
                    <Link href={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </ScrollArea>

        <SidebarFooter className="p-2 border-t">
           <SidebarMenu>
              {bottomNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={{children: item.label, className: "bg-primary text-primary-foreground"}}
                  >
                    <Link href={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-lg">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
             <div className="flex items-center">
                <SidebarTrigger className="md:hidden" /> {/* Mobile trigger */}
                {/* Breadcrumbs or page title could go here */}
             </div>
            <div className="flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        <footer className="border-t bg-background py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-muted-foreground text-center">&copy; {new Date().getFullYear()} ProEarning Hub</p>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
