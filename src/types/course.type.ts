
import type { TUser } from "./user.type";

export type TCourse = {
  _id: string;
  className: string;
  subjectName: string;
  image?: string;
  status: "Pending" | "active" | "inactive";
  teacher?: TUser | null;
  assistant?: TUser | null;
  students: TUser[];
  totalEnrolled: number;
  createdAt: string;
  updatedAt: string;
};
