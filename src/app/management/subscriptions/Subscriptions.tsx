import PageLayout from "@/components/common/page-layout";
import {
  subscriptionsColumns,
  type Subscription,
} from "@/components/management/subscriptions/subscriptions-columns";
import { SubscriptionsFilter } from "@/components/management/subscriptions/subscriptions-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";

const Subscriptions = () => {
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between">
        <PageHeader
          title="Subscription Management"
          description="View and manage all customer subscriptions"
          length={subscriptions.length}
        />
        <SubscriptionsFilter />
      </div>
      <DataTable columns={subscriptionsColumns} data={subscriptions} meta={meta} />
    </PageLayout>
  );
};

export default Subscriptions;

const subscriptions: Subscription[] = [
  {
    id: 1,
    name: "Jollof Rice",
    email: "jollof@example.com",
    avatar: "https://i.pravatar.cc/150?u=11",
    startDate: "12 Jan 2025",
    expireDate: "12 Jan 2025",
    plan: "Monthly",
    amount: "$254",
    referrals: 5,
    status: "Active",
  },
  {
    id: 2,
    name: "Jollof Rice",
    email: "jollof@example.com",
    avatar: "https://i.pravatar.cc/150?u=12",
    startDate: "12 Jan 2025",
    expireDate: "12 Jan 2025",
    plan: "Monthly",
    amount: "$254",
    referrals: 2,
    status: "Expired",
  },
  {
    id: 3,
    name: "Jollof Rice",
    email: "jollof@example.com",
    avatar: "https://i.pravatar.cc/150?u=13",
    startDate: "12 Jan 2025",
    expireDate: "12 Jan 2025",
    plan: "Monthly",
    amount: "$254",
    referrals: 8,
    status: "Active",
  },
  {
    id: 4,
    name: "Jollof Rice",
    email: "jollof@example.com",
    avatar: "https://i.pravatar.cc/150?u=14",
    startDate: "12 Jan 2025",
    expireDate: "12 Jan 2025",
    plan: "Monthly",
    amount: "$254",
    referrals: 12,
    status: "Active",
  },
  {
    id: 5,
    name: "Jollof Rice",
    email: "jollof@example.com",
    avatar: "https://i.pravatar.cc/150?u=15",
    startDate: "12 Jan 2025",
    expireDate: "12 Jan 2025",
    plan: "Monthly",
    amount: "$254",
    referrals: 0,
    status: "Expired",
  },
  {
    id: 6,
    name: "Jollof Rice",
    email: "jollof@example.com",
    avatar: "https://i.pravatar.cc/150?u=16",
    startDate: "12 Jan 2025",
    expireDate: "12 Jan 2025",
    plan: "Monthly",
    amount: "$254",
    referrals: 4,
    status: "Active",
  },
];

const meta = {
  total: subscriptions.length,
  page: 1,
  limit: 10,
  totalPages: Math.ceil(subscriptions.length / 10),
};
