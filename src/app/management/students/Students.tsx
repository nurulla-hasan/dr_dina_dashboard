import { UserRoleList } from "@/components/management/users/user-role-list";

const StudentsList = () => {
  return (
    <UserRoleList
      role="student"
      title="Students List"
      description="Manage all students"
    />
  );
};

export default StudentsList;
