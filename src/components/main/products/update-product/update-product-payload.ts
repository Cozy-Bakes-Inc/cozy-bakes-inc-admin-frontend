import type { UpdateProductFormValues } from "./update-product-form-types";

type DirtyFields = Partial<Record<keyof UpdateProductFormValues, unknown>>;

const pricingKeys: ReadonlyArray<keyof UpdateProductFormValues> = [
  "pricingType",
  "perUnitPrice",
  "packs",
  "sizes",
  "weights",
  "comboDeals",
  "parcel",
];

function isPricingDirty(dirtyFields: DirtyFields): boolean {
  return pricingKeys.some((k) => k in dirtyFields);
}

export function buildPartialUpdatePayload(
  values: UpdateProductFormValues,
  dirtyFields: DirtyFields,
): FormData {
  const payload = new FormData();
  const productTitle = values.productName.trim();

  if (dirtyFields.productName) payload.append("title", productTitle);
  if (dirtyFields.category) payload.append("sub_category_id", values.category.trim());
  if (dirtyFields.description) payload.append("description", values.description.trim());
  if (dirtyFields.ingredients) payload.append("description_ingredient", values.ingredients.trim());
  if (dirtyFields.allergens) payload.append("description_allergens", values.allergens.trim());

  if (values.productImages.length > 0) {
    values.productImages.forEach((image) => payload.append("images[]", image));
  }

  if (isPricingDirty(dirtyFields)) {
    const { parcel } = values;

    if (values.pricingType === "perUnit") {
      payload.append("prices[per_unit][0][price]", values.perUnitPrice);
      payload.append("prices[per_unit][0][label]", `Single ${productTitle}`);
      payload.append("prices[per_unit][0][meta][parcel][length]", parcel.length);
      payload.append("prices[per_unit][0][meta][parcel][width]", parcel.width);
      payload.append("prices[per_unit][0][meta][parcel][height]", parcel.height);
      payload.append("prices[per_unit][0][meta][parcel][distance_unit]", parcel.distanceUnit);
      payload.append("prices[per_unit][0][meta][parcel][weight]", parcel.weight);
      payload.append("prices[per_unit][0][meta][parcel][mass_unit]", parcel.massUnit);
    }

    if (values.pricingType === "packs") {
      values.packs.forEach((pack, i) => {
        const qty = Number(pack.quantity);
        payload.append(`prices[packs][${i}][label]`, `Pack of ${qty}`);
        payload.append(`prices[packs][${i}][quantity]`, String(qty));
        payload.append(`prices[packs][${i}][price]`, pack.price);
        payload.append(`prices[packs][${i}][meta][parcel][length]`, parcel.length);
        payload.append(`prices[packs][${i}][meta][parcel][width]`, parcel.width);
        payload.append(`prices[packs][${i}][meta][parcel][height]`, parcel.height);
        payload.append(`prices[packs][${i}][meta][parcel][distance_unit]`, parcel.distanceUnit);
        payload.append(`prices[packs][${i}][meta][parcel][weight]`, parcel.weight);
        payload.append(`prices[packs][${i}][meta][parcel][mass_unit]`, parcel.massUnit);
      });
    }

    if (values.pricingType === "sizes") {
      values.sizes.forEach((size, i) => {
        payload.append(`prices[sizes][${i}][label]`, size.label?.trim() ?? "");
        payload.append(`prices[sizes][${i}][price]`, size.price);
        payload.append(`prices[sizes][${i}][meta][parcel][length]`, parcel.length);
        payload.append(`prices[sizes][${i}][meta][parcel][width]`, parcel.width);
        payload.append(`prices[sizes][${i}][meta][parcel][height]`, parcel.height);
        payload.append(`prices[sizes][${i}][meta][parcel][distance_unit]`, parcel.distanceUnit);
        payload.append(`prices[sizes][${i}][meta][parcel][weight]`, parcel.weight);
        payload.append(`prices[sizes][${i}][meta][parcel][mass_unit]`, parcel.massUnit);
      });
    }

    if (values.pricingType === "byWeight") {
      values.weights.forEach((weight, i) => {
        const qty = Number(weight.quantity);
        const unit = weight.unit ?? "OZ";
        payload.append(`prices[weight][${i}][label]`, `${qty} ${unit.toLowerCase()}`);
        payload.append(`prices[weight][${i}][quantity]`, String(qty));
        payload.append(`prices[weight][${i}][price]`, weight.price);
        payload.append(`prices[weight][${i}][meta][parcel][length]`, parcel.length);
        payload.append(`prices[weight][${i}][meta][parcel][width]`, parcel.width);
        payload.append(`prices[weight][${i}][meta][parcel][height]`, parcel.height);
        payload.append(`prices[weight][${i}][meta][parcel][distance_unit]`, parcel.distanceUnit);
        payload.append(`prices[weight][${i}][meta][parcel][weight]`, parcel.weight);
        payload.append(`prices[weight][${i}][meta][parcel][mass_unit]`, parcel.massUnit);
      });
    }

    if (values.pricingType === "comboDeal") {
      values.comboDeals.forEach((deal, i) => {
        const qty = Number(deal.quantity);
        const label = qty === 1 ? `Single ${productTitle}` : `Pack of ${qty}`;
        payload.append(`prices[combo][${i}][label]`, label);
        payload.append(`prices[combo][${i}][quantity]`, String(qty));
        payload.append(`prices[combo][${i}][price]`, deal.price);
        payload.append(`prices[combo][${i}][meta][parcel][length]`, parcel.length);
        payload.append(`prices[combo][${i}][meta][parcel][width]`, parcel.width);
        payload.append(`prices[combo][${i}][meta][parcel][height]`, parcel.height);
        payload.append(`prices[combo][${i}][meta][parcel][distance_unit]`, parcel.distanceUnit);
        payload.append(`prices[combo][${i}][meta][parcel][weight]`, parcel.weight);
        payload.append(`prices[combo][${i}][meta][parcel][mass_unit]`, parcel.massUnit);
      });
    }
  }

  if ("hasFlavors" in dirtyFields || "flavors" in dirtyFields) {
    if (values.hasFlavors) {
      values.flavors
        .filter((f) => f.trim())
        .forEach((flavor, i) => payload.append(`flavors[${i}]`, flavor.trim()));
    }
  }

  return payload;
}
