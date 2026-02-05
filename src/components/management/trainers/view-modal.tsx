;

import { useState } from "react";
import { Eye, Check, X } from "lucide-react";

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
import { ScrollArea } from "@/components/ui/scroll-area";

const initialCertifications = [
  { id: 1, name: "NASM", status: "Approved" },
  { id: 2, name: "ACE", status: "Approved" },
  { id: 3, name: "NACM", status: "Pending" },
];

const fakeTrainer = {
  name: "Jemi Black",
  status: "Complete",
  email: "mahmud@gmail.com",
  contactNo: "+91 9355 574544",
  views: "1544",
  totalReferral: "1544",
  designation: "Trainer",
  address: "68/ Joker Vila, Gotham City",
  specialties: "Weight Loss, Strength Training, Nutrition",
  avatar:
    "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400",
};

const TrainerViewModal = () => {
  const [open, setOpen] = useState(false);
  const [certifications, setCertifications] = useState(initialCertifications);

  const updateCertStatus = (id: number, newStatus: string) => {
    setCertifications((prev) =>
      prev.map((cert) =>
        cert.id === id ? { ...cert, status: newStatus } : cert
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-md p-0 overflow-hidden border shadow-2xl">
          <div className="bg-primary/20 px-6 pb-8 pt-8 flex flex-col items-center shrink-0">
            <div className="h-28 w-28 rounded-full border-[6px] border-background shadow-lg overflow-hidden bg-background">
              <img
                src={fakeTrainer.avatar}
                alt={fakeTrainer.name}
                className="h-full w-full object-cover"
              />
            </div>

            <DialogHeader className="mt-4 text-center">
              <DialogTitle className="text-xl font-semibold font-crimson">
                {fakeTrainer.name}
              </DialogTitle>
            </DialogHeader>
          </div>

          <ScrollArea className="max-h-[40vh] whitespace-nowrap">
            <div className="px-8 py-6 space-y-4 text-sm">
              <InfoRow label="Status">
                <span className="text-emerald-600 font-medium">
                  {fakeTrainer.status}
                </span>
              </InfoRow>
              <InfoRow label="Email">{fakeTrainer.email}</InfoRow>
              <InfoRow label="Contact No">{fakeTrainer.contactNo}</InfoRow>
              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Views">{fakeTrainer.views}</InfoRow>
                <InfoRow label="Total Referral">{fakeTrainer.totalReferral}</InfoRow>
              </div>
              <InfoRow label="Designation">{fakeTrainer.designation}</InfoRow>
              <InfoRow label="Address">{fakeTrainer.address}</InfoRow>
              <InfoRow label="Specialties">{fakeTrainer.specialties}</InfoRow>
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground border-b pb-1">
                  Certifications Management
                </p>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-center justify-between bg-muted/30 p-2 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{cert.name}</span>
                        <Badge
                          variant={
                            cert.status === "Approved"
                              ? "success"
                              : cert.status === "Rejected"
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-[10px] h-4 px-1.5"
                        >
                          {cert.status}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        {cert.status !== "Approved" && (
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7 text-emerald-600 hover:bg-emerald-50"
                            onClick={() => updateCertStatus(cert.id, "Approved")}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        {cert.status !== "Rejected" && (
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7 text-red-600 hover:bg-red-50"
                            onClick={() => updateCertStatus(cert.id, "Rejected")}
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default TrainerViewModal;

const InfoRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-0.5">
    <p className="text-xs font-medium text-muted-foreground">{label}</p>
    <p className="text-sm text-foreground">{children}</p>
  </div>
);

