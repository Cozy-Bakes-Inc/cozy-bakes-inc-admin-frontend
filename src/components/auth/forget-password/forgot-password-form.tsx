"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ForgotPasswordEmailField } from "./components/forgot-password-email-field";
import { useRouter } from "next/navigation";
import {
  resendOtpSchema,
  type ResendOtpSchemaValues,
} from "@/schemas/auth/resend-otp";
import { sendOrResendOtpAPI } from "@/services/mutations";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";

export function ForgotPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResendOtpSchemaValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResendOtpSchemaValues) => {
    const result = await sendOrResendOtpAPI(data);
    if (result?.ok) {
      toast.success(result?.message || "Verification code sent");
      router.push(
        `/verify-otp?email=${encodeURIComponent(data.email)}&flow=forgot-password`,
      );
      return;
    }
    toast.error(result?.message);
  };

  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <ForgotPasswordEmailField
        register={register("email", {
          validate: (value) => {
            const result = resendOtpSchema.shape.email.safeParse(value);
            return result.success || result.error.issues[0]?.message;
          },
        })}
        errorMessage={errors.email?.message}
      />

      <Button
        type="submit"
        className="h-13.75 w-full rounded-2xl bg-primary px-8 text-[18px] font-medium text-white"
      >
        {isSubmitting ? <Loader /> : "Send Verification Code"}
      </Button>

      <div className="flex items-center justify-center">
        <Link
          href="/login"
          className="border-b border-primary text-base leading-7 font-semibold text-primary"
        >
          Back To Login
        </Link>
      </div>
    </form>
  );
}
