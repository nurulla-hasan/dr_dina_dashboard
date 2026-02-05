import { useState } from "react";
import PageHeader from "@/components/ui/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2, MinusCircle, Plus } from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import type { DateRange } from "react-day-picker";
import PageLayout from "@/components/common/page-layout";

const Fees = () => {
  const [standardFee, setStandardFee] = useState("50");
  const [subscriptionFeatures] = useState([
    "Verified badge",
    "Custom profile & products",
    "Client management tools",
    "Analytics & insights",
    "Priority support",
  ]);

  const [referralAmount, setReferralAmount] = useState("10");
  const [rewardLimit, setRewardLimit] = useState("");
  const [rewardPercentage, setRewardPercentage] = useState("10");
  const [discountFee, setDiscountFee] = useState("50");

  const [rewardDates, setRewardDates] = useState<DateRange | undefined>();
  const [discountDates, setDiscountDates] = useState<DateRange | undefined>();

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader
          title="Fees Management"
          description="Manage subscription fees, rewards, and referral programs."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Manage Subscriptions Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-crimson text-2xl">
              Standard Subscription Fee (Monthly)
            </CardTitle>
            <CardDescription>
              Set the base monthly fee for trainers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                value={standardFee}
                onChange={(e) => setStandardFee(e.target.value)}
                className="pl-7 bg-background border-muted-foreground/20 focus:border-primary/50"
              />
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="font-semibold text-lg font-crimson">
                Manage Subscription Features
              </h3>
              <div className="space-y-3">
                {subscriptionFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MinusCircle className="text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full dashed border-2 border-dashed border-muted-foreground/30 text-muted-foreground hover:text-primary hover:border-primary/50 py-6 rounded-xl"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Feature
              </Button>
            </div>

            <div className="flex justify-center pt-6 border-t">
              <Button className="px-12 rounded-full min-w-50">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Referral Rewards */}
            <Card>
              <CardHeader>
                <CardTitle className="font-crimson text-xl text-center">
                  Referral Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      value={referralAmount}
                      onChange={(e) => setReferralAmount(e.target.value)}
                      className="pl-7"
                      placeholder="10"
                    />
                  </div>
                </div>
                <div className="flex justify-center pt-2">
                  <Button className="px-8 rounded-lg min-w-37.5">
                    Save Change
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Discount Subscription Fee */}
            <Card>
              <CardHeader>
                <CardTitle className="font-crimson text-xl text-center">
                  Discount Subscription Fee
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Discount Subscription Fee (Monthly)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      value={discountFee}
                      onChange={(e) => setDiscountFee(e.target.value)}
                      className="pl-7"
                      placeholder="50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium font-crimson">
                    Date Range
                  </Label>
                  <DatePickerWithRange
                    date={discountDates}
                    setDate={setDiscountDates}
                    placeholder="Select date range"
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <Button className="px-8 rounded-lg min-w-37.5">
                    Save Change
                  </Button>
                </div>
              </CardContent>
            </Card>
            {/* Manage Reward */}
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="font-crimson text-xl text-center">
                Manage Reward
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Limit</Label>
                  <Input
                    value={rewardLimit}
                    onChange={(e) => setRewardLimit(e.target.value)}
                    placeholder="e.g. 100"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Discount Percentage</Label>
                  <div className="relative">
                    <Input
                      value={rewardPercentage}
                      onChange={(e) => setRewardPercentage(e.target.value)}
                      className="pr-7"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium font-crimson">
                  Date Range
                </Label>
                <DatePickerWithRange
                  date={rewardDates}
                  setDate={setRewardDates}
                  placeholder="Select date range"
                />
              </div>

              <div className="flex justify-center pt-2">
                <Button className="px-8 rounded-lg min-w-37.5">
                  Save Change
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Fees;
