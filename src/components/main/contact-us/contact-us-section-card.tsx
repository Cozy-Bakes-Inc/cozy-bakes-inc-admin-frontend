import type { ContactUsSectionCardProps } from "@/interfaces/main/contact-us";
import { ContactUsFieldGrid } from "./contact-us-field-grid";
import { ContactUsSectionHeader } from "./contact-us-section-header";

export function ContactUsSectionCard({ section }: ContactUsSectionCardProps) {
  return (
    <article className="rounded-2xl border-2 border-white/15 bg-[rgba(250,248,243,0.32)] p-4 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]">
      <div className="space-y-4">
        <ContactUsSectionHeader
          title={section.title}
          description={section.description}
          actionLabel={section.actionLabel}
          icon={section.icon}
        />

        <div className="space-y-4">
          <ContactUsFieldGrid fields={section.fields} />
        </div>
      </div>
    </article>
  );
}
