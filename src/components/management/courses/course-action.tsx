import { useState } from "react";
import { MoreHorizontal, Trash2, UserPlus, UserMinus, ShieldCheck, Shield, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { useDeleteCourseMutation } from "@/redux/feature/course/courseApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { TCourse } from "@/types/course.type";
import type { TError } from "@/types/global.types";

import { EditCourseModal } from "./edit-course-modal";
import { AssignUserModal, type AssignUserType } from "./assign-user-modal";

interface CourseActionProps {
  course: TCourse;
}

export const CourseAction = ({ course }: CourseActionProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [assignType, setAssignType] = useState<AssignUserType | null>(null);
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteCourse(course._id).unwrap();
      if (res.success) {
        SuccessToast(res.message || "Course deleted successfully");
        setIsConfirmOpen(false);
      }
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.data?.message || "Failed to delete course");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <EditCourseModal
            course={course}
            trigger={
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Edit />
                Edit
              </DropdownMenuItem>
            }
          />
          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setAssignType("assign-teacher")}
          >
            <ShieldCheck />
            Assign Teacher
          </DropdownMenuItem>
          
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setAssignType("assign-assistant")}
          >
            <Shield />
            Assign Assistant
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setAssignType("add-student")}
          >
            <UserPlus />
            Add Student
          </DropdownMenuItem>
          
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setAssignType("remove-student")}
          >
            <UserMinus />
            Remove Student
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            className="cursor-pointer text-red-600 focus:text-red-600"
            onClick={() => setIsConfirmOpen(true)}
          >
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationModal
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleDelete}
        trigger={null}
        title="Delete Course"
        description={`Are you sure you want to delete "${course.className} - ${course.subjectName}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />

      {assignType && (
        <AssignUserModal
          course={course}
          type={assignType}
          open={!!assignType}
          onOpenChange={(open) => !open && setAssignType(null)}
        />
      )}
    </>
  );
};
