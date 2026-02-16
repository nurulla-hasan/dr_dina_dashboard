import { User, Handshake, Users, ShieldCheck } from "lucide-react";

type Stat = {
  label: string;
  value: string;
  icon: React.ElementType;
};

const items: Stat[] = [
  { label: "Total Teacher", value: "45", icon: User },
  { label: "Total Assistance", value: "45", icon: Handshake },
  { label: "Total Student", value: "45", icon: Users },
  { label: "Total Parents", value: "45", icon: ShieldCheck },
];

const Stats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((s, idx) => (
        <div 
          key={idx} 
          className="group relative overflow-hidden rounded-2xl bg-white dark:bg-sidebar border border-gray-100 dark:border-sidebar-border/50 p-6 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <s.icon className="w-6 h-6" />
            </div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {s.label}
            </h3>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {s.value}
            </span>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-300" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      ))}
    </div>
  );
};

export default Stats;