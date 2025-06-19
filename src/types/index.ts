export interface Opportunity {
  id: string;
  title: string;
  company: string;
  description: string;
  detailedDescription?: string;
  potentialEarnings: string | { min: number; max: number; currency: string; type: 'fixed' | 'hourly' | 'range' };
  skillsRequired: string[];
  imageUrl?: string;
  tags: string[];
  postedDate: string; // ISO Date string
  location: string; // e.g., "Remote", "New York, NY"
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Gig';
  aiHint?: string; // For placeholder images
}
