import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddAdminModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full">+ Add Admin</Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-xl p-0 overflow-hidden border shadow-2xl">
          <div className="px-8 py-6 space-y-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold font-crimson text-center">
                Add New Admin
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Full Name</p>
                <Input placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Email Address</p>
                <Input placeholder="Enter email address" type="email" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Password</p>
                <Input placeholder="Enter password" type="password" />
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="min-w-40 rounded-full">Save Admin</Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default AddAdminModal;
