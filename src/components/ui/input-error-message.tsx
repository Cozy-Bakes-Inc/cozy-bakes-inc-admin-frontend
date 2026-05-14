import { cn } from "@/lib";

interface InputErrorMessageProps {
  msg?: string;
  className?: string;
}

const InputErrorMessage = ({ msg, className }: InputErrorMessageProps) => {
  return msg ? (
    <span className={cn("mt-2 block text-sm text-red-700", className)}>
      {msg}
    </span>
  ) : null;
};

export default InputErrorMessage;
