import PageLayout from "@/components/common/page-layout";
import {
  adminsColumns,
  type Admin,
} from "@/components/management/admins/admins-columns";
import { AdminsFilter } from "@/components/management/admins/admins-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";

const admins: Admin[] = [
  {
    id: 1,
    name: "Nurulla Hasan",
    email: "nurulla.hasan@example.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Mike Merritt",
    email: "mike.merritt@example.com",
    role: "Admin",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin.user@example.com",
    role: "Admin",
  },
];

const meta = {
  total: admins.length,
  page: 1,
  limit: 10,
  totalPages: 1,
};

const Admins = () => {
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader
          title="Admin Management"
          description="Manage all Platform Admins"
          length={admins.length}
        />

        <AdminsFilter />
      </div>

      <DataTable columns={adminsColumns} data={admins} meta={meta} />
    </PageLayout>
  );
};

export default Admins;
