import { OpportunityCard } from '@/components/opportunity-card';
import { mockOpportunities } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

export default function OpportunitiesPage() {
  // In a real app, you'd fetch and filter data based on state/params
  const opportunities = mockOpportunities;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Discover Opportunities</h1>
        <p className="text-muted-foreground">Browse and find your next earning opportunity.</p>
      </div>

      {/* Filters and Search Bar */}
      <div className="sticky top-16 bg-background/90 backdrop-blur-md py-4 z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Search opportunities (e.g., React, Design...)" className="pl-10 w-full" />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="writing">Writing</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="hidden md:inline-flex">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>
        </div>
      </div>

      {opportunities.length === 0 ? (
        <p className="text-center text-muted-foreground py-10">No opportunities found matching your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map(op => (
            <OpportunityCard key={op.id} opportunity={op} />
          ))}
        </div>
      )}

      {/* Pagination (Placeholder) */}
      {opportunities.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="mr-2">Previous</Button>
          <Button variant="outline">Next</Button>
        </div>
      )}
    </div>
  );
}
