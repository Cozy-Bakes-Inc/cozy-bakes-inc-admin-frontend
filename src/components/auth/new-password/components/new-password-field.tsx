import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";

type NewPasswordFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  errorMessage?: string;
  showPassword: boolean;
  onValueChange: (value: string) => void;
  onToggleShowPassword: () => void;
};

export function NewPasswordField({
  label,
  placeholder,
  value,
  errorMessage,
  showPassword,
  onValueChange,
  onToggleShowPassword,
}: NewPasswordFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-base leading-6 font-medium text-dark">
        {label}
      </label>
      <div className="flex h-13.75 items-center gap-2.5 rounded-xl border border-[gray] px-3">
        <LockKeyhole className="size-6 text-primary" />
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-base leading-6 font-medium text-[gray] outline-none"
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
      {errorMessage ? (
        <p className="text-sm font-medium text-destructive">{errorMessage}</p>
      ) : null}
    </div>
  );
}
