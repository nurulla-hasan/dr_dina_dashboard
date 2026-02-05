
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

const AddProgramModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full">+ Add Specialty</Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border shadow-2xl">
          <div className="w-full h-40 md:h-56 bg-muted">
            <img
              src="https://images.unsplash.com/photo-1758875570137-8691b7c55033?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Add Program"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="px-8 py-6 space-y-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold font-crimson">
                Add Specialty
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Specialty Name</p>
                <Input placeholder="Enter specialty name" />
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="min-w-40 rounded-full">Save</Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default AddProgramModal;
