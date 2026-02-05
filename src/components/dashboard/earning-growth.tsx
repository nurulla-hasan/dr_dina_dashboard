
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", earning: 80 },
  { month: "Feb", earning: 60 },
  { month: "Mar", earning: 70 },
  { month: "Apr", earning: 55 },
  { month: "May", earning: 75 },
  { month: "Jun", earning: 65 },
  { month: "Jul", earning: 85 },
  { month: "Aug", earning: 78 },
];

const chartConfig = {
  earning: {
    label: "Earning",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const EarningGrowthChart = () => {
  return (
    <Card className="border-muted/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium font-crimson">
          Earning Growth
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-55 w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="earningFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={30}
              tickMargin={4}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              type="natural"
              dataKey="earning"
              stroke="var(--primary)"
              fill="url(#earningFill)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default EarningGrowthChart;