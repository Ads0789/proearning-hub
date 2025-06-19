import { getOpportunityById, mockOpportunities } from '@/lib/data';
import type { Opportunity } from '@/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AiOpportunityRanker } from '@/components/ai-opportunity-ranker';
import { Briefcase, DollarSign, MapPin, CalendarDays, ExternalLink, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface OpportunityPageParams {
  params: { id: string };
}

function formatEarnings(earnings: Opportunity['potentialEarnings']): string {
  if (typeof earnings === 'string') {
    return earnings;
  }
  const { min, max, currency, type } = earnings;
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency });
  
  if (type === 'fixed') {
    return `${formatter.format(min)}`;
  }
  if (type === 'hourly') {
    return `${formatter.format(min)} - ${formatter.format(max)} / hour`;
  }
  return `${formatter.format(min)} - ${formatter.format(max)}`;
}

export async function generateStaticParams() {
  return mockOpportunities.map(op => ({ id: op.id }));
}

export default function OpportunityDetailPage({ params }: OpportunityPageParams) {
  const opportunity = getOpportunityById(params.id);

  if (!opportunity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Opportunity Not Found</h1>
        <p className="text-muted-foreground mb-4">
          The opportunity you are looking for does not exist or may have been removed.
        </p>
        <Button asChild>
          <Link href="/opportunities">Back to Opportunities</Link>
        </Button>
      </div>
    );
  }
  
  const postedDateFormatted = formatDistanceToNow(new Date(opportunity.postedDate), { addSuffix: true });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg overflow-hidden">
            {opportunity.imageUrl && (
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src={opportunity.imageUrl}
                  alt={opportunity.title}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={opportunity.aiHint || "professional workspace"}
                />
              </div>
            )}
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 space-y-2 sm:space-y-0">
                <Badge variant="secondary" className="capitalize text-sm py-1 px-3">{opportunity.type}</Badge>
                <div className="text-xs text-muted-foreground flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    Posted {postedDateFormatted}
                </div>
              </div>
              <CardTitle className="font-headline text-3xl md:text-4xl text-primary">{opportunity.title}</CardTitle>
              <div className="text-lg text-muted-foreground flex items-center pt-1">
                  <Briefcase className="h-5 w-5 mr-2 shrink-0" /> {opportunity.company}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-green-500 shrink-0" />
                    <span className="font-medium">Potential Earnings:</span>&nbsp;{formatEarnings(opportunity.potentialEarnings)}
                </div>
                <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-500 shrink-0" />
                    <span className="font-medium">Location:</span>&nbsp;{opportunity.location}
                </div>
              </div>

              <h3 className="font-headline text-xl font-semibold mb-2">Job Description</h3>
              <p className="text-foreground whitespace-pre-line leading-relaxed">
                {opportunity.detailedDescription || opportunity.description}
              </p>

              {opportunity.skillsRequired.length > 0 && (
                <>
                  <Separator className="my-6" />
                  <h3 className="font-headline text-xl font-semibold mb-3">Skills Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.skillsRequired.map(skill => (
                      <Badge key={skill} variant="outline" className="text-sm py-1 px-3">{skill}</Badge>
                    ))}
                  </div>
                </>
              )}
              
              <Separator className="my-6" />
              <div className="flex flex-col sm:flex-row gap-3">
                 <Button size="lg" className="flex-1">
                    <ThumbsUp className="mr-2 h-5 w-5" /> Apply Now (Placeholder)
                 </Button>
                 <Button size="lg" variant="outline" className="flex-1">
                    <ExternalLink className="mr-2 h-5 w-5" /> Visit Company (Placeholder)
                 </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column for AI Ranker */}
        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-24"> {/* Make AI Ranker sticky */}
            <AiOpportunityRanker initialOpportunityDescription={opportunity.detailedDescription || opportunity.description} />
            
            <Card className="mt-6 shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-lg">About {opportunity.company}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {/* Placeholder company info */}
                  {opportunity.company} is a leading firm in its industry, known for innovation and employee satisfaction. 
                  Join a dynamic team and contribute to exciting projects.
                </p>
                <Button variant="link" className="px-0 mt-2">Learn more (placeholder)</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
