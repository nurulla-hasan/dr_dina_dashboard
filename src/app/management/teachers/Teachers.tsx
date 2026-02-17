import { UserRoleList } from "@/components/management/users/user-role-list";

const TeacherList = () => {
  return (
    <UserRoleList
      role="teacher"
      title="Teacher List"
      description="Manage all teachers"
    />
  );
};

export default TeacherList;
