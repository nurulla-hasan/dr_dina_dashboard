import PageLayout from "@/components/common/page-layout";
import { usersColumns } from "@/components/management/users/users-columns";
import { UsersFilter } from "@/components/management/users/users-filter";
import { DataTable } from "@/components/ui/custom/data-table";
import PageHeader from "@/components/ui/custom/page-header";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetAllUsersQuery } from "@/redux/feature/user/userApis";
import type { TUser } from "@/types/user.type";
import { useMemo } from "react";

interface UserRoleListProps {
  role: string;
  title: string;
  description: string;
}

export const UserRoleList = ({ role, title, description }: UserRoleListProps) => {
  const {
    data,
    meta,
    isLoading,
    isError,
    filter,
    setFilter,
    setPage,
  } = useSmartFetchHook<{ page: number; limit: number; search: string; role: string }, TUser>(
    useGetAllUsersQuery,
    { role }
  );

  // Filter out the actions column
  const columns = useMemo(() => {
    return usersColumns.filter((col) => col.id !== "actions");
  }, []);

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader
          title={title}
          description={description}
          length={meta?.total || 0}
        />

        <UsersFilter filter={filter} setFilter={setFilter} />
      </div>

      <DataTable
        columns={columns}
        data={data || []}
        meta={meta}
        onPageChange={setPage}
        isLoading={isLoading}
        isError={isError}
      />
    </PageLayout>
  );
};
