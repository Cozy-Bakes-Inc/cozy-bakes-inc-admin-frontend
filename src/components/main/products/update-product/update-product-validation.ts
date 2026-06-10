import type { Path, UseFormSetError } from "react-hook-form";
import { z } from "zod";
import type {
  ProductDealTier,
  ProductPriceOption,
  ProductPricingType,
} from "@/types/main";
import type { ProductPriceItem, ProductPrices, SingleProduct } from "@/interfaces";
import type { UpdateProductFormValues } from "./update-product-form-types";

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
    .refine((v) => Number.isFinite(Number(v)) && Number(v) > 0, {
      message: `${field} must be greater than 0`,
    });

const positiveQuantity = (field: string, min = 1) =>
  z
    .string()
    .trim()
    .min(1, `${field} is required`)
    .refine((v) => Number.isInteger(Number(v)), {
      message: `${field} must be a whole number`,
    })
    .refine((v) => Number(v) >= min, {
      message: `${field} must be at least ${min}`,
    });

const optionalPositiveDecimal = (field: string) =>
  z
    .string()
    .trim()
    .refine(
      (v) => !v || (Number.isFinite(Number(v)) && Number(v) > 0),
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

const baseUpdateProductSchema = z.object({
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
  productImages: z.array(
    z
      .custom<File>((v) => isFile(v), { message: "Invalid file" })
      .refine(
        (f) => acceptedImageTypes.includes(f.type),
        "Images must be PNG or JPG",
      )
      .refine(
        (f) => f.size <= maxImageSizeInBytes,
        "Each image must be 5MB or less",
      ),
  ),
  existingImageUrls: z.array(z.string()),
  parcel: parcelSchema,
});

export const updateProductSchema = baseUpdateProductSchema.superRefine(
  (values, ctx) => {
    if (values.productImages.length === 0 && values.existingImageUrls.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["productImages"],
        message: "At least one image is required",
      });
    }

    if (values.pricingType === "perUnit") {
      const result = positiveMoney("Price").safeParse(values.perUnitPrice);
      if (!result.success) {
        ctx.addIssue({
          code: "custom",
          path: ["perUnitPrice"],
          message: result.error.issues[0]?.message ?? "Price is required",
        });
      }
    }

    if (values.pricingType === "packs") {
      values.packs.forEach((pack, i) => {
        const qr = positiveQuantity("Quantity", 2).safeParse(pack.quantity);
        if (!qr.success) {
          ctx.addIssue({
            code: "custom",
            path: ["packs", i, "quantity"],
            message: qr.error.issues[0]?.message ?? "Quantity must be at least 2",
          });
        }
        const pr = positiveMoney("Price").safeParse(pack.price);
        if (!pr.success) {
          ctx.addIssue({
            code: "custom",
            path: ["packs", i, "price"],
            message: pr.error.issues[0]?.message ?? "Price is required",
          });
        }
      });
    }

    if (values.pricingType === "sizes") {
      values.sizes.forEach((size, i) => {
        const lr = requiredText("Size").safeParse(size.label);
        if (!lr.success) {
          ctx.addIssue({
            code: "custom",
            path: ["sizes", i, "label"],
            message: lr.error.issues[0]?.message ?? "Size is required",
          });
        }
        const pr = positiveMoney("Price").safeParse(size.price);
        if (!pr.success) {
          ctx.addIssue({
            code: "custom",
            path: ["sizes", i, "price"],
            message: pr.error.issues[0]?.message ?? "Price is required",
          });
        }
      });
    }

    if (values.pricingType === "byWeight") {
      values.weights.forEach((weight, i) => {
        const qr = positiveQuantity("Quantity").safeParse(weight.quantity);
        if (!qr.success) {
          ctx.addIssue({
            code: "custom",
            path: ["weights", i, "quantity"],
            message: qr.error.issues[0]?.message ?? "Quantity is required",
          });
        }
        const pr = positiveMoney("Price").safeParse(weight.price);
        if (!pr.success) {
          ctx.addIssue({
            code: "custom",
            path: ["weights", i, "price"],
            message: pr.error.issues[0]?.message ?? "Price is required",
          });
        }
      });
    }

    if (values.pricingType === "comboDeal") {
      values.comboDeals.forEach((deal, i) => {
        const qr = positiveQuantity("Quantity").safeParse(deal.quantity);
        if (!qr.success) {
          ctx.addIssue({
            code: "custom",
            path: ["comboDeals", i, "quantity"],
            message: qr.error.issues[0]?.message ?? "Quantity is required",
          });
        }
        const pr = positiveMoney("Price").safeParse(deal.price);
        if (!pr.success) {
          ctx.addIssue({
            code: "custom",
            path: ["comboDeals", i, "price"],
            message: pr.error.issues[0]?.message ?? "Price is required",
          });
        }
      });
    }
  },
);

export function validateUpdateProductField<K extends keyof UpdateProductFormValues>(
  field: K,
  value: UpdateProductFormValues[K],
): string | boolean {
  if (field === "existingImageUrls") return true;
  if (field === "productImages") return true;

  const shape = baseUpdateProductSchema.shape;
  const fieldSchema = shape[field as keyof typeof shape];
  if (!fieldSchema) return true;
  const result = fieldSchema.safeParse(value);
  return result.success || (result.error.issues[0]?.message ?? true);
}

