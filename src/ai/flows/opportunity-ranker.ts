// src/ai/flows/opportunity-ranker.ts
'use server';

/**
 * @fileOverview AI-powered tool to rank earning opportunities.
 *
 * - opportunityRanker - Ranks earning opportunities based on provided criteria.
 * - OpportunityRankerInput - Input schema for the opportunityRanker function.
 * - OpportunityRankerOutput - Output schema for the opportunityRanker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OpportunityRankerInputSchema = z.object({
  opportunityDescription: z
    .string()
    .describe('Detailed description of the earning opportunity.'),
  userSkills: z
    .string()
    .describe('Skills possessed by the user considering this opportunity.'),
  userGoals: z
    .string()
    .describe('Financial and career goals of the user.'),
});
export type OpportunityRankerInput = z.infer<typeof OpportunityRankerInputSchema>;

const OpportunityRankerOutputSchema = z.object({
  rank: z
    .number()
    .describe('A numerical ranking (1-10) of the opportunity, with 10 being the best.'),
  reasoning: z
    .string()
    .describe('Explanation of why the opportunity received the given rank.'),
  isSuitable: z
    .boolean()
    .describe('Whether this opportunity is suitable for the user or not.'),
});
export type OpportunityRankerOutput = z.infer<typeof OpportunityRankerOutputSchema>;

export async function opportunityRanker(input: OpportunityRankerInput): Promise<OpportunityRankerOutput> {
  return opportunityRankerFlow(input);
}

const opportunityRankerPrompt = ai.definePrompt({
  name: 'opportunityRankerPrompt',
  input: {schema: OpportunityRankerInputSchema},
  output: {schema: OpportunityRankerOutputSchema},
  prompt: `You are an AI assistant that ranks earning opportunities for users.

  Given the following information about an earning opportunity and a user, provide a rank from 1 to 10 (10 being the best) and explain your reasoning.
  Also, determine isSuitable, that indicates whether the opportunity is suitable for the user or not.

  Opportunity Description: {{{opportunityDescription}}}
  User Skills: {{{userSkills}}}
  User Goals: {{{userGoals}}}

  Respond with a JSON object containing the rank, reasoning, and isSuitable fields.`,
});

const opportunityRankerFlow = ai.defineFlow(
  {
    name: 'opportunityRankerFlow',
    inputSchema: OpportunityRankerInputSchema,
    outputSchema: OpportunityRankerOutputSchema,
  },
  async input => {
    const {output} = await opportunityRankerPrompt(input);
    return output!;
  }
);
