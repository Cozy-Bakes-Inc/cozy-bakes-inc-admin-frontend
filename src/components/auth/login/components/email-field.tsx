import { Mail } from "lucide-react";
import { type UseFormRegisterReturn } from "react-hook-form";
import InputErrorMessage from "@/components/ui/input-error-message";

type EmailFieldProps = {
  register: UseFormRegisterReturn<"email">;
  errorMessage?: string;
};

export function EmailField({ register, errorMessage }: EmailFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-dark text-base leading-6 font-medium">
        Email
      </label>
      <div className="flex h-13.75 items-center gap-2.5 rounded-xl border border-[gray] px-3">
        <Mail className="size-6 text-primary" />
        <input
          {...register}
          type="email"
          placeholder="Email"
          className="w-full bg-transparent text-base text-[gray] leading-6 font-medium outline-none"
        />
      </div>
      <InputErrorMessage msg={errorMessage} />
    </div>
  );
}
