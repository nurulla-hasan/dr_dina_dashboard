import PageLayout from "@/components/common/page-layout";
import {
  trainersColumns,
  type Trainer,
} from "@/components/management/trainers/trainers-columns";
import { TrainersFilter } from "@/components/management/trainers/trainers-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";

const trainers: Trainer[] = [
  {
    id: 1,
    name: "Hilda Reinger",
    email: "Hilda85@yahoo.com",
    image: "https://i.pravatar.cc/150?u=1",
    views: "1.5k",
    subscriptionFee: "...................",
    status: "Approved",
  },
  {
    id: 2,
    name: "Kerry Trantow",
    email: "Kerry_Trantow2@hotmail.com",
    image: "https://i.pravatar.cc/150?u=2",
    views: "1.5k",
    subscriptionFee: "...................",
    status: "Approved",
  },
  {
    id: 3,
    name: "Geneva Pfannerstill",
    email: "Geneva11@hotmail.com",
    image: "",
    views: "1.5k",
    subscriptionFee: "...................",
    status: "Rejected",
  },
  {
    id: 4,
    name: "Everett Williamson",
    email: "Everett_Williamson@gmail.com",
    image: "https://i.pravatar.cc/150?u=4",
    views: "1.5k",
    subscriptionFee: "...................",
    status: "Approved",
  },
  {
    id: 5,
    name: "Tonya Parker",
    email: "Tonya_Parker@gmail.com",
    image: "https://i.pravatar.cc/150?u=5",
    views: "1.5k",
    subscriptionFee: "...................",
    status: "Pending",
  },
  {
    id: 6,
    name: "Jan Leuschke",
    email: "Jan65@hotmail.com",
    image: "https://i.pravatar.cc/150?u=6",
    views: "1.5k",
    subscriptionFee: "...................",
    status: "Approved",
  },
  {
    id: 7,
    name: "Melinda Cummings",
    email: "Melinda_Cummings94@gmail.com",
    image: "https://i.pravatar.cc/150?u=7",
    views: "1.5k",
    subscriptionFee: "...................",
    status: "Pending",
  },
  {
    id: 8,
    name: "Kelvin Gusikowski",
    email: "Kelvin_Gusikowski63@yahoo.com",
    image: "https://i.pravatar.cc/150?u=8",
    views: "1.5k",
    subscriptionFee: "...................",
    status: "Approved",
  },
  {
    id: 9,
    name: "Meredith Labadie",
    email: "Meredith.Labadie@hotmail.com",
    image: "https://i.pravatar.cc/150?u=9",
    views: "1.5k",
    subscriptionFee: "...................",
    status: "Approved",
  },
  {
    id: 10,
    name: "Simon Emard",
    email: "Simon.Emard6@hotmail.com",
    image: "https://i.pravatar.cc/150?u=10",
    views: "1.5k",
    subscriptionFee: "...................",
    status: "Approved",
  },
];

const meta = {
  total: trainers.length,
  page: 1,
  limit: 10,
  totalPages: Math.ceil(trainers.length / 10),
};

const Trainers = () => {
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader
          title="Trainer Management"
          description="Manage your trainers here"
          length={trainers.length}
        />

        <TrainersFilter />
      </div>

      <DataTable columns={trainersColumns} data={trainers} meta={meta} />
    </PageLayout>
  );
};

export default Trainers;
