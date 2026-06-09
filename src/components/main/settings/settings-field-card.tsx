import { ExternalLink } from "lucide-react";
import type { SettingsFieldCardProps } from "@/interfaces/main/settings";
import { cn } from "@/lib/utils";

export function SettingsFieldCard({ field }: SettingsFieldCardProps) {
  const isEmpty = !field.value || field.value.trim().length === 0;

  return (
    <div
      className={cn(
        "space-y-2",
        field.layout === "full" ? "md:col-span-2" : "md:col-span-1",
      )}
    >
      <p className="text-base font-medium text-dark">{field.label}</p>
      <div
        className={cn(
          "w-full rounded-lg border border-primary/30 bg-[#fbf8eb]/8 px-3 py-3",
          field.multiline ? "min-h-24.75" : "min-h-14.5 flex items-center",
        )}
      >
        {field.href && !isEmpty ? (
          <a
            href={field.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 text-primary underline-offset-2 hover:underline",
              field.valueTone === "md" ? "text-base font-medium" : "text-sm font-medium",
            )}
          >
            {field.value}
            <ExternalLink className="size-3.5 shrink-0" />
          </a>
        ) : (
          <span
            className={cn(
              isEmpty ? "text-[#98A2B3]" : "text-dark",
              field.valueTone === "md" ? "text-base font-medium" : "text-sm font-medium",
            )}
          >
            {isEmpty ? `No ${field.label.toLowerCase()} set` : field.value}
          </span>
        )}
      </div>
    </div>
  );
}
