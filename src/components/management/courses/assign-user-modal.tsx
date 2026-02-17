import { useState } from "react";
import { Check, Loader2, Search, UserX } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import {
  useAddStudentMutation,
  useAssignAssistantMutation,
  useAssignTeacherMutation,
  useRemoveStudentMutation,
} from "@/redux/feature/course/courseApis";
import { useGetAllUsersQuery } from "@/redux/feature/user/userApis";
import { ErrorToast, SuccessToast, cn } from "@/lib/utils";
import type { TCourse } from "@/types/course.type";
import type { TUser } from "@/types/user.type";
import type { TError } from "@/types/global.types";

export type AssignUserType =
  | "assign-teacher"
  | "assign-assistant"
  | "add-student"
  | "remove-student";

interface AssignUserModalProps {
  course: TCourse;
  type: AssignUserType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export const AssignUserModal = ({
  course,
  type,
  open,
  onOpenChange,
  trigger,
}: AssignUserModalProps) => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Mutations
  const [assignTeacher, { isLoading: isAssigningTeacher }] =
    useAssignTeacherMutation();
  const [assignAssistant, { isLoading: isAssigningAssistant }] =
    useAssignAssistantMutation();
  const [addStudent, { isLoading: isAddingStudent }] = useAddStudentMutation();
  const [removeStudent, { isLoading: isRemovingStudent }] =
    useRemoveStudentMutation();

  // Determine query params based on type
  const queryRole =
    type === "assign-teacher"
      ? "teacher"
      : type === "assign-assistant"
      ? "assistant"
      : "student";

  // Fetch users only if not removing student (since remove uses local course.students)
  const shouldFetch = type !== "remove-student";
  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsersQuery(
    {
      role: queryRole,
      searchTerm: search,
      limit: 2, // Fetch enough users
    },
    { skip: !shouldFetch }
  );

  const users =
    type === "remove-student"
      ? (course.students || []).filter(
          (student) =>
            student.fullName.toLowerCase().includes(search.toLowerCase()) ||
            student.email.toLowerCase().includes(search.toLowerCase())
        )
      : Array.isArray(usersData?.data?.result)
      ? usersData.data.result
      : Array.isArray(usersData?.data)
      ? usersData.data
      : [];

  const isLoading =
    isAssigningTeacher ||
    isAssigningAssistant ||
    isAddingStudent ||
    isRemovingStudent;

  const getModalTitle = () => {
    switch (type) {
      case "assign-teacher":
        return "Assign Teacher";
      case "assign-assistant":
        return "Assign Assistant";
      case "add-student":
        return "Add Student";
      case "remove-student":
        return "Remove Student";
      default:
        return "Manage Users";
    }
  };

  const getModalDescription = () => {
    switch (type) {
      case "assign-teacher":
        return "Select a teacher to assign to this course.";
      case "assign-assistant":
        return "Select an assistant to assign to this course.";
      case "add-student":
        return "Select a student to add to this course.";
      case "remove-student":
        return "Select a student to remove from this course.";
      default:
        return "";
    }
  };

  const handleConfirm = async () => {
    if (!selectedUser) return;

    try {
      let res;
      if (type === "assign-teacher") {
        res = await assignTeacher({
          id: course._id,
          data: { teacherId: selectedUser },
        }).unwrap();
      } else if (type === "assign-assistant") {
        res = await assignAssistant({
          id: course._id,
          data: { assistantId: selectedUser },
        }).unwrap();
      } else if (type === "add-student") {
        res = await addStudent({
          id: course._id,
          data: { studentId: selectedUser },
        }).unwrap();
      } else if (type === "remove-student") {
        res = await removeStudent({
          id: course._id,
          data: { studentId: selectedUser },
        }).unwrap();
      }

      if (res?.success) {
        SuccessToast(res.message || "Operation successful");
        onOpenChange(false);
        setSelectedUser(null);
        setSearch("");
      }
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.data?.message || "Operation failed");
    }
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={onOpenChange}
      title={getModalTitle()}
      description={getModalDescription()}
      actionTrigger={trigger}
    >
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ScrollArea className="h-75 border rounded-md p-2">
          {shouldFetch && isLoadingUsers ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <UserX className="h-8 w-8 mb-2" />
              <p>No users found</p>
            </div>
          ) : (
            <div className="space-y-1">
              {users.map((user: TUser) => {
                const isSelected = selectedUser === user._id;
                // For add-student, disable if already enrolled
                const isAlreadyEnrolled =
                  type === "add-student" &&
                  course.students.some((s) => s._id === user._id);
                // For assign-teacher, disable if already assigned (optional, but maybe good UX)
                const isCurrentTeacher =
                  type === "assign-teacher" && course.teacherId?._id === user._id;
                // For assign-assistant, disable if already assigned
                const isCurrentAssistant =
                  type === "assign-assistant" &&
                  course.assistantId?._id === user._id;

                const isDisabled =
                  isAlreadyEnrolled || isCurrentTeacher || isCurrentAssistant;

                return (
                  <div
                    key={user._id}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors",
                      isSelected
                        ? "bg-primary/10 border-primary/20 border"
                        : "hover:bg-muted",
                      isDisabled && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => {
                      if (!isDisabled) {
                        setSelectedUser(isSelected ? null : user._id);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.image} alt={user.fullName} />
                        <AvatarFallback>
                          {user.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {user.fullName}
                          {isAlreadyEnrolled && (
                            <span className="ml-2 text-xs text-muted-foreground">
                              (Enrolled)
                            </span>
                          )}
                          {isCurrentTeacher && (
                            <span className="ml-2 text-xs text-muted-foreground">
                              (Current)
                            </span>
                          )}
                          {isCurrentAssistant && (
                            <span className="ml-2 text-xs text-muted-foreground">
                              (Current)
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        <div className="flex justify-end pt-2">
          <Button
            onClick={handleConfirm}
            disabled={!selectedUser || isLoading}
            loading={isLoading}
          >
            Confirm
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};
