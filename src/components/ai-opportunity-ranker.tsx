"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { rankOpportunityAction } from "@/lib/actions/rank-opportunity.action";
import type { OpportunityRankerOutput } from "@/ai/flows/opportunity-ranker";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Bot, CheckCircle, XCircle, TrendingUp, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const rankerSchema = z.object({
  opportunityDescription: z.string().min(10, { message: "Please provide a detailed description." }),
  userSkills: z.string().min(5, { message: "Please list some relevant skills." }),
  userGoals: z.string().min(5, { message: "Please describe your goals." }),
});

type RankerFormValues = z.infer<typeof rankerSchema>;

interface AiOpportunityRankerProps {
  initialOpportunityDescription?: string;
}

export function AiOpportunityRanker({ initialOpportunityDescription = "" }: AiOpportunityRankerProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [rankResult, setRankResult] = React.useState<OpportunityRankerOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<RankerFormValues>({
    resolver: zodResolver(rankerSchema),
    defaultValues: {
      opportunityDescription: initialOpportunityDescription,
      userSkills: "",
      userGoals: "",
    },
  });
  
  React.useEffect(() => {
    if (initialOpportunityDescription) {
      form.setValue("opportunityDescription", initialOpportunityDescription);
    }
  }, [initialOpportunityDescription, form]);

  async function onSubmit(values: RankerFormValues) {
    setIsLoading(true);
    setRankResult(null);
    setError(null);

    const result = await rankOpportunityAction(values);

    setIsLoading(false);
    if (result.success && result.data) {
      setRankResult(result.data);
      toast({
        title: "Opportunity Ranked!",
        description: "The AI has evaluated the opportunity.",
      });
    } else {
      setError(result.error || "Failed to rank opportunity.");
      toast({
        variant: "destructive",
        title: "Ranking Error",
        description: result.error || "An unknown error occurred.",
      });
    }
  }

  const SuitabilityIcon = rankResult?.isSuitable ? CheckCircle : XCircle;
  const suitabilityColor = rankResult?.isSuitable ? "text-green-500" : "text-red-500";

  return (
    <Card className="shadow-xl w-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Bot className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-2xl">AI Opportunity Ranker</CardTitle>
            <CardDescription>Evaluate an opportunity based on your profile.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="opportunityDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opportunity Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste or describe the earning opportunity here..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Skills</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React, Graphic Design, Content Writing" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Goals</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Earn $XXX/month, Gain experience in YYY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ranking...
                </>
              ) : (
                "Rank Opportunity"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      {error && (
         <CardFooter>
            <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            </Alert>
        </CardFooter>
      )}
      {rankResult && !error && (
        <CardFooter className="flex flex-col space-y-4 items-start">
          <h3 className="font-headline text-xl">AI Ranking Result:</h3>
          <div className="w-full p-4 border rounded-md bg-secondary/30 space-y-3">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                    Overall Rank:
                </p>
                <div className="flex items-center">
                    {[...Array(10)].map((_, i) => (
                        <Star key={i} className={`h-6 w-6 ${i < rankResult.rank ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`} />
                    ))}
                    <span className="ml-2 text-xl font-bold text-primary">({rankResult.rank}/10)</span>
                </div>
            </div>
            <Progress value={rankResult.rank * 10} className="w-full h-3" />
            
            <div className="flex items-center text-lg font-semibold">
              <SuitabilityIcon className={`mr-2 h-5 w-5 ${suitabilityColor}`} />
              Suitability: <span className={`ml-1 ${suitabilityColor}`}>{rankResult.isSuitable ? "Suitable" : "Not Ideal"}</span>
            </div>
            <div>
              <h4 className="font-semibold">Reasoning:</h4>
              <p className="text-sm text-muted-foreground">{rankResult.reasoning}</p>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
