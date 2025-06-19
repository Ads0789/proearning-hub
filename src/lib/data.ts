import type { Opportunity } from '@/types';

export const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Innovatech Solutions',
    description: 'Join our team to build cutting-edge web applications using React and Next.js. Exciting projects and collaborative environment.',
    detailedDescription: 'Innovatech Solutions is seeking a highly skilled Senior Frontend Developer to lead the development of our next-generation platform. You will be responsible for designing, developing, and maintaining high-quality user interfaces, collaborating with backend developers and UX designers. Key technologies include React, Next.js, TypeScript, and GraphQL. We offer competitive salary, remote work options, and a chance to work on impactful projects.',
    potentialEarnings: { min: 80000, max: 120000, currency: 'USD', type: 'range' },
    skillsRequired: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Frontend', 'Tech', 'Remote'],
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    location: 'Remote',
    type: 'Full-time',
    aiHint: 'software development'
  },
  {
    id: '2',
    title: 'Graphic Designer for Social Media',
    company: 'Creative Spark Agency',
    description: 'Create engaging visuals for various social media platforms. Portfolio required.',
    detailedDescription: 'Creative Spark Agency is looking for a talented Graphic Designer to produce eye-catching graphics for our clients\' social media campaigns. You will work on a variety of projects, from static posts to short animations. Proficiency in Adobe Creative Suite (Photoshop, Illustrator, After Effects) is essential. A strong portfolio showcasing social media work is a must.',
    potentialEarnings: { min: 50, max: 75, currency: 'USD', type: 'hourly' },
    skillsRequired: ['Photoshop', 'Illustrator', 'Social Media Marketing', 'Canva'],
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Design', 'Marketing', 'Freelance'],
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    location: 'Remote (US Based)',
    type: 'Freelance',
    aiHint: 'graphic design'
  },
  {
    id: '3',
    title: 'Content Writer - Tech Blogs',
    company: 'TechScribe Pro',
    description: 'Write insightful articles and blog posts on emerging technologies. SEO knowledge is a plus.',
    detailedDescription: 'TechScribe Pro needs experienced Content Writers to create high-quality, SEO-friendly articles on topics like AI, blockchain, cybersecurity, and cloud computing. You should have a passion for technology and the ability to explain complex concepts clearly. Samples of previous tech writing are required.',
    potentialEarnings: { min: 500, max: 1500, currency: 'USD', type: 'range' }, // Per project/month
    skillsRequired: ['Content Writing', 'SEO', 'Technical Writing', 'WordPress'],
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Writing', 'Tech', 'Content'],
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    location: 'Remote',
    type: 'Contract',
    aiHint: 'writing technology'
  },
  {
    id: '4',
    title: 'Virtual Assistant for E-commerce Store',
    company: 'Shopify Success Co.',
    description: 'Provide customer support, manage orders, and handle administrative tasks for a growing e-commerce business.',
    detailedDescription: 'Shopify Success Co. is seeking a reliable Virtual Assistant to support our daily e-commerce operations. Responsibilities include responding to customer inquiries, processing orders, managing inventory updates, and other administrative tasks. Experience with Shopify and customer service tools like Zendesk or Gorgias is preferred.',
    potentialEarnings: { min: 20, max: 30, currency: 'USD', type: 'hourly' },
    skillsRequired: ['Customer Service', 'Shopify', 'Data Entry', 'Email Management'],
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Admin', 'E-commerce', 'Part-time'],
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    location: 'Remote',
    type: 'Part-time',
    aiHint: 'virtual assistant'
  },
];

export const getOpportunityById = (id: string): Opportunity | undefined => {
  return mockOpportunities.find(op => op.id === id);
};
