import { z } from "zod";

export const verifyOtpSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  otp: z
    .string()
    .trim()
    .min(1, "Verification code is required")
    .length(5, "Verification code must be 5 digits")
    .regex(/^\d+$/, "Verification code must contain only numbers"),
});

export type VerifyOtpSchemaValues = z.infer<typeof verifyOtpSchema>;
