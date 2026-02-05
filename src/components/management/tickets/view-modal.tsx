/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const fakeTicket = {
  ticketId: "TKT-0001",
  userName: "Hilda Reinger",
  email: "admin@gmail.com",
  subject: "Issue with subscription payment",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at velit maximus, molestie est a, tempor magna.",
  date: "2 days ago",
  status: "Completed",
};

const TicketViewModal = () => {
  const [open, setOpen] = useState(false);

  const statusVariant =
    fakeTicket.status === "Completed"
      ? "success"
      : fakeTicket.status === "In Progress"
      ? "warning"
      : "muted";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border shadow-2xl">
          <div className="h-1.5 w-full bg-linear-to-r from-primary via-emerald-400 to-sky-400" />

          <div className="px-8 py-7 space-y-6">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-xl font-semibold font-crimson">
                Ticket Details
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                {fakeTicket.ticketId} • {fakeTicket.date}
              </p>
            </DialogHeader>

            <div className="space-y-3 text-sm">
              <InfoRow label="User Name" value={fakeTicket.userName} />
              <InfoRow label="Email" value={fakeTicket.email} />
              <InfoRow label="Subject" value={fakeTicket.subject} />
              <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {fakeTicket.description}
                </p>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
                <p className="text-sm font-medium">Status</p>
                <Badge variant={statusVariant as any} className="rounded-full px-3 py-1">
                  {fakeTicket.status}
                </Badge>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default TicketViewModal;

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
    <p className="text-sm font-medium">{label}</p>
    <p className="text-sm text-muted-foreground">{value}</p>
  </div>
);

