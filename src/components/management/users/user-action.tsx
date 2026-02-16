
import { useState } from "react";
import { Ban, Trash2, CheckCircle } from "lucide-react";

import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { Button } from "@/components/ui/button";
import {
  useDeleteUserMutation,
  useUpdateUserStatusMutation,
} from "@/redux/feature/user/userApis";
import type { TUser } from "@/types/user.type";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { TError } from "@/types/global.types";

interface UserActionProps {
  user: TUser;
}

export const UserAction = ({ user }: UserActionProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateUserStatusMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteUser(user._id).unwrap();
      if (res.success) {
        SuccessToast(res.message || "User deleted successfully");
        setIsDeleteOpen(false);
      }
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.message || "Failed to delete user");
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const newStatus = user.status === "blocked" ? "in-progress" : "blocked";
      const res = await updateStatus({
        id: user._id,
        data: { status: newStatus },
      }).unwrap();
      
      if (res.success) {
        SuccessToast(res.message || "User status updated successfully");
        setIsBlockOpen(false);
      } else {
        ErrorToast(res.message || "Failed to update user status");
      }
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.message || "Failed to update user status");
    }
  };

  const isBlocked = user.status === "blocked";

  return (
    <div className="flex items-center justify-end gap-2">
      <ConfirmationModal
        open={isBlockOpen}
        onOpenChange={setIsBlockOpen}
        title={isBlocked ? "Unblock User?" : "Block User?"}
        description={
          isBlocked
            ? "Are you sure you want to unblock this user? They will regain access to the platform."
            : "Are you sure you want to block this user? They will lose access to the platform."
        }
        onConfirm={handleStatusUpdate}
        isLoading={isUpdating}
        confirmButtonText={isBlocked ? "Unblock" : "Block"}
        confirmLoadingText={isBlocked ? "Unblocking..." : "Blocking..."}
        trigger={
          <Button
            variant="ghost"
            size="icon-sm"
            className={isBlocked ? "text-success hover:text-success" : "text-destructive hover:text-destructive"}
          >
            {isBlocked ? <CheckCircle /> : <Ban />}
          </Button>
        }
      />

      <ConfirmationModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete User?"
        description="This action cannot be undone. This will permanently delete the user account and remove their data from our servers."
        onConfirm={handleDelete}
        isLoading={isDeleting}
        confirmButtonText="Delete"
        confirmLoadingText="Deleting..."
        trigger={
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-destructive hover:text-destructive"
          >
            <Trash2 />
          </Button>
        }
      />
    </div>
  );
};
