
import PageLayout from "@/components/common/page-layout";
import {
  coursesColumns,
} from "@/components/management/courses/courses-columns";
import { CoursesFilter } from "@/components/management/courses/courses-filter";
import { DataTable } from "@/components/ui/custom/data-table";
import PageHeader from "@/components/ui/custom/page-header";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetAllCoursesQuery } from "@/redux/feature/course/courseApis";
import type { TCourse } from "@/types/course.type";

const Courses = () => {
  const { data, meta, isLoading, isError, setPage, filter, setFilter } =
    useSmartFetchHook<{ page: number; limit: number; searchTerm: string }, TCourse>(
      useGetAllCoursesQuery
    );

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader
          title="Course Managements"
          description="View and manage all courses"
          length={meta?.total || 0}
        />
        <CoursesFilter filter={filter} setFilter={setFilter} />
      </div>
      <DataTable
        columns={coursesColumns}
        data={data}
        meta={meta}
        isLoading={isLoading}
        isError={isError}
        onPageChange={setPage}
      />
    </PageLayout>
  );
};

export default Courses;
