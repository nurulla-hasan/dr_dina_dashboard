import PageLayout from "@/components/common/page-layout";
import ChangePasswordForm from "@/components/settings/change-password-form";
import EditProfileForm from "@/components/settings/edit-profile-form";
import ProfileHeader from "@/components/settings/profile-header";
import { useMyProfileQuery } from "@/redux/feature/auth/authApis";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const Profile = () => {
  const { data: profileData, isLoading } = useMyProfileQuery(undefined);
  const user = profileData?.data;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-96 w-full rounded-xl" />
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <ProfileHeader 
          user={user} 
          selectedImage={selectedImage} 
          setSelectedImage={setSelectedImage} 
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EditProfileForm user={user} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
          <ChangePasswordForm />
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
