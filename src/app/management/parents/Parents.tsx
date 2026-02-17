import { UserRoleList } from "@/components/management/users/user-role-list";

const ParentsList = () => {
  return (
    <UserRoleList
      role="parent"
      title="Parents List"
      description="Manage all parents"
    />
  );
};

export default ParentsList;
