import type { ProductRecord } from "@/interfaces/main/products";
import { ProductStatusBadge } from "./product-status-badge";

interface ProductTableProps {
  items: ProductRecord[];
  onViewDetails: (item: ProductRecord) => void;
  onEditDetails: (item: ProductRecord) => void;
  onDeleteDetails: (item: ProductRecord) => void;
}

export function ProductTable({
  items,
  onViewDetails,
  onEditDetails,
  onDeleteDetails,
}: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/10 bg-white">
      <table className="w-full">
        <thead className="bg-bg-creamy/50">
          <tr>
            <th className="px-6 py-5 text-left font-semibold">Cover</th>
            <th className="px-6 py-5 text-left font-semibold">Name</th>
            <th className="px-6 py-5 text-left font-semibold">Sub Category</th>
            <th className="px-6 py-5 text-left font-semibold">Price</th>
            <th className="px-6 py-5 text-left font-semibold">Status</th>
            <th className="px-6 py-5 text-left font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.slug} className="border-t border-border/10">
              <td className="px-6 py-5">
                <img
                  src={item.coverImage}
                  alt={item.name}
                  className="h-14 w-14 rounded-xl object-cover"
                />
              </td>

              <td className="px-6 py-5 font-semibold">{item.name}</td>

              <td className="px-6 py-5">{item.subCategoryName}</td>

              <td className="px-6 py-5">{item.price}</td>

              <td className="px-6 py-5">
                <ProductStatusBadge status={item.status} />
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <button onClick={() => onDeleteDetails(item)}>Delete</button>
                  <button onClick={() => onEditDetails(item)}>Edit</button>
                  <button onClick={() => onViewDetails(item)}>View</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
