import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Briefcase, Users, TrendingUp, ShieldCheck, Bot } from 'lucide-react';
import Image from 'next/image';
import { Icons } from '@/components/icons';

export default function LandingPage() {
  const features = [
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: 'Diverse Opportunities',
      description: 'Explore a wide range of earning opportunities tailored to your skills.',
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: 'Secure Platform',
      description: 'Robust authentication and secure payment processing for peace of mind.',
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: 'AI-Powered Insights',
      description: 'Utilize our AI Opportunity Ranker to find the best matches for you.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Personalized Dashboard',
      description: 'Track your progress and manage your earnings with a custom dashboard.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link href="/" aria-label="ProEarning Hub homepage">
            <Icons.AppLogo />
          </Link>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-headline text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Unlock Your Earning Potential with <span className="text-primary">ProEarning Hub</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover curated opportunities, leverage AI insights, and manage your earnings seamlessly. Your journey to financial growth starts here.
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Why Choose ProEarning Hub?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="items-center">
                    {feature.icon}
                    <CardTitle className="mt-4 font-headline text-xl text-center">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Placeholder for visual element or more content */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="Financial Growth Illustration" 
                width={600} 
                height={400}
                className="rounded-lg shadow-xl"
                data-ai-hint="financial growth"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Take Control of Your Financial Future
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                ProEarning Hub provides the tools and resources you need to succeed. From finding the right opportunities to managing your payments, we've got you covered.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  <span>Access exclusive earning opportunities.</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  <span>Secure and transparent payment processing.</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  <span>AI-driven recommendations to maximize your income.</span>
                </li>
              </ul>
              <Button size="lg" asChild>
                <Link href="/signup">Join Now</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <footer className="py-8 border-t border-border/40 bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ProEarning Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
