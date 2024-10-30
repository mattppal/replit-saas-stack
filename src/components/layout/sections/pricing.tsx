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
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Pricing
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Get unlimited access
      </h2>

      {error && (
        <div className="max-w-md mx-auto mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {plans(onPremiumSubscribe, onFreeTrialStart, loading).map(
          ({ title, popular, price, description, buttonText, benefitList, onClickHandler }) => (
            <Card
              key={title}
              className={
                popular === PopularPlan?.YES
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="pb-2">{title}</CardTitle>
                <CardDescription className="pb-4">
                  {description}
                </CardDescription>
                <div>
                  <span className="text-3xl font-bold">${price}</span>
                  <span className="text-muted-foreground"> /month</span>
                </div>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check className="text-primary mr-2" />
                      <h3>{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant={popular === PopularPlan?.YES ? "default" : "secondary"}
                  className="w-full"
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
