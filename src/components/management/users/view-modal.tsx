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

const fakeUser = {
  name: "Jemi Black",
  status: "Complete",
  email: "mahmud@gmail.com",
  contactNo: "+91 9355 574544",
  designation: "Individual",
  address: "68/ Joker Vila, Gotham City",
  avatar:
    "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400",
};

const UserViewModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Eye button for actions column */}
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="max-w-md p-0 overflow-hidden border shadow-2xl">
          {/* Top banner with avatar */}
          <div className="bg-primary/20 px-6 pb-8 pt-8 flex flex-col items-center">
            <div className="h-28 w-28 rounded-full border-[6px] border-background shadow-lg overflow-hidden bg-background">
              <img
                src={fakeUser.avatar}
                alt={fakeUser.name}
                className="h-full w-full object-cover"
              />
            </div>

            <DialogHeader className="mt-4 text-center">
              <DialogTitle className="text-xl font-semibold font-crimson">
                {fakeUser.name}
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Details section */}
          <div className="px-8 py-6 space-y-4 text-sm">
            <InfoRow label="Status">
              <span className="text-emerald-600 font-medium">
                {fakeUser.status}
              </span>
            </InfoRow>
            <InfoRow label="Email">{fakeUser.email}</InfoRow>
            <InfoRow label="Contact No">{fakeUser.contactNo}</InfoRow>
            <InfoRow label="Designation">{fakeUser.designation}</InfoRow>
            <InfoRow label="Address">{fakeUser.address}</InfoRow>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-center gap-4 px-8 pb-6 pt-2">
            <Button className="min-w-30 rounded-full text-white hover:bg-primary/90">
              Accept
            </Button>
            <Button
              variant="destructive"
              className="min-w-30 rounded-full bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default UserViewModal;

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
