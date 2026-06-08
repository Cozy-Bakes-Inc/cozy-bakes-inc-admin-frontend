import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";

interface MenuFormActionsProps {
  disabled: boolean;
  submitDisabled?: boolean;
  submitLabel: string;
  onCancel: () => void;
}

export function MenuFormActions({
  disabled,
  submitDisabled,
  submitLabel,
  onCancel,
}: MenuFormActionsProps) {
  const isSubmitDisabled = submitDisabled ?? disabled;

  return (
    <div className="grid gap-3 border-t border-[#E4E7EC] px-4 py-4 sm:flex sm:justify-end sm:gap-4 sm:px-6 md:px-8">
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={onCancel}
        className="h-[48px] w-full rounded-[8px] border-[#D0D5DD] bg-background text-base font-medium text-dark hover:bg-muted sm:w-auto sm:min-w-[140px]"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isSubmitDisabled}
        className="h-[48px] w-full rounded-[8px] bg-primary px-6 text-base font-semibold text-white hover:bg-primary/90 sm:w-auto sm:min-w-[176px]"
      >
        {isSubmitDisabled && disabled ? <Loader /> : submitLabel}
      </Button>
    </div>
  );
}
