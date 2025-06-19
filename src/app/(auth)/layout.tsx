import Link from "next/link";
import { Icons } from "@/components/icons";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <Link href="/" className="mb-8" aria-label="Back to homepage">
        <Icons.AppLogo />
      </Link>
      <div className="w-full max-w-md">
        {children}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Your Pro Earning Journey Starts Here.
      </p>
    </div>
  );
}
