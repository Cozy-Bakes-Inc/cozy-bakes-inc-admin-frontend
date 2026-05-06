import Link from "next/link";
import type { CategoryActionButtonProps } from "@/interfaces/main/categories";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib";

export function CategoryActionButton({
  label,
  tone,
  icon,
  href,
  onClick,
}: CategoryActionButtonProps) {
  const className = cn(
    "inline-flex size-9 items-center justify-center rounded-lg transition-transform hover:-translate-y-0.5",
    tone === "danger" && "bg-danger-soft text-danger",
    tone === "info" && "bg-info-soft text-info",
    tone === "primary" && "bg-primary text-white",
  );

  if (href) {
    return (
      <Link href={href} aria-label={label} className={className}>
        {icon}
      </Link>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      className={className}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}
