import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
  onClickHandler?: () => void;
}

interface PricingSectionProps {
  loading?: boolean;
  error?: string;
  onPremiumSubscribe: () => void;
  onFreeTrialStart: () => void;
}

const plans = (onPremiumSubscribe: () => void, onFreeTrialStart: () => void, loading?: boolean): PlanProps[] => [
  {
    title: "Free Trial",
    popular: 0,
    price: 0,
    description: "Try all premium features free for 30 days",
    buttonText: loading ? "Processing..." : "Start Free Trial",
    benefitList: [
      "30-day free trial",
      "1 GB storage",
      "Up to 2 pages",
      "Community support",
      "AI assistance",
    ],
    onClickHandler: onFreeTrialStart,
  },
  {
    title: "Premium",
    popular: 1,
    price: 45,
    description: "Perfect for professionals and growing teams",
    buttonText: loading ? "Processing..." : "Subscribe Now",
    benefitList: [
      "4 team members",
      "8 GB storage",
      "Up to 6 pages",
      "Priority support",
      "AI assistance",
    ],
    onClickHandler: onPremiumSubscribe,
  },
  {
    title: "Enterprise",
    popular: 0,
    price: 120,
    description: "For larger organizations with advanced needs",
    buttonText: "Contact Sales",
    benefitList: [
      "10 team members",
      "20 GB storage",
      "Up to 10 pages",
      "Phone & email support",
      "AI assistance",
    ],
    onClickHandler: () => window.location.href = 'mailto:sales@example.com',
  },
];

export const PricingSection = ({
  loading,
  error,
  onPremiumSubscribe,
  onFreeTrialStart
}: PricingSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-base font-semibold leading-7 text-primary">
          Pricing
        </h2>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Get unlimited access
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that works best for you
        </p>
      </div>

      {error && (
        <div className="max-w-md mx-auto -mt-4 mb-12 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans(onPremiumSubscribe, onFreeTrialStart, loading).map(
          ({ title, popular, price, description, buttonText, benefitList, onClickHandler }) => (
            <Card
              key={title}
              className={
                popular === PopularPlan.YES
                  ? "relative ring-2 ring-primary lg:scale-105"
                  : "relative"
              }
            >
              {popular === PopularPlan.YES && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground text-center">
                  Most Popular
                </div>
              )}
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                <CardDescription className="text-sm">
                  {description}
                </CardDescription>
                <div className="pt-3">
                  <span className="text-4xl font-bold">${price}</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {benefitList.map((benefit) => (
                    <li key={benefit} className="flex items-center">
                      <Check className="text-primary h-5 w-5 shrink-0 mr-3" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  variant={popular === PopularPlan.YES ? "default" : "outline"}
                  size="lg"
                  className="w-full font-semibold"
                  onClick={onClickHandler}
                  disabled={loading}
                >
                  {buttonText}
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
