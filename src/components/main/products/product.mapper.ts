import type {
  ProductListItem,
  ProductRecord,
} from "@/interfaces/main/products";

function getFirstProductPrice(item: ProductListItem) {
  const priceGroups = Object.values(item.prices ?? {});
  const firstGroup = priceGroups[0];

  if (!firstGroup || firstGroup.length === 0) {
    return "—";
  }

  const firstPrice = firstGroup[0];

  return `${firstPrice.price} / ${firstPrice.label}`;
}

export function mapProductToRecord(item: ProductListItem): ProductRecord {
  return {
    slug: item.slug,
    name: item.title,
    description: item.description,
    ingredients: item.description_ingredient,
    status: item.status,
    subCategoryName: item.sub_category?.title ?? "—",
    categoryName: item.sub_category?.category?.title ?? "—",
    coverImage: item.images?.[0] ?? "/images/logo.svg",
    flavors: item.flavors ?? [],
    price: getFirstProductPrice(item),
    createdAt: item.created_at,
  };
}
