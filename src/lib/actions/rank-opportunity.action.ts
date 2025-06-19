'use server';

import { opportunityRanker, type OpportunityRankerInput, type OpportunityRankerOutput } from '@/ai/flows/opportunity-ranker';

interface RankOpportunityResult {
  success: boolean;
  data?: OpportunityRankerOutput;
  error?: string;
}

export async function rankOpportunityAction(input: OpportunityRankerInput): Promise<RankOpportunityResult> {
  try {
    const result = await opportunityRanker(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error ranking opportunity:", error);
    let errorMessage = "An unexpected error occurred while ranking the opportunity.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}
