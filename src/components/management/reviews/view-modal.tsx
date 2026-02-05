"use client";

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

const fakeReview = {
  name: "Jollof Rice",
  email: "johndeo@gmail.com",
  review:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at velit maximus, molestie est a, tempor magna.",
  rating: 5,
};

const ReviewViewModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-xl p-0 overflow-hidden border shadow-2xl">
          <div className="h-1.5 w-full bg-linear-to-r from-primary via-amber-400 to-rose-400" />

          <div className="px-8 py-7 space-y-5">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-xl font-semibold font-crimson">
                Review Details
              </DialogTitle>
              <p className="text-xs text-muted-foreground">{fakeReview.email}</p>
            </DialogHeader>

            <div className="space-y-3 text-sm">
              <InfoRow label="User Name" value={fakeReview.name} />
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <p className="text-sm font-medium">Rating</p>
                <p className="text-lg text-amber-400 leading-none">
                  {"★".repeat(fakeReview.rating)}
                  <span className="text-muted-foreground/40">
                    {"☆".repeat(5 - fakeReview.rating)}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                <p className="text-sm font-medium">Review</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {fakeReview.review}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ReviewViewModal;

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
    <p className="text-sm font-medium">{label}</p>
    <p className="text-sm text-muted-foreground">{value}</p>
  </div>
);

