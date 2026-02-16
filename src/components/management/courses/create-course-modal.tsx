
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { useCreateCourseMutation } from "@/redux/feature/course/courseApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { TError } from "@/types/global.types";

export const CreateCourseModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    className: "",
    subjectName: "",
    image: "",
  });

  const [createCourse, { isLoading }] = useCreateCourseMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.className || !formData.subjectName) {
      ErrorToast("Class name and subject name are required");
      return;
    }

    try {
      const res = await createCourse(formData).unwrap();
      if (res.success) {
        SuccessToast(res.message || "Course created successfully");
        setOpen(false);
        setFormData({ className: "", subjectName: "", image: "" });
      }
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.data?.message || "Failed to create course");
    }
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Create New Course"
      description="Add a new course to the system. Fill in the details below."
      actionTrigger={
        <Button className="rounded-full">
          <Plus />
          Create Course
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="className">Class Name <span className="text-red-500">*</span></Label>
          <Input
            id="className"
            name="className"
            placeholder="e.g. Grade 9"
            value={formData.className}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subjectName">Subject Name <span className="text-red-500">*</span></Label>
          <Input
            id="subjectName"
            name="subjectName"
            placeholder="e.g. Physics"
            value={formData.subjectName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            placeholder="https://example.com/image.png"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Course"}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};
