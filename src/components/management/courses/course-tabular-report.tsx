import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTabularReportQuery } from "@/redux/feature/course/courseApis";
import { Loader2 } from "lucide-react";

interface TabularReportItem {
  studentName: string;
  attendance: string;
  hwCompleted: string;
  hwPending: string;
  examGrade: string;
}

export const CourseTabularReport = ({ courseId }: { courseId: string }) => {
  const { data, isLoading } = useGetTabularReportQuery(courseId);
  const reportData: TabularReportItem[] = data?.data || [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Course Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!reportData.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Course Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            No report data available for this course.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
      <div className="p-2 border-b bg-primary text-primary-foreground">
        <h3 className="text-xl font-semibold">Course Report</h3>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>HW Completed</TableHead>
              <TableHead>HW Pending</TableHead>
              <TableHead>Exam Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {item.studentName}
                </TableCell>
                <TableCell>{item.attendance}</TableCell>
                <TableCell>{item.hwCompleted}</TableCell>
                <TableCell>{item.hwPending}</TableCell>
                <TableCell>{item.examGrade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
