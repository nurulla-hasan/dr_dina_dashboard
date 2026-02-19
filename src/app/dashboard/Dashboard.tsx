import { useState } from "react";
import PageLayout from "@/components/common/page-layout";
import Stats from "@/components/dashboard/stats";
import MonthlySalesChart from "@/components/dashboard/earning-growth";
import { useGetDashboardStatsQuery } from "@/redux/feature/dashboard/dashboardApi";

const Dashboard = () => {
  const [year, setYear] = useState<string>("2026");
  const { data: statsData } = useGetDashboardStatsQuery(year);

  const topCards = statsData?.data?.topCards;
  const studentGrowthChart = statsData?.data?.studentGrowthChart;

  return (
    <PageLayout>
      <div className="space-y-6">
        <Stats data={topCards} />
        <MonthlySalesChart 
          data={studentGrowthChart} 
          year={year} 
          onYearChange={setYear} 
        />
      </div>
    </PageLayout>
  );
};

export default Dashboard;
