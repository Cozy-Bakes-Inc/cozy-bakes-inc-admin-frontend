import { z } from "zod";

export const resendOtpSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
});

export type ResendOtpSchemaValues = z.infer<typeof resendOtpSchema>;
