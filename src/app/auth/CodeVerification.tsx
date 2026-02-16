import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useVerifyOtpMutation, useForgotPasswordMutation } from "@/redux/feature/auth/authApis";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import type { TError } from "@/types/global.types";

export default function CodeVerification() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [verifyOtp, { isLoading: isVerifyLoading }] = useVerifyOtpMutation();
  const [forgotPassword, { isLoading: isResendLoading }] = useForgotPasswordMutation();
  
  const email = localStorage.getItem("reset_email");

  const handleResend = async () => {
    if (!email) {
      ErrorToast("Email not found. Please try again from the beginning.");
      navigate("/auth/forgot-password");
      return;
    }

    try {
      const res = await forgotPassword({ email }).unwrap();
      SuccessToast(res?.message || "Code resent! A new verification code has been sent to your email.");
      setError("");
      setCode("");
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.message || "Failed to resend code. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (code.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    if (!email) {
        ErrorToast("Email not found. Please try again from the beginning.");
        navigate("/auth/forgot-password");
        return;
    }

    try {
      const res = await verifyOtp({ email, otp: code }).unwrap();
      SuccessToast(res?.message || "Code verified! Redirecting to reset password...");
      setTimeout(() => {
        navigate("/auth/reset-password");
      }, 1000);
    } catch (err) {
      const error = err as TError;
      setError(error?.message || "Invalid verification code. Please try again.");
      ErrorToast(error?.message || "Invalid code. Please try again.");
      setCode("");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex w-full max-w-225 items-center justify-center gap-16 p-4">
        <div className="hidden w-1/2 items-center justify-center border-r border-gray-200 pr-16 md:flex">
          <img
            src="/auth/otp-verify.png"
            alt="OTP Verification Illustration"
            className="max-w-75 object-contain"
          />
        </div>
        <div className="w-full max-w-100">
          <div className="mb-6 space-y-2">
            <h1 className="text-2xl font-bold text-[#2e4053]">Verify Your Email</h1>
            <p className="text-sm text-muted-foreground">
              We&apos;ve sent a 6-digit verification code to your email.
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={(value: string) => {
                    setCode(value)
                    setError("")
                  }}
                  disabled={isVerifyLoading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="border-gray-200 bg-gray-50" />
                    <InputOTPSlot index={1} className="border-gray-200 bg-gray-50" />
                    <InputOTPSlot index={2} className="border-gray-200 bg-gray-50" />
                    <InputOTPSlot index={3} className="border-gray-200 bg-gray-50" />
                    <InputOTPSlot index={4} className="border-gray-200 bg-gray-50" />
                    <InputOTPSlot index={5} className="border-gray-200 bg-gray-50" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              <Button  
                onClick={handleSubmit} 
                className="w-full bg-[#b49b6a] text-white hover:bg-[#a38b5e]" 
                loading={isVerifyLoading}
                loadingText="Verifying..."
                disabled={isVerifyLoading || code.length !== 6}
              >
                Verify Code
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Didn&apos;t receive the code?
                </p>
                <Button
                  variant="link"
                  onClick={handleResend}
                  disabled={isResendLoading}
                  className="p-0 h-auto font-normal text-[#2e4053] underline-offset-4 hover:text-primary"
                >
                  Resend Code
                </Button>
              </div>

              <Link to="/auth/forgot-password">
                <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
