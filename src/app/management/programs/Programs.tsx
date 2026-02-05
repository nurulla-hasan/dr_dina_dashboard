import PageLayout from "@/components/common/page-layout";
import {
  programsColumns,
  type Program,
} from "@/components/management/programs/programs-columns";
import { ProgramsFilter } from "@/components/management/programs/programs-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";

const programs: Program[] = [
  { id: 1, trainerName: "Jollof Rice", programName: "Strength Training Basics", price: "$299", views: "1.5k", status: "Approved" },
  { id: 2, trainerName: "Fried Rice", programName: "12-Week Transformation Program", price: "$344", views: "1.5k", status: "Approved" },
  { id: 3, trainerName: "Meat Pie", programName: "Custom Nutrition Plan", price: "$299", views: "1.5k", status: "Approved" },
  { id: 4, trainerName: "Fish Roll", programName: "Strength Training Basics", price: "$277", views: "1.5k", status: "Decline" },
  { id: 5, trainerName: "Puff Puff", programName: "Strength Training Basics", price: "$277", views: "1.5k", status: "Approved" },
  { id: 6, trainerName: "Fried Rice", programName: "Strength Training Basics", price: "$70", views: "1.5k", status: "Approved" },
  { id: 7, trainerName: "Fried Rice", programName: "Strength Training Basics", price: "$277", views: "1.5k", status: "Approved" },
  { id: 8, trainerName: "Fried Rice", programName: "Strength Training Basics", price: "$277", views: "1.5k", status: "Approved" },
  { id: 9, trainerName: "Fried Rice", programName: "12-Week Transformation Program", price: "$277", views: "1.5k", status: "Decline" },
  { id: 10, trainerName: "Fried Rice", programName: "12-Week Transformation Program", price: "$277", views: "1.5k", status: "Approved" },
];

const meta = {
  total: programs.length,
  page: 1,
  limit: 10,
  totalPages: Math.ceil(programs.length / 10),
};

const Programs = () => {
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between">
        <PageHeader title="Program management" description="Manage your programs here" />
        <ProgramsFilter />
      </div>
      <DataTable columns={programsColumns} data={programs} meta={meta} />
    </PageLayout>
  );
};

export default Programs;

