import type {
  BakeryCategoryDetails,
  BakerySubCategoryRecord,
} from "@/interfaces/main/categories";

const bakeryCoverImages = [
  "https://www.figma.com/api/mcp/asset/4c1e3620-4e81-4197-96dd-b81a83d52a6c",
  "https://www.figma.com/api/mcp/asset/7395b9de-10c4-4dc6-9bf6-5db0f24dc654",
  "https://www.figma.com/api/mcp/asset/88c05bd9-43ac-404a-94cb-ead5269ef16d",
  "https://www.figma.com/api/mcp/asset/a7e454b8-1134-4bdb-8113-e9203febff23",
  "https://www.figma.com/api/mcp/asset/c8bb84f5-0f75-49d4-8f8f-1ef34db2f37a",
  "https://www.figma.com/api/mcp/asset/2026a40d-90c1-48b7-84ab-5530f29bd2b8",
  "https://www.figma.com/api/mcp/asset/ee9f7f36-34ff-4172-9b8f-262f3d9520c3",
  "https://www.figma.com/api/mcp/asset/c7b642b4-5ad0-4795-8b9e-8fb1aa409970",
];

export const bakeryCategoryDetails: BakeryCategoryDetails = {
  slug: "bakery",
  title: "Categories Management",
  description: "Organize your products into Categories",
  heroTitle: "Bakery",
};

export const bakerySubCategories: BakerySubCategoryRecord[] = [
  {
    id: "#CATE-1001",
    slug: "breads",
    name: "Breads",
    description:
      "Artisan sourdough, rustic baguettes, and handcrafted loaves baked fresh daily with premium organic flour.",
    coverImage: bakeryCoverImages[0],
  },
  {
    id: "#CATE-1002",
    slug: "croissants-pastries",
    name: "Croissants & Pastries",
    description:
      "Golden laminated dough, butter croissants, pain au chocolat, and flaky morning pastries for the breakfast rush.",
    coverImage: bakeryCoverImages[1],
  },
  {
    id: "#CATE-1003",
    slug: "cakes-desserts",
    name: "Cakes & Desserts",
    description:
      "Celebration cakes, mousse slices, and signature dessert trays finished with rich fillings and elegant toppings.",
    coverImage: bakeryCoverImages[2],
  },
  {
    id: "#CATE-1004",
    slug: "cookies-biscuits",
    name: "Cookies & Biscuits",
    description:
      "Crunchy cookies, chewy biscuits, and small-batch seasonal treats packaged for grab-and-go gifting.",
    coverImage: bakeryCoverImages[3],
  },
  {
    id: "#CATE-1006",
    slug: "donuts",
    name: "Donuts",
    description:
      "Freshly fried ring donuts and filled varieties glazed, dusted, or finished with chocolate and caramel drizzles.",
    coverImage: bakeryCoverImages[4],
  },
  {
    id: "#CATE-1007",
    slug: "savory-bakery",
    name: "Savory Bakery",
    description:
      "Stuffed rolls, baked sandwiches, and savory dough specialties prepared for quick lunches and office catering.",
    coverImage: bakeryCoverImages[5],
  },
  {
    id: "#CATE-1008",
    slug: "savory",
    name: "Savory",
    description:
      "Quiches, puff pastries, and snackable bites balanced with cheeses, herbs, roasted vegetables, and meats.",
    coverImage: bakeryCoverImages[6],
  },
  {
    id: "#CATE-1009",
    slug: "specialty-rolls",
    name: "Specialty Rolls",
    description:
      "Cinnamon swirls, sticky buns, and filled soft rolls built around indulgent textures and bakery signature flavors.",
    coverImage: bakeryCoverImages[7],
  },
  {
    id: "#CATE-1010",
    slug: "danish-rolls",
    name: "Danish Rolls",
    description:
      "Fruit danishes, cream-cheese spirals, and glossy rolled pastries layered for a premium coffee-counter selection.",
    coverImage: bakeryCoverImages[0],
  },
];

export const categoryPagination = [1, 2, 3, 4, 5, 6, 7, 8];
