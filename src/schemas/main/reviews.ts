import { z } from "zod";

export const reviewPayloadStatusSchema = z.enum(
  ["approved", "pending", "rejected"],
  {
    error: "Status is required",
  },
);

export const editReviewSchema = z.object({
  customer_name: z.string().trim().min(1, "Customer name is required"),
  customer_email: z
    .string()
    .trim()
    .email("Customer email must be a valid email")
    .optional()
    .or(z.literal("")),
  rating: z
    .number({ error: "Rating is required" })
    .min(1, "Rating is required")
    .max(5, "Rating must be 5 or less"),
  review_text: z.string().trim().optional(),
  status: reviewPayloadStatusSchema,
});

export const createReviewSchema = editReviewSchema;

export type EditReviewSchemaValues = z.input<typeof editReviewSchema>;
export type CreateReviewSchemaValues = Omit<
  z.input<typeof createReviewSchema>,
  "status"
> & {
  status: z.input<typeof reviewPayloadStatusSchema> | "";
};
