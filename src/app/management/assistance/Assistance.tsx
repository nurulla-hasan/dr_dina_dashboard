import { UserRoleList } from "@/components/management/users/user-role-list";

const AssistanceList = () => {
  return (
    <UserRoleList
      role="assistant"
      title="Assistance List"
      description="Manage all assistants"
    />
  );
};

export default AssistanceList;
