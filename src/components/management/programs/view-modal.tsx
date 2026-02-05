
import { useState } from "react";
import { Eye } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const fakeProgram = {
  trainerName: "Jollof Rice",
  programName: "Strength Training Basics",
  price: "$299",
  views: "1.5k",
  status: "Approved",
  favourite: "1267",
  cover:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const ProgramViewModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border shadow-2xl">
          <div className="w-full h-44 md:h-60 bg-muted">
            <img
              src={fakeProgram.cover}
              alt={fakeProgram.programName}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="px-8 py-6 space-y-6">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-semibold font-crimson">
                {fakeProgram.programName}
              </DialogTitle>
            </DialogHeader>

            <div>
              <InfoRow label="Program Name" value={fakeProgram.programName} />
              <InfoRow label="Trainer Name" value={fakeProgram.trainerName} />
              <InfoRow label="Program View" value={fakeProgram.views} />
              <InfoRow label="Program Favourite" value={fakeProgram.favourite} />
              <InfoRow label="Price" value={fakeProgram.price} />
              <StatusRow value={fakeProgram.status} />
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ProgramViewModal;

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[160px_1fr] items-center gap-4 px-2 py-2 rounded-md">
    <p className="text-sm font-medium">{label}</p>
    <p className="text-sm text-muted-foreground">{value}</p>
  </div>
);

const StatusRow = ({ value }: { value: string }) => (
  <div className="grid grid-cols-[160px_1fr] items-center gap-4 px-2 py-2 rounded-md">
    <p className="text-sm font-medium">Status</p>
    <div className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-600">
      {value}
    </div>
  </div>
);
