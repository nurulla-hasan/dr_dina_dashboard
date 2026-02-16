import PageLayout from "@/components/common/page-layout";
import Stats from "@/components/dashboard/stats";
import MonthlySalesChart from "@/components/dashboard/earning-growth";

const Dashboard = () => {
  return (
    <PageLayout >
      <div className="space-y-6">
        <Stats />
        <MonthlySalesChart />
      </div>
    </PageLayout>
  );
};

export default Dashboard;
