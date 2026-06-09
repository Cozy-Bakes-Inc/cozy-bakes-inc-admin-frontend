"use client";

import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import InputErrorMessage from "@/components/ui/input-error-message";
import { resendOtpSchema, type ResendOtpSchemaValues } from "@/schemas/auth/resend-otp";
import { sendOrResendOtpAPI } from "@/services/mutations";

interface ChangePasswordEmailStepProps {
  onSuccess: (email: string) => void;
}

export function ChangePasswordEmailStep({ onSuccess }: ChangePasswordEmailStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResendOtpSchemaValues>({ defaultValues: { email: "" } });

  async function onSubmit(data: ResendOtpSchemaValues) {
    const result = await sendOrResendOtpAPI(data);
    if (result?.ok) {
      toast.success(result.message || "Verification code sent");
      onSuccess(data.email);
      return;
    }
    toast.error(result?.message || "Failed to send verification code");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-1">
      <div>
        <div className="space-y-2">
          <label htmlFor="cp-email" className="block text-sm font-medium text-dark">
            Email Address
          </label>
          <div className="flex min-h-12 items-center gap-2.5 rounded-lg border border-primary bg-[#fbf8eb]/8 px-3">
            <Mail className="size-4 shrink-0 text-primary" />
            <input
              {...register("email", {
                validate: (v) => {
                  const r = resendOtpSchema.shape.email.safeParse(v);
                  return r.success || r.error.issues[0]?.message;
                },
              })}
              id="cp-email"
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-transparent text-sm font-medium text-dark outline-none placeholder:text-[#98A2B3]"
            />
          </div>
        </div>
        <InputErrorMessage msg={errors.email?.message} />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-full bg-primary text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Verification Code"}
      </Button>
    </form>
  );
}
