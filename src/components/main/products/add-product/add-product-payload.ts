import type { AddProductFormValues } from "@/types/main";

export function buildProductPayload(valuesToSubmit: AddProductFormValues) {
  const payload = new FormData();

  payload.append("title", valuesToSubmit.productName.trim());
  payload.append("sub_category_id", valuesToSubmit.category.trim());
  payload.append("description", valuesToSubmit.description.trim());
  payload.append("description_ingredient", valuesToSubmit.ingredients.trim());
  payload.append("description_allergens", valuesToSubmit.allergens.trim());

  if (valuesToSubmit.productImage) {
    payload.append("images[]", valuesToSubmit.productImage);
  }

  if (valuesToSubmit.pricingType === "perUnit") {
    payload.append("prices[per_unit][0][price]", valuesToSubmit.perUnitPrice);
  }

  if (valuesToSubmit.pricingType === "packs") {
    valuesToSubmit.packs.forEach((pack, index) => {
      const quantity = Number(pack.quantity);
      payload.append("prices[packs][" + index + "][label]", `Pack of ${quantity}`);
      payload.append("prices[packs][" + index + "][quantity]", String(quantity));
      payload.append("prices[packs][" + index + "][price]", pack.price);
    });
  }

  if (valuesToSubmit.pricingType === "sizes") {
    valuesToSubmit.sizes.forEach((size, index) => {
      payload.append(
        "prices[sizes][" + index + "][label]",
        size.label?.trim() ?? "",
      );
      payload.append("prices[sizes][" + index + "][price]", size.price);
    });
  }

  if (valuesToSubmit.pricingType === "byWeight") {
    valuesToSubmit.weights.forEach((weight, index) => {
      const quantity = Number(weight.quantity);
      const unit = weight.unit ?? "OZ";
      payload.append(
        "prices[weight][" + index + "][label]",
        `${quantity} ${unit.toLowerCase()}`,
      );
      payload.append("prices[weight][" + index + "][quantity]", String(quantity));
      payload.append("prices[weight][" + index + "][price]", weight.price);
    });
  }

  if (valuesToSubmit.pricingType === "comboDeal") {
    valuesToSubmit.comboDeals.forEach((deal, index) => {
      const quantity = Number(deal.quantity);
      payload.append(
        "prices[combo][" + index + "][label]",
        `Pack of ${quantity} Combo`,
      );
      payload.append("prices[combo][" + index + "][quantity]", String(quantity));
      payload.append("prices[combo][" + index + "][price]", deal.price);
    });
  }

  if (valuesToSubmit.hasFlavors) {
    valuesToSubmit.flavors
      .filter((flavor) => flavor.trim())
      .forEach((flavor, index) => {
        payload.append("flavors[" + index + "]", flavor.trim());
      });
  }

  return payload;
}
