"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { VerifyOtpInput } from "@/components/auth/verify-otp/components/verify-otp-input";
import { verifyOtpSchema, type VerifyOtpSchemaValues } from "@/schemas/auth/verify-otp";
import { resendOtpSchema } from "@/schemas/auth/resend-otp";
import { sendOrResendOtpAPI } from "@/services/mutations";
import { formatTimer } from "@/lib/utils/time";

interface ChangePasswordOtpStepProps {
  email: string;
  secondsLeft: number;
  onSuccess: (otp: string) => void;
  onBack: () => void;
  onResend: () => void;
}

export function ChangePasswordOtpStep({
  email,
  secondsLeft,
  onSuccess,
  onBack,
  onResend,
}: ChangePasswordOtpStepProps) {
  const [isResending, setIsResending] = useState(false);
  const canResend = secondsLeft === 0;

  const { control, handleSubmit, setValue, formState: { errors, isSubmitting } } =
    useForm<VerifyOtpSchemaValues>({ defaultValues: { email, otp: "" } });

  const otp = useWatch({ control, name: "otp" });

  function onSubmit(data: VerifyOtpSchemaValues) {
    const result = verifyOtpSchema.safeParse(data);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message || "Invalid verification code");
      return;
    }
    onSuccess(data.otp);
  }

  async function handleResend() {
    const parsed = resendOtpSchema.safeParse({ email });
    if (!parsed.success) return;

    setIsResending(true);
    const result = await sendOrResendOtpAPI(parsed.data);
    setIsResending(false);

    if (result?.ok) {
      toast.success(result.message || "Verification code resent");
      onResend();
      return;
    }
    toast.error(result?.message || "Failed to resend code");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-1">
      <VerifyOtpInput
        otp={otp ?? ""}
        onOtpChange={(value) => setValue("otp", value, { shouldValidate: true, shouldDirty: true })}
        errorMessage={errors.otp?.message}
      />

      <div className="space-y-3">
        <Button
          type="submit"
          disabled={isSubmitting || (otp?.length ?? 0) < 5}
          className="h-11 w-full rounded-full bg-primary text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
        >
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </Button>

        <p className="text-center text-sm text-gray">
          {canResend ? (
            <>
              Didn&apos;t receive it?{" "}
              <Button
                type="button"
                variant="ghost"
                disabled={isResending}
                onClick={handleResend}
                className="h-auto p-0 text-sm font-semibold text-primary hover:bg-transparent hover:underline"
              >
                {isResending ? "Resending..." : "Resend Code"}
              </Button>
            </>
          ) : (
            <>Resend code in <span className="font-semibold text-dark">{formatTimer(secondsLeft)}</span></>
          )}
        </p>

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
