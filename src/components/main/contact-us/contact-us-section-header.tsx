import { ChartNoAxesColumnIncreasing, PencilLine, PhoneCall } from "lucide-react";
import type { ContactUsSectionHeaderProps } from "@/interfaces/main/contact-us";
import { ContactUsActionButton } from "./contact-us-action-button";

const sectionIcons = {
  hero: ChartNoAxesColumnIncreasing,
  contact: PhoneCall,
};

export function ContactUsSectionHeader({
  title,
  description,
  actionLabel,
  icon,
  onActionClick,
}: ContactUsSectionHeaderProps) {
  const Icon = sectionIcons[icon];

  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
          <Icon className="size-5" strokeWidth={2.1} />
        </div>

        <div className="pt-0.5">
          <h2 className="text-base font-bold leading-7 capitalize text-dark">
            {title}
          </h2>
          <p className="text-sm leading-5 text-gray">{description}</p>
        </div>
      </div>

      <ContactUsActionButton onClick={onActionClick}>
        <PencilLine className="size-4" strokeWidth={2.1} />
        {actionLabel}
      </ContactUsActionButton>
    </div>
  );
}
