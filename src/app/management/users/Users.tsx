import PageLayout from "@/components/common/page-layout";
import {
  usersColumns,
  type User,
} from "@/components/management/users/users-columns";
import { UsersFilter } from "@/components/management/users/users-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Trainer",
    status: "Approved",
    joinedDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Individual",
    status: "Decline",
    joinedDate: "2024-01-16",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    role: "Trainer",
    status: "Decline",
    joinedDate: "2024-01-17",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily.brown@example.com",
    role: "Individual",
    status: "Approved",
    joinedDate: "2024-01-18",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "Individual",
    status: "Approved",
    joinedDate: "2024-01-19",
  },
  {
    id: 6,
    name: "Sophia Taylor",
    email: "sophia.taylor@example.com",
    role: "Trainer",
    status: "Decline",
    joinedDate: "2024-01-20",
  },
  {
    id: 7,
    name: "Daniel Anderson",
    email: "daniel.anderson@example.com",
    role: "Individual",
    status: "Approved",
    joinedDate: "2024-01-21",
  },
  {
    id: 8,
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    role: "Individual",
    status: "Approved",
    joinedDate: "2024-01-22",
  },
  {
    id: 9,
    name: "James Wilson",
    email: "james.wilson@example.com",
    role: "Individual",
    status: "Approved",
    joinedDate: "2024-01-23",
  },
  {
    id: 10,
    name: "William Davis",
    email: "william.davis@example.com",
    role: "Individual",
    status: "Approved",
    joinedDate: "2024-01-24",
  },
];

const meta = {
  total: users.length,
  page: 1,
  limit: 10,
  totalPages: 4,
};

const Users = () => {
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader
          title="User Management"
          description="User all Platform Users"
          length={users.length}
        />

        <UsersFilter />
      </div>

      <DataTable columns={usersColumns} data={users} meta={meta} />
    </PageLayout>
  );
};

export default Users;
