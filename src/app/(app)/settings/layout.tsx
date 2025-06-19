"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, CreditCard, Bell, Shield } from "lucide-react";

const settingsNavItems = [
  { href: "/settings", label: "Profile", icon: User, exact: true },
  { href: "/settings/billing", label: "Billing", icon: CreditCard },
  { href: "/settings/notifications", label: "Notifications", icon: Bell },
  { href: "/settings/security", label: "Security", icon: Shield },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      <div className="grid lg:grid-cols-4 gap-8 items-start">
        <Card className="lg:col-span-1 shadow-md">
          <CardContent className="p-4">
            <nav className="flex flex-col space-y-1">
              {settingsNavItems.map((item) => {
                const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn("w-full justify-start", isActive && "font-semibold")}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
            </nav>
          </CardContent>
        </Card>
        <div className="lg:col-span-3">
          <Card className="shadow-md min-h-[400px]">
            <CardContent className="p-6">
              {children}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
