import { z } from "zod";

const acceptedImageTypes = ["image/png", "image/jpeg", "image/jpg"];
const maxImageSizeInBytes = 5 * 1024 * 1024;
const weightUnits = ["OZ", "LB", "G", "KG"] as const;
const distanceUnits = ["in", "cm", "ft", "m"] as const;
const massUnits = ["lb", "oz", "g", "kg"] as const;

function isFile(value: unknown): value is File {
  return typeof File !== "undefined" && value instanceof File;
}

const requiredText = (field: string) =>
  z.string().trim().min(1, `${field} is required`);

const positiveMoney = (field: string) =>
  z
    .string()
    .trim()
    .min(1, `${field} is required`)
    .refine((value) => Number.isFinite(Number(value)) && Number(value) > 0, {
      message: `${field} must be greater than 0`,
    });

const positiveQuantity = (field: string, min = 1) =>
  z
    .string()
    .trim()
    .min(1, `${field} is required`)
    .refine((value) => Number.isInteger(Number(value)), {
      message: `${field} must be a whole number`,
    })
    .refine((value) => Number(value) >= min, {
      message: `${field} must be at least ${min}`,
    });

const optionalPositiveDecimal = (field: string) =>
  z
    .string()
    .trim()
    .refine(
      (value) => !value || (Number.isFinite(Number(value)) && Number(value) > 0),
      { message: `${field} must be greater than 0` },
    );

const parcelSchema = z.object({
  length: optionalPositiveDecimal("Length"),
  width: optionalPositiveDecimal("Width"),
  height: optionalPositiveDecimal("Height"),
  distanceUnit: z.enum(distanceUnits),
  weight: optionalPositiveDecimal("Weight"),
  massUnit: z.enum(massUnits),
});

const priceOptionSchema = z.object({
  id: z.string(),
  label: z.string().optional(),
  quantity: z.string().optional(),
  unit: z.enum(weightUnits).optional(),
  price: z.string(),
});

const dealTierSchema = z.object({
  id: z.string(),
  quantity: z.string(),
  price: z.string(),
});

export const createProductSchema = z
  .object({
    productName: requiredText("Title"),
    category: requiredText("Category"),
    description: requiredText("Description"),

    pricingType: z.enum(["perUnit", "packs", "sizes", "byWeight", "comboDeal"]),

    perUnitPrice: z.string(),

    packs: z.array(priceOptionSchema).min(1, "Add at least one pack"),
    sizes: z.array(priceOptionSchema).min(1, "Add at least one size"),
    weights: z.array(priceOptionSchema).min(1, "Add at least one weight"),
    comboDeals: z.array(dealTierSchema).min(1, "Add at least one combo deal"),

    hasFlavors: z.boolean(),
    flavors: z.array(z.string()),

    ingredients: requiredText("Ingredients"),
    allergens: requiredText("Allergens"),

    productImages: z
      .array(
        z
          .custom<File>((value) => isFile(value), { message: "Invalid file" })
          .refine(
            (file) => acceptedImageTypes.includes(file.type),
            "Images must be PNG or JPG",
          )
          .refine(
            (file) => file.size <= maxImageSizeInBytes,
            "Each image must be 5MB or less",
          ),
      )
      .min(1, "At least one image is required"),

    parcel: parcelSchema,
  })
  .superRefine((values, context) => {
    if (values.pricingType === "perUnit") {
      const result = positiveMoney("Price").safeParse(values.perUnitPrice);

      if (!result.success) {
        context.addIssue({
          code: "custom",
          path: ["perUnitPrice"],
          message: result.error.issues[0]?.message ?? "Price is required",
        });
      }
    }

    if (values.pricingType === "packs") {
      values.packs.forEach((pack, index) => {
        const quantityResult = positiveQuantity("Quantity", 2).safeParse(
          pack.quantity,
        );

        if (!quantityResult.success) {
          context.addIssue({
            code: "custom",
            path: ["packs", index, "quantity"],
            message:
              quantityResult.error.issues[0]?.message ??
              "Quantity must be at least 2",
          });
        }

        const priceResult = positiveMoney("Price").safeParse(pack.price);

        if (!priceResult.success) {
          context.addIssue({
            code: "custom",
            path: ["packs", index, "price"],
            message:
              priceResult.error.issues[0]?.message ?? "Price is required",
          });
        }
      });
    }

    if (values.pricingType === "sizes") {
      values.sizes.forEach((size, index) => {
        const labelResult = requiredText("Size").safeParse(size.label);

        if (!labelResult.success) {
          context.addIssue({
            code: "custom",
            path: ["sizes", index, "label"],
            message: labelResult.error.issues[0]?.message ?? "Size is required",
          });
        }

        const priceResult = positiveMoney("Price").safeParse(size.price);

        if (!priceResult.success) {
          context.addIssue({
            code: "custom",
            path: ["sizes", index, "price"],
            message:
              priceResult.error.issues[0]?.message ?? "Price is required",
          });
        }
      });
    }

    if (values.pricingType === "byWeight") {
      values.weights.forEach((weight, index) => {
        const quantityResult = positiveQuantity("Quantity").safeParse(
          weight.quantity,
        );

        if (!quantityResult.success) {
          context.addIssue({
            code: "custom",
            path: ["weights", index, "quantity"],
            message:
              quantityResult.error.issues[0]?.message ?? "Quantity is required",
          });
        }

        const priceResult = positiveMoney("Price").safeParse(weight.price);

        if (!priceResult.success) {
          context.addIssue({
            code: "custom",
            path: ["weights", index, "price"],
            message:
              priceResult.error.issues[0]?.message ?? "Price is required",
          });
        }
      });
    }

    if (values.pricingType === "comboDeal") {
      values.comboDeals.forEach((deal, index) => {
        const quantityResult = positiveQuantity("Quantity").safeParse(
          deal.quantity,
        );

        if (!quantityResult.success) {
          context.addIssue({
            code: "custom",
            path: ["comboDeals", index, "quantity"],
            message:
              quantityResult.error.issues[0]?.message ?? "Quantity is required",
          });
        }

        const priceResult = positiveMoney("Price").safeParse(deal.price);

        if (!priceResult.success) {
          context.addIssue({
            code: "custom",
            path: ["comboDeals", index, "price"],
            message:
              priceResult.error.issues[0]?.message ?? "Price is required",
          });
        }
      });
    }
  });

export type CreateProductSchemaValues = z.input<typeof createProductSchema>;
