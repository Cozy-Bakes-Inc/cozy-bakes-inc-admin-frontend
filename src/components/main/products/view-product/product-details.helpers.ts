import type {
  ProductPriceItem,
  ProductPrices,
} from "@/interfaces/main/products";

export function formatCurrency(price: string | number): string {
  const amount = Number(price);

  if (!Number.isFinite(amount)) {
    return String(price);
  }

  return `$${amount.toFixed(2)}`;
}

export function flattenProductPrices(
  prices?: ProductPrices | null,
): ProductPriceItem[] {
  return Object.values(prices ?? {}).flat();
}

export function formatPriceGroupLabel(type: string): string {
  return type
    .split("_")
    .filter(Boolean)
    .map((word, index) =>
      index === 0
        ? `${word.charAt(0).toUpperCase()}${word.slice(1)}`
        : word,
    )
    .join(" ");
}

export function getProductStatusLabel(status: number | string): string {
  return String(status) === "1" ? "Active" : "Inactive";
}
