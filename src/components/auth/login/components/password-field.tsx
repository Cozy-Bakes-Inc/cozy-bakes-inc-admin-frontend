import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { type UseFormRegisterReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputErrorMessage from "@/components/ui/input-error-message";

type PasswordFieldProps = {
  register: UseFormRegisterReturn<"password">;
  errorMessage?: string;
  showPassword: boolean;
  onToggleShowPassword: () => void;
};

export function PasswordField({
  register,
  errorMessage,
  showPassword,
  onToggleShowPassword,
}: PasswordFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-dark text-base leading-6 font-medium">
        Password
      </label>
      <div className="flex h-13.75 items-center gap-2.5 rounded-xl border border-[gray] px-3">
        <LockKeyhole className="size-6 text-primary" />
        <input
          {...register}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full bg-transparent text-base text-[gray] leading-6 font-medium outline-none"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggleShowPassword}
          className="text-primary hover:bg-transparent hover:text-dark"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="size-6" />
          ) : (
            <Eye className="size-6" />
          )}
        </Button>
      </div>
      <InputErrorMessage msg={errorMessage} />
    </div>
  );
}
