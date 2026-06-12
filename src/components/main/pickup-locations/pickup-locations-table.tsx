import { Eye, PencilLine, Trash2 } from "lucide-react";
import { CategoryActionButton } from "@/components/main/categories/category-action-button";
import { formatPhoneDisplay } from "@/lib/utils/phone";
import type { PickupLocationShop } from "@/types/main";
import { PickupLocationStatusBadge } from "./pickup-location-status-badge";

interface PickupLocationsTableProps {
  items: PickupLocationShop[];
  onViewDetails: (item: PickupLocationShop) => void;
  onEditDetails: (item: PickupLocationShop) => void;
  onDeleteDetails: (item: PickupLocationShop) => void;
}

export function PickupLocationsTable({
  items,
  onViewDetails,
  onEditDetails,
  onDeleteDetails,
}: PickupLocationsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/10 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-[1080px] border-separate border-spacing-0 xl:min-w-full">
          <thead>
            <tr className="bg-bg-creamy">
              <th className="w-[112px] px-4 py-5 text-left text-base font-semibold text-dark md:px-5">
                ID
              </th>
              <th className="w-[220px] px-4 py-5 text-left text-base font-semibold text-dark md:px-5">
                Location
              </th>
              <th className="w-[280px] px-4 py-5 text-left text-base font-semibold text-dark md:px-5">
                Address
              </th>
              <th className="w-[220px] px-4 py-5 text-left text-base font-semibold text-dark md:px-5">
                Contact
              </th>
              <th className="w-[120px] px-4 py-5 text-center text-base font-semibold text-dark md:px-5">
                Status
              </th>
              <th className="w-[156px] px-4 py-5 text-center text-base font-semibold text-dark md:px-5">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="bg-[rgba(250,248,243,0.08)]">
                <td className="border-b border-border/15 px-4 py-4 align-middle text-base font-medium uppercase text-dark md:px-5">
                  #SHOP-{item.id}
                </td>
                <td className="border-b border-border/15 px-4 py-4 align-middle md:px-5">
                  <div className="min-w-[180px]">
                    <p className="text-base font-semibold text-dark">
                      {item.name}
                    </p>
                  </div>
                </td>
                <td className="border-b border-border/15 px-4 py-4 align-middle md:px-5">
                  <p className="max-w-[260px] truncate text-sm font-medium leading-5 text-muted-text">
                    {item.address_line}
                  </p>
                </td>
                <td className="border-b border-border/15 px-4 py-4 align-middle md:px-5">
                  <div className="max-w-[190px] text-sm font-medium leading-5 text-muted-text">
                    <p>{formatPhoneDisplay(item.phone_number)}</p>
                    <p className="truncate">{item.email}</p>
                  </div>
                </td>
                <td className="border-b border-border/15 px-4 py-4 text-center align-middle md:px-5">
                  <PickupLocationStatusBadge isActive={item.is_active} />
                </td>
                <td className="border-b border-border/15 px-4 py-4 align-middle md:px-5">
                  <div className="flex items-center justify-center gap-2">
                    <CategoryActionButton
                      label={`Delete ${item.name}`}
                      tone="danger"
                      icon={<Trash2 className="size-4" strokeWidth={2.1} />}
                      onClick={() => onDeleteDetails(item)}
                    />
                    <CategoryActionButton
                      label={`Edit ${item.name}`}
                      tone="info"
                      icon={<PencilLine className="size-4" strokeWidth={2.1} />}
                      onClick={() => onEditDetails(item)}
                    />
                    <CategoryActionButton
                      label={`View ${item.name}`}
                      tone="primary"
                      icon={<Eye className="size-4" strokeWidth={2.1} />}
                      onClick={() => onViewDetails(item)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
