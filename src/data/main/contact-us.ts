import type {
  ContactUsSection,
  ContactUsWorkspaceConfig,
} from "@/interfaces/main/contact-us";

export const contactUsWorkspace: ContactUsWorkspaceConfig = {
  title: "Contact Us",
  description: "Monitor, moderate, and control public customer feedback",
};

export const contactUsSections: ContactUsSection[] = [
  {
    id: "contact-data",
    title: "Contact data management",
    description: "management your store location and connection data",
    actionLabel: "Edit Contact Data",
    icon: "contact",
    fields: [
      {
        id: "contact-email",
        label: "Contact Email",
        value: "hello@cozybakes.com",
      },
      {
        id: "phone-number",
        label: "Phone Number",
        value: "+1 (555) 123-4567",
      },
      {
        id: "location",
        label: "Our Location",
        value: "100 Smith Street Collingwood VIC 3066 AU",
      },
    ],
  },
];
