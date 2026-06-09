"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { NewPasswordField } from "@/components/auth/new-password/components/new-password-field";
import { resetPasswordSchema, type ResetPasswordSchemaValues } from "@/schemas/auth/reset-password";
import { resetPasswordAPI } from "@/services/mutations";

interface ChangePasswordPasswordStepProps {
  email: string;
  otp: string;
  onSuccess: () => void;
  onBack: () => void;
  onOtpExpired: () => void;
}

export function ChangePasswordPasswordStep({
  email,
  otp,
  onSuccess,
  onBack,
  onOtpExpired,
}: ChangePasswordPasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { handleSubmit, setValue, watch, formState: { errors, isSubmitting } } =
    useForm<ResetPasswordSchemaValues>({
      defaultValues: { email, otp, password: "", password_confirmation: "" },
    });

  const password = watch("password");
  const passwordConfirmation = watch("password_confirmation");

  async function onSubmit(data: ResetPasswordSchemaValues) {
    const validated = resetPasswordSchema.safeParse({ ...data, email, otp });
    if (!validated.success) {
      toast.error(validated.error.issues[0]?.message || "Invalid form data");
      return;
    }

    const result = await resetPasswordAPI(validated.data);

    if (result?.ok) {
      toast.success(result.message || "Password changed successfully");
      onSuccess();
      return;
    }

    if (result?.message === "Invalid or expired OTP.") {
      toast.error("Your verification code has expired. Please request a new one.");
      onOtpExpired();
      return;
    }

    toast.error(result?.message || "Failed to change password");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-1">
      <NewPasswordField
        label="New Password"
        placeholder="Enter new password"
        value={password}
        showPassword={showPassword}
        onValueChange={(v) => setValue("password", v, { shouldDirty: true, shouldValidate: true })}
        onToggleShowPassword={() => setShowPassword((p) => !p)}
        errorMessage={errors.password?.message}
      />

      <NewPasswordField
        label="Confirm New Password"
        placeholder="Confirm new password"
        value={passwordConfirmation}
        showPassword={showConfirm}
        onValueChange={(v) => setValue("password_confirmation", v, { shouldDirty: true, shouldValidate: true })}
        onToggleShowPassword={() => setShowConfirm((p) => !p)}
        errorMessage={errors.password_confirmation?.message}
      />

      <div className="space-y-3 pt-1">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-full bg-primary text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Change Password"}
        </Button>

        <button
          type="button"
          onClick={onBack}
          className="flex w-full items-center justify-center gap-1.5 text-sm font-medium text-gray hover:text-dark"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>
      </div>
    </form>
  );
}
