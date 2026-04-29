import type { ReactNode } from "react";
import type { ContactUsSectionIcon } from "@/types/main/contact-us";

export interface ContactUsWorkspaceConfig {
  title: string;
  description: string;
}

export interface ContactUsField {
  id: string;
  label: string;
  value: string;
  multiline?: boolean;
}

export interface ContactUsSection {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  icon: ContactUsSectionIcon;
  fields: ContactUsField[];
}

export interface ContactUsHeaderProps {
  title: string;
  description: string;
}

export interface ContactUsSectionCardProps {
  section: ContactUsSection;
}

export interface ContactUsSectionHeaderProps {
  title: string;
  description: string;
  actionLabel: string;
  icon: ContactUsSectionIcon;
}

export interface ContactUsFieldCardProps {
  field: ContactUsField;
}

export interface ContactUsFieldGridProps {
  fields: ContactUsField[];
}

export interface ContactUsActionButtonProps {
  children: ReactNode;
}

export interface ContactUsHeroSectionData {
  hero_title: string;
  hero_subtitle: string;
  cover_image: string;
}

export interface ContactUsDetailsSectionData {
  contact_email: string;
  phone_number: string;
  location: string;
  image: string;
}

export interface ContactUsDetailsData {
  hero_section: ContactUsHeroSectionData | null;
  contact_section: ContactUsDetailsSectionData | null;
}

export interface ContactUsDetailsResponse {
  status: string;
  message: string;
  data: ContactUsDetailsData;
}
