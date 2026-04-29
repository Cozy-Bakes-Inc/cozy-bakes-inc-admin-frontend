import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { VerifyOtpInput } from "./components/verify-otp-input";
import { useRouter } from "next/navigation";
import {
  verifyOtpSchema,
  type VerifyOtpSchemaValues,
} from "@/schemas/auth/verify-otp";
import { resendOtpSchema } from "@/schemas/auth/resend-otp";
import { sendOrResendOtpAPI, verifyOtpAPI } from "@/services/mutations";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";
import { setToken } from "@/lib";
import { useQueryClient } from "@tanstack/react-query";

type VerifyOtpFormProps = {
  email: string;
  flow?: string;
  canResendCode: boolean;
  timerText: string;
  onResendCode: () => Promise<void>;
};

export function VerifyOtpForm({
  email,
  flow,
  canResendCode,
  timerText,
  onResendCode,
}: VerifyOtpFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isResending, setIsResending] = useState(false);
  const isForgotPasswordFlow = flow === "forgot-password";
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpSchemaValues>({
    defaultValues: {
      email,
      otp: "",
    },
  });

  const emailRegister = register("email", {
    validate: (value) => {
      const result = verifyOtpSchema.shape.email.safeParse(value);
      return result.success || result.error.issues[0]?.message;
    },
  });

  register("otp", {
    validate: (value) => {
      const result = verifyOtpSchema.shape.otp.safeParse(value);
      return result.success || result.error.issues[0]?.message;
    },
  });

  const otp = useWatch({
    control,
    name: "otp",
  });

  useEffect(() => {
    setValue("email", email, { shouldValidate: true });
  }, [email, setValue]);

  const onSubmit = async (data: VerifyOtpSchemaValues) => {
    if (isForgotPasswordFlow) {
      sessionStorage.setItem(
        "forgot_password_reset_context",
        JSON.stringify({
          email: data.email,
          otp: data.otp,
        }),
      );
      toast.success("Verification code confirmed");
      router.push(`/new-password?email=${encodeURIComponent(data.email)}`);
      return;
    }

    const result = await verifyOtpAPI(data);
    if (result?.ok) {
      toast.success(result?.message || "Verification successful");
      const token = result?.data?.data?.token;
      if (token) {
        await setToken(token);
      }
      await queryClient.invalidateQueries({
        queryKey: ["authenticatedUser"],
      });
      router.replace("/");
      return;
    }
    toast.error(result?.message);
  };

  const handleResendCode = async () => {
    const data = resendOtpSchema.safeParse({ email });
    if (!data.success) {
      toast.error(data.error.issues[0]?.message);
      return;
    }

    setIsResending(true);
    const result = await sendOrResendOtpAPI(data.data);
    if (result?.ok) {
      toast.success(result?.message || "Verification code resent");
      await onResendCode();
      setIsResending(false);
      return;
    }
    toast.error(result?.message);
    setIsResending(false);
  };

  return (
    <form className="w-full space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...emailRegister} value={email} />
      <VerifyOtpInput
        otp={otp || ""}
        onOtpChange={(value) => {
          setValue("otp", value, { shouldValidate: true, shouldDirty: true });
        }}
        errorMessage={errors.otp?.message || errors.email?.message}
      />

      <div className="space-y-4">
        <Button
          type="submit"
          className="h-13.75 w-full rounded-2xl bg-primary px-8 text-[18px] font-medium text-white"
        >
          {isSubmitting ? <Loader /> : isForgotPasswordFlow ? "Next" : "Verify"}
        </Button>

        {canResendCode ? (
          <p className="text-center text-base leading-6 font-medium text-[gray]">
            Send Code again :{" "}
            <Button
              type="button"
              onClick={handleResendCode}
              variant="ghost"
              disabled={isResending}
              className="h-auto p-0 font-semibold text-dark transition-colors hover:bg-transparent hover:text-primary"
            >
              {isResending ? "Resending..." : "Resend Code"}
            </Button>
          </p>
        ) : (
          <p className="text-center text-base leading-6 font-medium text-[gray]">
            Send Code again : {timerText}
          </p>
        )}
      </div>
    </form>
  );
}
