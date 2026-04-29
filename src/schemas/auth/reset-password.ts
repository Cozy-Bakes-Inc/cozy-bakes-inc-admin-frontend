import { z } from "zod";

export const resetPasswordSchema = z
  .object({
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
    password: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type ResetPasswordSchemaValues = z.infer<typeof resetPasswordSchema>;
