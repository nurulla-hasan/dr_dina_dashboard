import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddFAQModal from "./add-faq-modal";
import type { TFaq } from "@/types/faq.type";
import { useDeleteFaqMutation } from "@/redux/feature/faq/faqApis";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { TError } from "@/types/global.types";
import { useState } from "react";

const ActionCell = ({ row }: { row: { original: TFaq } }) => {
  const [deleteFaq, { isLoading }] = useDeleteFaqMutation();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await deleteFaq(row.original._id).unwrap();
      SuccessToast(res.message || "FAQ deleted successfully");
      setOpen(false);
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.data?.message || "Failed to delete FAQ");
    }
  };

  return (
    <div className="flex items-center justify-end">
      <AddFAQModal mode="edit" faq={row.original}>
        <Button variant="ghost" size="icon-sm" className="text-primary">
          <Edit />
        </Button>
      </AddFAQModal>
      <ConfirmationModal
        open={open}
        onOpenChange={setOpen}
        title="Delete FAQ"
        description="Are you sure you want to delete this FAQ? This action cannot be undone."
        onConfirm={handleDelete}
        isLoading={isLoading}
        confirmButtonText="Delete"
        trigger={
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-destructive"
          >
            <Trash2 />
          </Button>
        }
      />
    </div>
  );
};

export default ActionCell;
