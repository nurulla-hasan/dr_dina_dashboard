import { z } from "zod";

export const createCourseSchema = z.object({
  className: z.string().min(1, "Class name is required"),
  subjectName: z.string().min(1, "Subject name is required"),
  status: z.enum(["Active", "Pending", "Complete"]).optional(),
  image: z.instanceof(File).optional(),
});

export type CreateCourseValues = z.infer<typeof createCourseSchema>;
