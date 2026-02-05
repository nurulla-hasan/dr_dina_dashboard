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
import { Phone, Mail, User, MapPin, Save } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const EditProfileForm = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "John Doe",
      email: "admin@example.com",
      phone: "+1 234 567 890",
      address: "123 Main St, New York, NY 10001",
    },
  });

  function onSubmit(values: ProfileFormValues) {
    console.log(values);
    // Handle form submission
  }

  return (
    <Card className="border-none shadow-md bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4 flex flex-row items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-xl shrink-0">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Full Name</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input placeholder="John Doe" className="pl-10 bg-muted/30 focus:bg-background transition-all" {...field} />
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
                    <FormLabel className="font-semibold">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input placeholder="admin@example.com" type="email" className="pl-10 bg-muted/30 focus:bg-background transition-all" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input placeholder="+1 234 567 890" className="pl-10 bg-muted/30 focus:bg-background transition-all" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Location</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input placeholder="123 Main St, New York" className="pl-10 bg-muted/30 focus:bg-background transition-all" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full md:w-auto px-8 gap-2 shadow-lg shadow-primary/20">
                <Save className="h-4 w-4" />
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
