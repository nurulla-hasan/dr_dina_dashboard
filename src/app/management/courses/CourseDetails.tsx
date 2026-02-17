import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  UserPlus,
  ShieldCheck,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
} from "@/redux/feature/course/courseApis";
import {
  AssignUserModal,
  type AssignUserType,
} from "@/components/management/courses/assign-user-modal";
import { EditCourseModal } from "@/components/management/courses/edit-course-modal";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { formatDate, ErrorToast, SuccessToast } from "@/lib/utils";
import type { TCourse } from "@/types/course.type";
import type { TUser } from "@/types/user.type";
import type { TError } from "@/types/global.types";

import { CourseTabularReport } from "@/components/management/courses/course-tabular-report";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignType, setAssignType] = useState<AssignUserType | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Fetch all courses and find the specific one
  // This is a workaround since there is no single course API
  const { course, isLoading } = useGetAllCoursesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      course: data?.data?.result?.find((c: TCourse) => c._id === id),
      isLoading,
    }),
  });

  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

  const handleDelete = async () => {
    if (!course) return;
    try {
      const res = await deleteCourse(course._id).unwrap();
      if (res.success) {
        SuccessToast(res.message || "Course deleted successfully");
        setIsConfirmOpen(false);
        navigate("/courses");
      }
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.data?.message || "Failed to delete course");
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading course details...</div>;
  }

  if (!course) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <Button onClick={() => navigate("/courses")}>
          <ArrowLeft />
          Back to Courses
        </Button>
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "Pending":
        return "warning";
      case "Complete":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/courses")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-primary">Course Details</h1>
      </div>

      {/* Course Info Card */}
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 h-32 md:h-48 rounded-lg overflow-hidden border bg-muted shrink-0">
            {course.image ? (
              <img
                src={course.image}
                alt={course.subjectName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-foreground">
                    {course.className} – {course.subjectName}
                  </h2>
                  <Badge
                    variant={getStatusVariant(course.status)}
                    className="px-3 py-1 text-xs rounded-full"
                  >
                    {course.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1">
                  {course.subjectName}
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Teacher:</span>
                    {course.teacherId ? (
                      <span className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={course.teacherId.image} />
                          <AvatarFallback>
                            {course.teacherId.fullName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {course.teacherId.fullName}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Not assigned
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Total Enrolled Student:</span>
                    <span>{course.totalEnrolled}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2">
                  <EditCourseModal
                    course={course}
                    trigger={
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full"
                      >
                        <Edit />
                      </Button>
                    }
                  />

                  <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setIsConfirmOpen(true)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Assign Teacher */}
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Assign Teacher</h3>
            {course.teacherId ? (
              <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/20">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={course.teacherId.image} />
                    <AvatarFallback>
                      {course.teacherId.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {course.teacherId.fullName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {course.teacherId.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setAssignType("assign-teacher")}
                >
                  <Edit />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full h-15 border-dashed"
                onClick={() => setAssignType("assign-teacher")}
              >
                <ShieldCheck />
                Assign Teacher
              </Button>
            )}
          </div>

          {/* Assign Assistant */}
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Assign Assistance</h3>
            {course.assistantId ? (
              <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/20">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={course.assistantId.image} />
                    <AvatarFallback>
                      {course.assistantId.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {course.assistantId.fullName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {course.assistantId.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setAssignType("assign-assistant")}
                >
                  <Edit />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full h-15 border-dashed"
                onClick={() => setAssignType("assign-assistant")}
              >
                <Shield />
                Assign Assistant
              </Button>
            )}
          </div>

          {/* Add Student */}
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Add student</h3>
            <Button
              variant="outline"
              className="w-full h-15 border-dashed"
              onClick={() => setAssignType("add-student")}
            >
              <UserPlus />
              Add Student
            </Button>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="p-2 border-b bg-primary text-primary-foreground">
          <h3 className="text-xl font-semibold">Assign Student List</h3>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SI NO.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {course.students && course.students.length > 0 ? (
                course.students.map((student: TUser, index: number) => (
                  <TableRow key={student._id}>
                    <TableCell className="font-medium">#{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.image} />
                          <AvatarFallback>
                            {student.fullName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{student.fullName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{formatDate(student.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        className="text-red-600 focus:text-red-600"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => {
                          // We can reuse AssignUserModal with 'remove-student' type
                          // But passing pre-selected user might require changes to AssignUserModal
                          // For now, let's open the modal where user can select student to remove
                          setAssignType("remove-student");
                        }}
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No students assigned to this course.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Tabular Report */}
      <div className="mt-6">
        <CourseTabularReport courseId={course._id} />
      </div>

      {/* Modals */}
      {assignType && (
        <AssignUserModal
          course={course}
          type={assignType}
          open={!!assignType}
          onOpenChange={(open) => !open && setAssignType(null)}
        />
      )}

      <ConfirmationModal
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleDelete}
        title="Delete Course"
        description={`Are you sure you want to delete "${course.className} - ${course.subjectName}"? This action cannot be undone.`}
        isLoading={isDeleting}
        trigger={null}
      />
    </div>
  );
};

export default CourseDetails;
