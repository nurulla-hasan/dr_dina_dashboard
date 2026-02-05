;

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

const fakeGym = {
  name: "Fitlife Gym",
  status: "Active",
  email: "contact@fitlife.com",
  contactNo: "+91 9355 574544",
  views: "1134",
  favourite: "1134",
  address: "99645 Florida Greens",
  specialties: "Cardio, Strength Training, CrossFit",
  amenities: ["Sauna", "Locker", "Parking"],
  cover:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
};

const GymViewModal = () => {
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
          <div className="w-full h-40 md:h-56 bg-muted">
            <img
              src={fakeGym.cover}
              alt={fakeGym.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="px-8 py-6 space-y-6">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-semibold font-crimson">
                {fakeGym.name}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <InfoRow label="Gym Name">{fakeGym.name}</InfoRow>
              <InfoRow label="Gym Location">{fakeGym.address}</InfoRow>
              <InfoRow label="Gym View">{fakeGym.views}</InfoRow>
              <InfoRow label="Gym Favourite">{fakeGym.favourite}</InfoRow>
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-muted-foreground">Status</p>
                <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-600">
                  Active
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <InfoRow label="Email">{fakeGym.email}</InfoRow>
              <InfoRow label="Contact No">{fakeGym.contactNo}</InfoRow>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Facilities</p>
              <div className="flex flex-wrap gap-2">
                {fakeGym.amenities.map((a) => (
                  <Badge key={a} variant="success" className="rounded-full px-3">
                    {a}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default GymViewModal;

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
