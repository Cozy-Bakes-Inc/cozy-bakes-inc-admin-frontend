"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { NewPasswordField } from "./components/new-password-field";
import { useRouter } from "next/navigation";
import { resetPasswordSchema, type ResetPasswordSchemaValues } from "@/schemas";
import { resetPasswordAPI, sendOrResendOtpAPI } from "@/services/mutations";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";

const RESET_CONTEXT_KEY = "forgot_password_reset_context";

type NewPasswordFormProps = {
  email: string;
};

export function NewPasswordForm({ email }: NewPasswordFormProps) {
  const router = useRouter();
  const hasHandledExpiredSessionRef = useRef(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchemaValues>({
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      password_confirmation: "",
    },
  });

  const newPassword = watch("password");
  const confirmNewPassword = watch("password_confirmation");

  useEffect(() => {
    const handleExpiredSession = () => {
      if (hasHandledExpiredSessionRef.current) return;

      hasHandledExpiredSessionRef.current = true;
      toast.error("Reset password session expired");
      router.replace("/forgot-password");
    };

    const storedContext = sessionStorage.getItem(RESET_CONTEXT_KEY);
    if (!storedContext) {
      handleExpiredSession();
      return;
    }

    try {
      const parsedContext = JSON.parse(storedContext) as {
        email?: string;
        otp?: string;
      };

      if (!parsedContext.email || !parsedContext.otp) {
        throw new Error("Invalid reset context");
      }

      setValue("email", email || parsedContext.email);
      setValue("otp", parsedContext.otp);
    } catch {
      sessionStorage.removeItem(RESET_CONTEXT_KEY);
      handleExpiredSession();
    }
  }, [email, router, setValue]);

  const onSubmit = async (data: ResetPasswordSchemaValues) => {
    const validationResult = resetPasswordSchema.safeParse(data);
    if (!validationResult.success) {
      const firstIssue = validationResult.error.issues[0];
      toast.error(firstIssue?.message || "Invalid form data");
      return;
    }

    const result = await resetPasswordAPI(validationResult.data);
    console.log(result);
    if (result?.ok) {
      sessionStorage.removeItem(RESET_CONTEXT_KEY);
      toast.success(result?.message || "Password changed successfully");
      router.push("/login");
      return;
    }

    if (result?.message === "Invalid or expired OTP.") {
      toast.error(result.message);

      const resendResult = await sendOrResendOtpAPI({ email: data.email });
      if (resendResult?.ok) {
        toast.success(resendResult.message || "Verification code sent");
      } else {
        toast.error(
          resendResult?.message || "Failed to resend verification code",
        );
      }
      router.push(
        `/verify-otp?email=${encodeURIComponent(data.email)}&flow=forgot-password`,
      );
      return;
    }

    toast.error(result?.message);
  };

  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <NewPasswordField
        label="New Password"
        placeholder="New Password"
        value={newPassword}
        showPassword={showNewPassword}
        onValueChange={(value) =>
          setValue("password", value, {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        onToggleShowPassword={() => setShowNewPassword((value) => !value)}
        errorMessage={errors.password?.message}
      />

      <NewPasswordField
        label="Confirm New Password"
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        showPassword={showConfirmPassword}
        onValueChange={(value) =>
          setValue("password_confirmation", value, {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        onToggleShowPassword={() => setShowConfirmPassword((value) => !value)}
        errorMessage={errors.password_confirmation?.message}
      />

      <Button
        type="submit"
        className="h-13.75 w-full rounded-2xl bg-primary px-8 text-[18px] font-medium text-white"
      >
        {isSubmitting ? <Loader /> : "Change Password"}
      </Button>
    </form>
  );
}
