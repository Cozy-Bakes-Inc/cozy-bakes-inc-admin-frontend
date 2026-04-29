import { z } from "zod";

export const contactInfoSchema = z.object({
  contact_email: z
    .string()
    .trim()
    .min(1, "Contact email is required")
    .email("Contact email must be a valid email"),
  phone_number: z.string().trim().min(1, "Phone number is required"),
  location: z.string().trim().optional(),
});

export type ContactInfoSchemaValues = z.input<typeof contactInfoSchema>;
