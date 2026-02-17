import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Mail, Camera, X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Admin } from "@/types/admin.type";
import { useRef } from "react";

interface ProfileHeaderProps {
  user: Admin;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
}

const ProfileHeader = ({ user, selectedImage, setSelectedImage }: ProfileHeaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const displayImage = selectedImage ? URL.createObjectURL(selectedImage) : user.image;

  return (
    <Card className="mb-6 overflow-hidden border-none shadow-sm bg-linear-to-r from-primary/10 via-background to-background">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative group cursor-pointer" onClick={handleImageClick}>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl transition-all group-hover:ring-4 group-hover:ring-primary/20">
              <AvatarImage src={displayImage} alt={user.fullName} className="object-cover" />
              <AvatarFallback className="text-2xl uppercase">
                {user.firstName?.charAt(0)}
                {user.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Camera className="h-8 w-8 text-white drop-shadow-md" />
            </div>

            {selectedImage && (
              <button 
                onClick={handleRemoveImage}
                className="absolute -top-1 -right-1 p-1.5 bg-destructive text-destructive-foreground rounded-full shadow-md hover:bg-destructive/90 transition-colors z-10"
                title="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className="text-2xl font-bold text-foreground">{user.fullName}</h1>
              <Badge variant="secondary" className="w-fit mx-auto md:mx-0 uppercase">
                {user.role}
              </Badge>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>Joined {formatDate(user.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
