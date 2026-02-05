import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Mail } from "lucide-react";

const ProfileHeader = () => {
  // Fake data for design
  const admin = {
    name: "John Doe",
    email: "admin@example.com",
    role: "Super Admin",
    image: "https://github.com/shadcn.png",
    since: "January 2024",
  };

  return (
    <Card className="mb-6 overflow-hidden border-none shadow-sm bg-linear-to-r from-primary/10 via-background to-background">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
              <AvatarImage src={admin.image} alt={admin.name} />
              <AvatarFallback className="text-2xl">{admin.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 border-2 border-background rounded-full"></div>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className="text-2xl font-bold text-foreground">{admin.name}</h1>
              <Badge variant="secondary" className="w-fit mx-auto md:mx-0">
                {admin.role}
              </Badge>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                <span>{admin.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>Joined {admin.since}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
