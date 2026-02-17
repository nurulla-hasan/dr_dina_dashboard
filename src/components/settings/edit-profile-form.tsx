import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, User } from "lucide-react";
import { useEditProfileMutation } from "@/redux/feature/auth/authApis";
import { useEffect } from "react";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { TError } from "@/types/global.types";
import type { Admin } from "@/types/admin.type";

const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  contact: z
    .string()
    .min(10, { message: "Contact number must be at least 10 characters." }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const EditProfileForm = ({
  user,
  selectedImage,
  setSelectedImage,
}: {
  user: Admin;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
}) => {
  const [editProfile, { isLoading }] = useEditProfileMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        contact: user.contact || "",
      });
    }
  }, [user, form]);

  async function onSubmit(values: ProfileFormValues) {
    const formData = new FormData();
    const body = {
      firstName: values.firstName,
      lastName: values.lastName,
      contact: values.contact,
    };
    formData.append("body", JSON.stringify(body));
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const res = await editProfile(formData).unwrap();
      if (res.success) {
        SuccessToast(res.message || "Profile updated successfully");
        setSelectedImage(null);
      }
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.data?.message || "Failed to update profile");
    }
  }

  return (
    <Card>
      <CardHeader className="pb-4 flex flex-row items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-xl shrink-0">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold">
            Personal Information
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Update your personal details and contact information.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">First Name</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          placeholder="John"
                          className="pl-10 bg-muted/30 focus:bg-background transition-all"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Last Name</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          placeholder="Doe"
                          className="pl-10 bg-muted/30 focus:bg-background transition-all"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          placeholder="admin@example.com"
                          type="email"
                          className="pl-10 bg-muted/30 focus:bg-background transition-all"
                          {...field}
                          disabled
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          placeholder="+1 234 567 890"
                          className="pl-10 bg-muted/30 focus:bg-background transition-all"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02]"
                loading={isLoading}
                loadingText="Saving..."
                disabled={!form.formState.isDirty}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditProfileForm;
