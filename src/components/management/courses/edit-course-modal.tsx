import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { useUpdateCourseMutation } from "@/redux/feature/course/courseApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { TError } from "@/types/global.types";
import {
  createCourseSchema,
  type CreateCourseValues,
} from "@/schemas/course.schema";
import type { ReactNode } from "react";
import type { TCourse } from "@/types/course.type";

interface EditCourseModalProps {
  course: TCourse;
  trigger?: ReactNode;
}

export const EditCourseModal = ({
  course,
  trigger,
}: EditCourseModalProps) => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(course.image || null);
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const form = useForm<CreateCourseValues>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      className: course.className,
      subjectName: course.subjectName,
      status: course.status,
    },
  });

  // Clean up preview URL when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const onSubmit = async (values: CreateCourseValues) => {
    const data = new FormData();

    // Construct the body object
    const body = {
      className: values.className,
      subjectName: values.subjectName,
      status: values.status,
    };
    data.append("body", JSON.stringify(body));

    // Append image if exists and it's a File (newly uploaded)
    if (values.image instanceof File) {
      data.append("image", values.image);
    }

    try {
      const res = await updateCourse({ id: course._id, data }).unwrap();
      if (res.success) {
        SuccessToast(res.message || "Course updated successfully");
        setOpen(false);
      }
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.data?.message || "Failed to update course");
    }
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Edit Course"
      description="Update course details. Fill in the details below."
      actionTrigger={trigger}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
          <FormField
            control={form.control}
            name="className"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Class Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Grade 9" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subjectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Subject Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Physics" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Complete">Complete</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Course Image</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    {!preview ? (
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="edit-image-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors border-muted-foreground/25"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-1 text-sm text-muted-foreground">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG or GIF (MAX. 2MB)
                            </p>
                          </div>
                          <Input
                            {...fieldProps}
                            id="edit-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => {
                              const file =
                                event.target.files && event.target.files[0];
                              if (file) {
                                onChange(file);
                                const url = URL.createObjectURL(file);
                                setPreview(url);
                              }
                            }}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border group">
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="rounded-full"
                            onClick={() => {
                              setPreview(null);
                              onChange(undefined);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-4">
            <Button type="submit" loading={isLoading} loadingText="Updating...">
              Update Course
            </Button>
          </div>
        </form>
      </Form>
    </ModalWrapper>
  );
};
