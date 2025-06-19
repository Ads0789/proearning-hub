import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Opportunity } from '@/types';
import { Briefcase, DollarSign, MapPin, CalendarDays, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface OpportunityCardProps {
  opportunity: Opportunity;
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
  // range
  return `${formatter.format(min)} - ${formatter.format(max)}`;
}


export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const postedDateFormatted = formatDistanceToNow(new Date(opportunity.postedDate), { addSuffix: true });

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {opportunity.imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={opportunity.imageUrl}
            alt={opportunity.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={opportunity.aiHint || "business opportunity"}
          />
        </div>
      )}
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary" className="capitalize">{opportunity.type}</Badge>
            <span className="text-xs text-muted-foreground flex items-center">
                <CalendarDays className="h-3 w-3 mr-1" />
                {postedDateFormatted}
            </span>
        </div>
        <CardTitle className="font-headline text-xl leading-tight hover:text-primary transition-colors">
          <Link href={`/opportunities/${opportunity.id}`}>{opportunity.title}</Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground flex items-center pt-1">
            <Briefcase className="h-4 w-4 mr-2 shrink-0" /> {opportunity.company}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <p className="text-sm text-foreground line-clamp-3 mb-3">{opportunity.description}</p>
        <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                <span>{formatEarnings(opportunity.potentialEarnings)}</span>
            </div>
            <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 shrink-0" />
                <span>{opportunity.location}</span>
            </div>
        </div>
        
        {opportunity.skillsRequired.length > 0 && (
          <div className="mt-3">
            <h4 className="text-xs font-semibold mb-1 text-foreground">Skills:</h4>
            <div className="flex flex-wrap gap-1">
              {opportunity.skillsRequired.slice(0, 3).map(skill => (
                <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
              ))}
              {opportunity.skillsRequired.length > 3 && (
                <Badge variant="outline" className="text-xs">+{opportunity.skillsRequired.length - 3} more</Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="default">
          <Link href={`/opportunities/${opportunity.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
