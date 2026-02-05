import PageLayout from "@/components/common/page-layout";
import { gymsColumns, type Gym } from "@/components/management/gyms/gyms-columns";
import { GymsFilter } from "@/components/management/gyms/gyms-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";

const gyms: Gym[] = [
  { id: 1, name: "Jollof Rice", location: "29321 Mohamed Springs", views: "1.5k", status: "Active" },
  { id: 2, name: "Fried Rice", location: "99645 Florida Greens", views: "1.5k", status: "Active" },
  { id: 3, name: "Meat Pie", location: "37491 Roy Highway", views: "1.5k", status: "Unavailable" },
  { id: 4, name: "Fish Roll", location: "52913 Hegmann Underpass", views: "1.5k", status: "Active" },
  { id: 5, name: "Puff Puff", location: "82492 Corwin Bridge", views: "1.5k", status: "Unavailable" },
  { id: 6, name: "Fried Rice", location: "2919 E State Street", views: "1.5k", status: "Active" },
  { id: 7, name: "Fried Rice", location: "997 Jose Square", views: "1.5k", status: "Active" },
  { id: 8, name: "Fried Rice", location: "42274 Michaela Shores", views: "1.5k", status: "Active" },
  { id: 9, name: "Fried Rice", location: "73429 Furman Manor", views: "1.5k", status: "Active" },
  { id: 10, name: "Fried Rice", location: "9497 Greenway", views: "1.5k", status: "Active" },
];

const meta = {
  total: gyms.length,
  page: 1,
  limit: 10,
  totalPages: Math.ceil(gyms.length / 10),
};

const Gyms = () => {
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader title="Gym Management" description="Manage your gyms here" length={gyms.length} />
        <GymsFilter />
      </div>
      <DataTable columns={gymsColumns} data={gyms} meta={meta} />
    </PageLayout>
  );
};

export default Gyms;

