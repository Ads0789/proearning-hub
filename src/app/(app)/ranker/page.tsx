import { AiOpportunityRanker } from '@/components/ai-opportunity-ranker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Info } from 'lucide-react';

export default function AiRankerPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground flex items-center">
          <Lightbulb className="w-8 h-8 mr-3 text-primary" />
          AI Opportunity Ranker
        </h1>
        <p className="text-muted-foreground mt-1">
          Leverage artificial intelligence to evaluate earning opportunities based on your unique profile and goals.
        </p>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="flex-row items-start space-x-3">
          <Info className="w-5 h-5 text-primary mt-1 shrink-0" />
          <div>
            <CardTitle className="font-headline text-lg text-primary">How it Works</CardTitle>
            <CardDescription className="text-primary/80">
              Provide details about an opportunity, your skills, and your financial or career objectives. Our AI will analyze this information to give you a personalized suitability score and reasoning.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <AiOpportunityRanker />

      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Tips for Best Results</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
            <li>Be specific in the opportunity description. Copy-paste details if possible.</li>
            <li>List relevant skills clearly, separating them with commas.</li>
            <li>Describe your goals concisely (e.g., "maximize short-term income", "learn new skills in X field", "find stable long-term work").</li>
            <li>The more detailed your input, the more accurate the AI's assessment will be.</li>
        </CardContent>
      </Card>
    </div>
  );
}
