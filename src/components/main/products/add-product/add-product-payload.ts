import type { AddProductFormValues } from "@/types/main";

export function buildProductPayload(valuesToSubmit: AddProductFormValues) {
  const payload = new FormData();

  const productTitle = valuesToSubmit.productName.trim();

  payload.append("title", productTitle);
  payload.append("sub_category_id", valuesToSubmit.category.trim());
  payload.append("description", valuesToSubmit.description.trim());
  payload.append("description_ingredient", valuesToSubmit.ingredients.trim());
  payload.append("description_allergens", valuesToSubmit.allergens.trim());

  valuesToSubmit.productImages.forEach((image) => {
    payload.append("images[]", image);
  });

  if (valuesToSubmit.pricingType === "perUnit") {
    const label = `Single ${productTitle}`;
    const { parcel } = valuesToSubmit;

    payload.append("prices[per_unit][0][price]", valuesToSubmit.perUnitPrice);
    payload.append("prices[per_unit][0][label]", label);
    payload.append("prices[per_unit][0][meta][parcel][length]", parcel.length);
    payload.append("prices[per_unit][0][meta][parcel][width]", parcel.width);
    payload.append("prices[per_unit][0][meta][parcel][height]", parcel.height);
    payload.append("prices[per_unit][0][meta][parcel][distance_unit]", parcel.distanceUnit);
    payload.append("prices[per_unit][0][meta][parcel][weight]", parcel.weight);
    payload.append("prices[per_unit][0][meta][parcel][mass_unit]", parcel.massUnit);
  }

  if (valuesToSubmit.pricingType === "packs") {
    const { parcel } = valuesToSubmit;

    valuesToSubmit.packs.forEach((pack, index) => {
      const quantity = Number(pack.quantity);
      const i = String(index);

      payload.append("prices[packs][" + i + "][label]", `Pack of ${quantity}`);
      payload.append("prices[packs][" + i + "][quantity]", String(quantity));
      payload.append("prices[packs][" + i + "][price]", pack.price);
      payload.append("prices[packs][" + i + "][meta][parcel][length]", parcel.length);
      payload.append("prices[packs][" + i + "][meta][parcel][width]", parcel.width);
      payload.append("prices[packs][" + i + "][meta][parcel][height]", parcel.height);
      payload.append("prices[packs][" + i + "][meta][parcel][distance_unit]", parcel.distanceUnit);
      payload.append("prices[packs][" + i + "][meta][parcel][weight]", parcel.weight);
      payload.append("prices[packs][" + i + "][meta][parcel][mass_unit]", parcel.massUnit);
    });
  }

  if (valuesToSubmit.pricingType === "sizes") {
    const { parcel } = valuesToSubmit;

    valuesToSubmit.sizes.forEach((size, index) => {
      const i = String(index);

      payload.append("prices[sizes][" + i + "][label]", size.label?.trim() ?? "");
      payload.append("prices[sizes][" + i + "][price]", size.price);
      payload.append("prices[sizes][" + i + "][meta][parcel][length]", parcel.length);
      payload.append("prices[sizes][" + i + "][meta][parcel][width]", parcel.width);
      payload.append("prices[sizes][" + i + "][meta][parcel][height]", parcel.height);
      payload.append("prices[sizes][" + i + "][meta][parcel][distance_unit]", parcel.distanceUnit);
      payload.append("prices[sizes][" + i + "][meta][parcel][weight]", parcel.weight);
      payload.append("prices[sizes][" + i + "][meta][parcel][mass_unit]", parcel.massUnit);
    });
  }

  if (valuesToSubmit.pricingType === "byWeight") {
    const { parcel } = valuesToSubmit;

    valuesToSubmit.weights.forEach((weight, index) => {
      const quantity = Number(weight.quantity);
      const unit = weight.unit ?? "OZ";
      const i = String(index);

      payload.append("prices[weight][" + i + "][label]", `${quantity} ${unit.toLowerCase()}`);
      payload.append("prices[weight][" + i + "][quantity]", String(quantity));
      payload.append("prices[weight][" + i + "][price]", weight.price);
      payload.append("prices[weight][" + i + "][meta][parcel][length]", parcel.length);
      payload.append("prices[weight][" + i + "][meta][parcel][width]", parcel.width);
      payload.append("prices[weight][" + i + "][meta][parcel][height]", parcel.height);
      payload.append("prices[weight][" + i + "][meta][parcel][distance_unit]", parcel.distanceUnit);
      payload.append("prices[weight][" + i + "][meta][parcel][weight]", parcel.weight);
      payload.append("prices[weight][" + i + "][meta][parcel][mass_unit]", parcel.massUnit);
    });
  }

  if (valuesToSubmit.pricingType === "comboDeal") {
    const { parcel } = valuesToSubmit;

    valuesToSubmit.comboDeals.forEach((deal, index) => {
      const quantity = Number(deal.quantity);
      const label = quantity === 1 ? `Single ${productTitle}` : `Pack of ${quantity}`;
      const i = String(index);

      payload.append("prices[combo][" + i + "][label]", label);
      payload.append("prices[combo][" + i + "][quantity]", String(quantity));
      payload.append("prices[combo][" + i + "][price]", deal.price);
      payload.append("prices[combo][" + i + "][meta][parcel][length]", parcel.length);
      payload.append("prices[combo][" + i + "][meta][parcel][width]", parcel.width);
      payload.append("prices[combo][" + i + "][meta][parcel][height]", parcel.height);
      payload.append("prices[combo][" + i + "][meta][parcel][distance_unit]", parcel.distanceUnit);
      payload.append("prices[combo][" + i + "][meta][parcel][weight]", parcel.weight);
      payload.append("prices[combo][" + i + "][meta][parcel][mass_unit]", parcel.massUnit);
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
