import type { CustomersHeaderProps } from "@/interfaces/main/customers";

export function CustomersHeader({
  title,
  description,
}: CustomersHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-[24px] font-bold tracking-[0.015em] text-dark">
          {title}
        </h1>
        <p className="mt-1 text-sm font-medium text-gray">{description}</p>
      </div>
    </div>
  );
}
