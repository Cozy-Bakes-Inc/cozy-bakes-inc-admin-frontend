import type { SettingsSectionHeaderProps } from "@/interfaces/main/settings";
import { SettingsSectionAction } from "./settings-section-action";
import { SettingsSectionIcon } from "./settings-section-icon";

export function SettingsSectionHeader({
  icon,
  title,
  description,
  action,
}: SettingsSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
          <SettingsSectionIcon icon={icon} />
        </div>

        <div className="min-w-0">
          <h2 className="text-base font-bold text-dark">{title}</h2>
          <p className="text-sm text-gray">{description}</p>
        </div>
      </div>

      {action ? <SettingsSectionAction label={action.label} onClick={action.onClick} /> : null}
    </div>
  );
}
