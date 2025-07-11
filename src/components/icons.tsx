import type { SVGProps } from "react";
import { Briefcase, DollarSign } from "lucide-react";

export const Icons = {
  Logo: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
      <path d="M2 17l10 5 10-5"></path>
      <path d="M2 12l10 5 10-5"></path>
    </svg>
  ),
  AppLogo: ({ className, ...props }: SVGProps<SVGSVGElement> & { className?: string }) => (
    <div className={className ? className : "flex items-center space-x-2"} {...props}>
      <Briefcase className="h-6 w-6 text-primary" />
      <span className="font-headline text-xl font-bold text-primary">ProEarning Hub</span>
    </div>
  ),
};

export type Icon = keyof typeof Icons;
