import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { List, PlusCircle, CreditCard, ShieldCheck } from "lucide-react";
import Image from "next/image";

// Placeholder data
const paymentMethods = [
  { id: "pm_1", type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
  { id: "pm_2", type: "PayPal", email: "user@example.com", isDefault: false },
];

const subscription = {
  plan: "Pro Plan",
  price: 29,
  currency: "USD",
  billingCycle: "monthly",
  nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), // Approx. 30 days from now
  status: "Active",
};

export default function BillingSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-headline font-semibold text-foreground">Billing & Subscription</h2>
        <p className="text-muted-foreground">Manage your payment methods and subscription plan.</p>
      </div>
      <Separator />

      {/* Current Subscription */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline text-lg">Current Subscription</CardTitle>
          <CardDescription>Your active plan details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-md bg-secondary/30">
            <div>
              <p className="font-semibold text-primary">{subscription.plan}</p>
              <p className="text-sm text-muted-foreground">
                ${subscription.price}/{subscription.billingCycle} - Next billing: {subscription.nextBillingDate}
              </p>
            </div>
            <Badge variant={subscription.status === "Active" ? "default" : "destructive"} className="bg-accent text-accent-foreground">
              {subscription.status}
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" disabled>Change Plan (Coming Soon)</Button>
            <Button variant="destructive" disabled>Cancel Subscription (Coming Soon)</Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline text-lg">Payment Methods</CardTitle>
            <CardDescription>Your saved payment options.</CardDescription>
          </div>
          <Button variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Method
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center">
                {method.type === "Visa" ? 
                    <CreditCard className="h-6 w-6 mr-3 text-blue-600"/> : 
                    <Image src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_SbyPP_H_H_RGB_RGB.png" alt="PayPal" width={24} height={24} className="mr-3" data-ai-hint="paypal logo"/>
                }
                <div>
                  <span className="font-medium">{method.type} </span>
                  {method.type === "Visa" ? `ending in ${method.last4}` : method.email}
                  {method.type === "Visa" && <span className="text-xs text-muted-foreground ml-2">Expires {method.expiry}</span>}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {method.isDefault && <Badge variant="secondary">Default</Badge>}
                <Button variant="ghost" size="sm" disabled>Edit</Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" disabled>Remove</Button>
              </div>
            </div>
          ))}
          {paymentMethods.length === 0 && (
            <p className="text-sm text-muted-foreground">No payment methods saved.</p>
          )}
        </CardContent>
      </Card>
      
      {/* Security Note */}
       <div className="flex items-start p-4 border border-green-200 bg-green-50 rounded-md text-green-700">
         <ShieldCheck className="h-6 w-6 mr-3 mt-1 shrink-0 text-green-500" />
         <div>
           <h4 className="font-semibold">Secure Payments</h4>
           <p className="text-sm">
             Your payment information is securely processed by our partners (e.g., Stripe, PayPal). We do not store your full card details.
           </p>
         </div>
       </div>

      {/* Billing History */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline text-lg">Billing History</CardTitle>
          <CardDescription>Review your past transactions and invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for billing history table */}
          <div className="text-center py-8 border-2 border-dashed rounded-md">
            <List className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Your billing history will appear here.</p>
            <p className="text-xs text-muted-foreground">(Feature coming soon)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
