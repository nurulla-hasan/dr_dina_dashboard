
import type { TUser } from "./user.type";

export type TCourse = {
  _id: string;
  className: string;
  subjectName: string;
  image?: string;
  status: "Active" | "Pending" | "Complete";
  teacherId?: TUser | null;
  assistantId?: TUser | null;
  students: TUser[];
  totalEnrolled: number;
  createdAt: string;
  updatedAt: string;
};
