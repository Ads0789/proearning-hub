import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Briefcase, DollarSign, TrendingUp, Lightbulb } from 'lucide-react';
import Image from 'next/image';

// Placeholder for user data - in a real app, this would come from auth/API
const user = {
  name: 'Demo User',
  totalEarnings: 1250.75,
  activeOpportunities: 3,
  completedOpportunities: 12,
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground">Here&apos;s your earning summary and quick actions.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">${user.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Opportunities</CardTitle>
            <Briefcase className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.activeOpportunities}</div>
            <p className="text-xs text-muted-foreground">View and manage your ongoing tasks</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Opportunities</CardTitle>
            <TrendingUp className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.completedOpportunities}</div>
            <p className="text-xs text-muted-foreground">Keep up the great work!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Explore New Opportunities</CardTitle>
            <CardDescription>Find your next earning adventure.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Image 
              src="https://placehold.co/600x300.png" 
              alt="Explore Opportunities" 
              width={600} 
              height={300}
              className="rounded-md aspect-video object-cover"
              data-ai-hint="opportunities discovery"
            />
            <p>
              Browse a wide variety of tasks, projects, and gigs tailored to your skills and preferences.
              Our AI-powered matching helps you find the perfect fit.
            </p>
            <Button asChild>
              <Link href="/opportunities">
                Find Opportunities <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">AI Opportunity Ranker</CardTitle>
            <CardDescription>Let our AI help you choose the best opportunities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Image 
              src="https://placehold.co/600x300.png" 
              alt="AI Ranker" 
              width={600} 
              height={300}
              className="rounded-md aspect-video object-cover"
              data-ai-hint="artificial intelligence"
            />
            <p>
              Input your skills, goals, and opportunity details to get a personalized ranking and suitability analysis.
              Make informed decisions and maximize your earning potential.
            </p>
            <Button variant="secondary" asChild>
              <Link href="/ranker">
                Use AI Ranker <Lightbulb className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
