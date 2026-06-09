import { Bell, LockKeyhole, Store, Truck, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SettingsSectionIcon as SettingsSectionIconName } from "@/types/main/settings";

type SettingsSectionIconProps = {
  icon: SettingsSectionIconName;
  className?: string;
};

const iconMap = {
  store: Store,
  account: UserRound,
  password: LockKeyhole,
  notification: Bell,
  delivery: Truck,
} satisfies Record<
  SettingsSectionIconName,
  React.ComponentType<{ className?: string; strokeWidth?: number }>
>;

export function SettingsSectionIcon({
  icon,
  className,
}: SettingsSectionIconProps) {
  const Icon = iconMap[icon];

  return <Icon className={cn("size-5", className)} strokeWidth={2} />;
}
