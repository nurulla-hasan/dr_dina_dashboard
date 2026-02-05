import { Card, CardContent } from "@/components/ui/card";

type Stat = {
  label: string;
  value: string;
};

const items: Stat[] = [
  { label: "Total User", value: "18.6K" },
  { label: "Total Trainer", value: "18.6K" },
  { label: "Active Program", value: "1204" },
  { label: "Website View", value: "1020" },
  { label: "Total Earning", value: "$2,5000" },
];

const Stats = () => {
  return (
    <Card className="border-muted/40">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {items.map((s, idx) => (
            <div key={idx} className="px-6 py-5">
              <div className="text-2xl font-semibold tracking-tight text-foreground">
                {s.value}
              </div>
              <div className="text-sm text-primary mt-1 font-crimson">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Stats;