export function applyUpdateProductSchemaErrors(
  values: UpdateProductFormValues,
  setError: UseFormSetError<UpdateProductFormValues>,
) {
  const result = updateProductSchema.safeParse(values);
  if (result.success) return result.data;

  result.error.issues.forEach((issue) => {
    const fieldPath = issue.path.join(".") as Path<UpdateProductFormValues>;
    setError(fieldPath, { type: "manual", message: issue.message });
  });

  return null;
}

// ── API → form value mapper ────────────────────────────────────────────────

function detectPricingType(prices: ProductPrices): ProductPricingType {
  if (prices["per_unit"]?.length) return "perUnit";
  if (prices["packs"]?.length) return "packs";
  if (prices["sizes"]?.length) return "sizes";
  if (prices["weight"]?.length) return "byWeight";
  if (prices["combo"]?.length) return "comboDeal";
  return "perUnit";
}

function mapPacks(items: ProductPriceItem[]): ProductPriceOption[] {
  return items.map((item, i) => ({
    id: `pack-${i}`,
    quantity: item.quantity != null ? String(item.quantity) : "",
    price: item.price,
  }));
}

function mapSizes(items: ProductPriceItem[]): ProductPriceOption[] {
  return items.map((item, i) => ({
    id: `size-${i}`,
    label: item.label,
    price: item.price,
  }));
}

function parseWeightUnit(label: string): "OZ" | "LB" | "G" | "KG" {
  const parts = label.trim().split(" ");
  const raw = (parts[parts.length - 1] ?? "").toUpperCase();
  const valid = ["OZ", "LB", "G", "KG"] as const;
  return valid.includes(raw as (typeof valid)[number])
    ? (raw as (typeof valid)[number])
    : "OZ";
}

function mapWeights(items: ProductPriceItem[]): ProductPriceOption[] {
  return items.map((item, i) => ({
    id: `weight-${i}`,
    quantity: item.quantity != null ? String(item.quantity) : "",
    unit: parseWeightUnit(item.label),
    price: item.price,
  }));
}

function mapComboDeals(items: ProductPriceItem[]): ProductDealTier[] {
  return items.map((item, i) => ({
    id: `deal-${i}`,
    quantity: item.quantity != null ? String(item.quantity) : "",
    price: item.price,
  }));
}

const defaultPacks = () => [
  { id: "pack-1", quantity: "", price: "" },
  { id: "pack-2", quantity: "", price: "" },
];
const defaultSizes = () => [
  { id: "size-1", label: "Small", price: "" },
  { id: "size-2", label: "Medium", price: "" },
  { id: "size-3", label: "Large", price: "" },
];
const defaultWeights = () => [
  { id: "weight-1", quantity: "", unit: "OZ" as const, price: "" },
  { id: "weight-2", quantity: "", unit: "OZ" as const, price: "" },
];
const defaultComboDeals = () => [
  { id: "deal-1", quantity: "", price: "" },
  { id: "deal-2", quantity: "", price: "" },
];

export function mapProductToFormValues(
  product: SingleProduct,
): UpdateProductFormValues {
  const prices = product.prices ?? {};
  const pricingType = detectPricingType(prices);

  return {
    productName: product.title ?? "",
    category: product.sub_category ? String(product.sub_category.id) : "",
    description: product.description ?? "",
    pricingType,
    perUnitPrice:
      pricingType === "perUnit" ? (prices["per_unit"]?.[0]?.price ?? "") : "",
    packs:
      pricingType === "packs" && prices["packs"]?.length
        ? mapPacks(prices["packs"])
        : defaultPacks(),
    sizes:
      pricingType === "sizes" && prices["sizes"]?.length
        ? mapSizes(prices["sizes"])
        : defaultSizes(),
    weights:
      pricingType === "byWeight" && prices["weight"]?.length
        ? mapWeights(prices["weight"])
        : defaultWeights(),
    comboDeals:
      pricingType === "comboDeal" && prices["combo"]?.length
        ? mapComboDeals(prices["combo"])
        : defaultComboDeals(),
    hasFlavors: (product.flavors?.length ?? 0) > 0,
    flavors: product.flavors ?? [],
    ingredients: product.description_ingredient ?? "",
    allergens: product.description_allergens ?? "",
    productImages: [],
    existingImageUrls: product.images ?? [],
    parcel: mapParcel(prices, pricingType),
  };
}

function mapParcel(prices: ProductPrices, pricingType: ProductPricingType) {
  const keyMap: Record<ProductPricingType, string> = {
    perUnit: "per_unit",
    packs: "packs",
    sizes: "sizes",
    byWeight: "weight",
    comboDeal: "combo",
  };
  const meta = prices[keyMap[pricingType]]?.[0]?.meta as
    | { parcel?: Record<string, string | number> }
    | null
    | undefined;
  const p = meta?.parcel;

  return {
    length: p?.length != null ? String(p.length) : "",
    width: p?.width != null ? String(p.width) : "",
    height: p?.height != null ? String(p.height) : "",
    distanceUnit: (p?.distance_unit as "in" | "cm" | "ft" | "m") ?? "in",
    weight: p?.weight != null ? String(p.weight) : "",
    massUnit: (p?.mass_unit as "lb" | "oz" | "g" | "kg") ?? "lb",
  };
}
