import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Info, AlertTriangle, Clock, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, ErrorToast, formatDate, SuccessToast } from "@/lib/utils";
import {
  useGetMyNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
} from "@/redux/feature/notification/notificationApi";
import type { TNotification } from "@/types/notification.type";
import type { TError } from "@/types/global.types";
import { Skeleton } from "@/components/ui/skeleton";

const getIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case "error":
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
};

const Notifications = () => {
  const { data, isLoading } = useGetMyNotificationsQuery(undefined);
  const [markAllAsRead, { isLoading: isMarkingAll }] = useMarkAllAsReadMutation();
  const [markAsRead, { isLoading: isMarking }] = useMarkAsReadMutation();

  const notifications = data?.data?.notifications || [];
  const unreadCount = notifications.filter((n: TNotification) => !n.isRead).length;

  const handleMarkAllAsRead = async () => {
    try {
      const res = await markAllAsRead(undefined).unwrap();
      if (res.success) {
        SuccessToast(res.message || "All notifications marked as read");
      }
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.data?.message || "Failed to mark all as read");
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await markAsRead(id).unwrap();
      if (res.success) {
        SuccessToast(res.message || "Notification marked as read");
      }
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.data?.message || "Failed to mark as read");
    }
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <PageHeader
            title="Notifications"
            description="Manage and view your notifications."
          />
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleMarkAllAsRead}
                disabled={isMarkingAll}
              >
                <CheckCheck />
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="border-none shadow-sm">
                <CardContent className="p-4 flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : notifications.length > 0 ? (
            notifications.map((notification: TNotification) => (
              <Card
                key={notification._id}
                className={cn(
                  "border-none shadow-sm transition-all duration-200 hover:shadow-md",
                  !notification.isRead
                    ? "bg-primary/5 ring-1 ring-primary/10"
                    : "bg-background/50"
                )}
              >
                <CardContent className="flex gap-4">
                  <div
                    className={cn(
                      "p-2 rounded-full shrink-0 h-fit",
                      !notification.isRead
                        ? "bg-background shadow-sm"
                        : "bg-muted/50"
                    )}
                  >
                    {getIcon(notification.type)}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4
                        className={cn(
                          "text-sm font-medium",
                          !notification.isRead
                            ? "text-foreground font-semibold"
                            : "text-muted-foreground"
                        )}
                      >
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full hover:bg-primary/10 hover:text-primary -mt-1 -mr-1"
                          onClick={() => handleMarkAsRead(notification._id)}
                          disabled={isMarking}
                          title="Mark as read"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(notification.createdAt)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <div className="bg-muted/50 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
                <Info className="h-6 w-6" />
              </div>
              <p>No notifications found</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Notifications;
