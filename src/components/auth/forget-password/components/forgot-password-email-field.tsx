import { Mail } from "lucide-react";
import { type UseFormRegisterReturn } from "react-hook-form";
import InputErrorMessage from "@/components/ui/input-error-message";

type ForgotPasswordEmailFieldProps = {
  register: UseFormRegisterReturn<"email">;
  errorMessage?: string;
};

export function ForgotPasswordEmailField({
  register,
  errorMessage,
}: ForgotPasswordEmailFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-base leading-6 font-medium text-dark">
        Email
      </label>
      <div className="flex h-13.75 items-center gap-2.5 rounded-xl border border-[gray] px-3">
        <Mail className="size-6 text-primary" />
        <input
          {...register}
          type="email"
          placeholder="Email"
          className="w-full bg-transparent text-base leading-6 font-medium text-[gray] outline-none"
        />
      </div>
      <InputErrorMessage msg={errorMessage} />
    </div>
  );
}
