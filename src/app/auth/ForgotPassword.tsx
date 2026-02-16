import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForgotPasswordMutation } from "@/redux/feature/auth/authApis";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import type { TError } from "@/types/global.types";

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    try {
      const res = await forgotPassword(data).unwrap();
      SuccessToast(res?.message || "Verification code sent! Please check your email.");
      localStorage.setItem("reset_email", data.email);
      navigate("/auth/verify");
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.message || "Failed to send code. Please try again.");
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex w-full max-w-225 items-center justify-center gap-16 p-4">
        <div className="hidden w-1/2 items-center justify-center border-r border-gray-200 pr-16 md:flex">
          <img
            src="/auth/forgot-password.png"
            alt="Forgot Password Illustration"
            className="max-w-75 object-contain"
          />
        </div>
        <div className="w-full max-w-100">
          <div className="mb-6 space-y-2">
            <h1 className="text-2xl font-bold text-[#2e4053]">Forgot Password?</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-foreground">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        className="bg-gray-50 border-gray-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-[#b49b6a] text-white hover:bg-[#a38b5e]"
                disabled={isLoading}
              >
                Send Reset Link
              </Button>
              <Link to="/auth/login">
                <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Button>
              </Link>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
