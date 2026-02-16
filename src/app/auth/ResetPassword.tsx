import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/redux/feature/auth/authApis";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import type { TError } from "@/types/global.types";

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const email = localStorage.getItem("reset_email");

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: ResetPasswordFormValues) {
    if (!email) {
      ErrorToast("Email not found. Please try again from the beginning.");
      navigate("/auth/forgot-password");
      return;
    }
    
    try {
      const res = await resetPassword({ email, newPassword: data.password }).unwrap();
      SuccessToast(res?.message || "Password reset successful! Your password has been successfully reset.");
      localStorage.removeItem("reset_email");
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.message || "Password reset failed. Please try again.");
    }
  }

  const password = useWatch({ control: form.control, name: "password" });
  const hasMinLength = password?.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password || "");
  const hasLowerCase = /[a-z]/.test(password || "");
  const hasNumber = /[0-9]/.test(password || "");

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex w-full max-w-225 items-center justify-center gap-16 p-4">
        <div className="hidden w-1/2 items-center justify-center border-r border-gray-200 pr-16 md:flex">
          <img
            src="/auth/set-new-pass.png"
            alt="Set New Password Illustration"
            className="max-w-75 object-contain"
          />
        </div>
        <div className="w-full max-w-100">
          {isSuccess ? (
            <div className="space-y-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                  <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-[#2e4053]">Password Reset Successful!</h1>
              <p className="text-sm text-muted-foreground">
                Your password has been successfully reset.
              </p>
              <p className="text-sm text-muted-foreground">
                Redirecting to login page...
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 space-y-2">
                <h1 className="text-2xl font-bold text-[#2e4053]">Reset Password</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your new password below.
                </p>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-foreground">New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter new password"
                              type={showPassword ? "text" : "password"}
                              className="bg-gray-50 border-gray-200 pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password strength indicator */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Password must contain:</p>
                    <ul className="space-y-1 text-sm">
                      <li className={`flex items-center gap-2 ${hasMinLength ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${hasMinLength ? "bg-green-600 dark:bg-green-400" : "bg-muted-foreground"}`} />
                        At least 8 characters
                      </li>
                      <li className={`flex items-center gap-2 ${hasUpperCase ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${hasUpperCase ? "bg-green-600 dark:bg-green-400" : "bg-muted-foreground"}`} />
                        One uppercase letter
                      </li>
                      <li className={`flex items-center gap-2 ${hasLowerCase ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${hasLowerCase ? "bg-green-600 dark:bg-green-400" : "bg-muted-foreground"}`} />
                        One lowercase letter
                      </li>
                      <li className={`flex items-center gap-2 ${hasNumber ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${hasNumber ? "bg-green-600 dark:bg-green-400" : "bg-muted-foreground"}`} />
                        One number
                      </li>
                    </ul>
                  </div>

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-foreground">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Confirm new password"
                              type={showConfirmPassword ? "text" : "password"}
                              className="bg-gray-50 border-gray-200 pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-[#b49b6a] text-white hover:bg-[#a38b5e]"
                    loading={isLoading}
                    loadingText="Resetting..."
                  >
                    Reset Password
                  </Button>
                </form>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
