"use client";

import { useMemo, useState } from "react";
import { contactUsSections, contactUsWorkspace } from "@/data/main/contact-us";
import type { ContactUsSection } from "@/interfaces/main/contact-us";
import { Shimmer } from "@/components/ui/shimmer";
import { ContactUsHeader } from "./contact-us-header";
import { ContactUsSectionCard } from "./contact-us-section-card";
import AddUpdateContactUsModal from "./add-update-contact-us";
import { useContactDetails } from "@/hooks/api";

function ContactUs() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { data, isLoading } = useContactDetails();
  const contactDetails = data?.data;
  const resolvedSections: ContactUsSection[] = useMemo(() => {
    const contactSection = contactDetails?.contact_section;

    return contactUsSections
      .filter((section) => section.id !== "hero-section")
      .map((section) => {
        const hasContactSectionData = Boolean(
          contactSection?.contact_email ||
          contactSection?.phone_number ||
          contactSection?.location,
        );

        return {
          ...section,
          actionLabel: hasContactSectionData
            ? "Edit Contact Data"
            : "Add Contact Data",
          fields: [
            {
              id: "contact-email",
              label: "Contact Email",
              value: contactSection?.contact_email ?? "",
            },
            {
              id: "phone-number",
              label: "Phone Number",
              value: contactSection?.phone_number ?? "",
            },
            {
              id: "location",
              label: "Our Location",
              value: contactSection?.location ?? "",
            },
          ],
        };
      });
  }, [contactDetails]);

  return (
    <section className="space-y-5">
      <ContactUsHeader
        title={contactUsWorkspace.title}
        description={contactUsWorkspace.description}
      />

      <div className="space-y-4">
        {isLoading
          ? Array.from({ length: 1 }).map((_, index) => (
              <article
                key={index}
                className="rounded-2xl border-2 border-white/15 bg-[rgba(250,248,243,0.32)] p-4 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]"
              >
                <div className="space-y-4">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex items-start gap-3">
                      <Shimmer className="size-10 rounded-lg" />
                      <div className="space-y-2 pt-0.5">
                        <Shimmer className="h-5 w-44 rounded-md" />
                        <Shimmer className="h-4 w-56 rounded-md" />
                      </div>
                    </div>
                    <Shimmer className="h-10 w-40 rounded-full" />
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Shimmer className="h-6 w-32 rounded-md" />
                        <Shimmer className="min-h-[58px] w-full rounded-lg" />
                      </div>
                      <div className="space-y-2">
                        <Shimmer className="h-6 w-28 rounded-md" />
                        <Shimmer className="min-h-[58px] w-full rounded-lg" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Shimmer className="h-6 w-28 rounded-md" />
                      <Shimmer className="min-h-[58px] w-full rounded-lg" />
                    </div>
                  </div>
                </div>
              </article>
            ))
          : resolvedSections.map((section) => (
              <ContactUsSectionCard
                key={section.id}
                section={section}
                onActionClick={() => setIsContactModalOpen(true)}
              />
            ))}
      </div>

      <AddUpdateContactUsModal
        open={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
}

export default ContactUs;
