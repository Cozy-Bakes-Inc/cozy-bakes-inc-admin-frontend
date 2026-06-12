"use client";

import { useMemo, useState } from "react";
import {
  customerDirectoryState,
  customerOverviewMetrics,
  customerPerformanceMetrics,
  customerSegmentOptions,
  customersWorkspace,
} from "@/data/main/customers";
import type {
  CustomerRecord,
  CustomersListItem,
  CustomersListTabsData,
} from "@/interfaces/main/customers";
import { useCustomersList } from "@/hooks/api";
import type {
  CustomerSegmentFilter,
  CustomerSortOption,
} from "@/types/main/customers";
import { CustomersCanvas } from "./customers-canvas";
import CustomerDetails from "./customer-details";
import { formatCustomerDaysInactive } from "./customer-details/customer-details.utils";
import { CustomersHeader } from "./customers-header";
import { CustomersPagination } from "./customers-pagination";
import { CustomersPerformanceOverview } from "./customers-performance-overview";
import { CustomersSegmentTabs } from "./customers-segment-tabs";
import { CustomersShell } from "./customers-shell";
import { CustomersSummaryGrid } from "./customers-summary-grid";
import { CustomersTable } from "./customers-table";
import { CustomersToolbar } from "./customers-toolbar";

function mapFilterToApiTab(filter: CustomerSegmentFilter) {
  switch (filter) {
    case "all":
      return "all";
    case "registered-only":
      return "registered";
    case "first-time":
      return "first_time";
    case "repeat-customers":
      return "repeat";
    case "vip":
      return "vip";
    case "inactive":
      return "inactive";
    case "high-spenders":
      return "high_spenders";
    default:
      return "all";
  }
}

function mapApiStatusToUiStatus(status: string, orders: number): CustomerRecord["status"] {
  switch (status) {
    case "registered":
      return "Registered Only";
    case "inactive":
      return "Inactive";
    case "first_time":
      return "First-Time";
    case "vip":
      return "VIP";
    case "active":
    case "repeat":
      return orders > 1 ? "Active" : "First-Time";
    default:
      return orders > 1 ? "Active" : "Registered Only";
  }
}

function formatCustomerLastOrder(value: string) {
  if (!value) return "Never";

  const normalizedValue = value.replace(" ", "T");
  const parsedDate = new Date(normalizedValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
}

function mapCustomerItemToRow(item: CustomersListItem): CustomerRecord {
  return {
    id: `#USER-${item.id}`,
    slug: item.slug,
    name: item.name,
    email: item.email,
    orders: item.orders,
    totalSpent: `$${item.total_spent}`,
    lastOrder: formatCustomerLastOrder(item.last_order),
    daysInactive: formatCustomerDaysInactive(item.days_inactive),
    status: mapApiStatusToUiStatus(item.status, item.orders),
    isHighSpender: item.status === "high_spenders" || item.status === "vip",
  };
}

function buildSegmentOptions(tabs?: CustomersListTabsData) {
  return customerSegmentOptions.map((option) => {
    const countMap: Record<CustomerSegmentFilter, number | undefined> = {
      all: tabs?.all,
      "registered-only": tabs?.registered,
      "first-time": tabs?.first_time,
      "repeat-customers": tabs?.repeat,
      vip: tabs?.vip,
      inactive: tabs?.inactive,
      "high-spenders": tabs?.high_spenders,
    };

    return {
      ...option,
      count: countMap[option.value] ?? option.count,
    };
  });
}

function escapeCsvValue(value: string | number) {
  const stringValue = String(value);
  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

function Customers() {
  const [activeFilter, setActiveFilter] =
    useState<CustomerSegmentFilter>("all");
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState<CustomerSortOption>("newest");
  const [selectedCustomerSlug, setSelectedCustomerSlug] = useState<
    string | null
  >(null);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const { data, isLoading } = useCustomersList(
    page,
    mapFilterToApiTab(activeFilter),
    sortValue,
  );
  const pagination = data?.data?.customers;

  const filters = useMemo(
    () => buildSegmentOptions(data?.data?.tabs),
    [data],
  );

  const visibleRows = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    const apiRows = pagination?.data.map(mapCustomerItemToRow) ?? [];

    return apiRows.filter((row) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        row.id.toLowerCase().includes(normalizedSearch) ||
        row.name.toLowerCase().includes(normalizedSearch) ||
        row.email.toLowerCase().includes(normalizedSearch);

      return matchesSearch;
    });
  }, [pagination?.data, searchValue]);

  function handleExportCustomers() {
    const headers = [
      "Customer ID",
      "Name",
      "Email",
      "Orders",
      "Total Spent",
      "Last Order",
      "Days Inactive",
      "Status",
    ];

    const csvRows = visibleRows.map((row) =>
      [
        row.id,
        row.name,
        row.email,
        row.orders,
        row.totalSpent,
        row.lastOrder,
        row.daysInactive,
        row.status,
      ]
        .map(escapeCsvValue)
        .join(","),
    );

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `customers-${activeFilter}-${sortValue}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleViewCustomerDetails(customer: CustomerRecord) {
    setSelectedCustomerSlug(customer.slug);
    setIsCustomerDetailsOpen(true);
  }

  function handleFilterChange(value: CustomerSegmentFilter) {
    setActiveFilter(value);
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearchValue(value);
    setPage(1);
  }

  function handleSortChange(value: CustomerSortOption) {
    setSortValue(value);
    setPage(1);
  }

  function handlePageChange(nextPage: number) {
    const lastPage = pagination?.last_page ?? 1;
    setPage(Math.min(Math.max(nextPage, 1), lastPage));
  }

  function closeCustomerDetails() {
    setIsCustomerDetailsOpen(false);
    setSelectedCustomerSlug(null);
  }

  return (
    <>
      <CustomersShell>
      <CustomersHeader
        title={customersWorkspace.title}
        description={customersWorkspace.description}
      />

      <CustomersSummaryGrid metrics={customerOverviewMetrics} />

      <CustomersPerformanceOverview metrics={customerPerformanceMetrics} />

      <CustomersCanvas ariaLabel={customersWorkspace.ariaLabel}>
        <CustomersSegmentTabs
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        <CustomersToolbar
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          sortValue={sortValue}
          onSortChange={handleSortChange}
          exportLabel={customerDirectoryState.exportLabel}
          onExport={handleExportCustomers}
        />

        <CustomersTable
          rows={visibleRows}
          isLoading={isLoading}
          onViewDetails={handleViewCustomerDetails}
        />

        {!isLoading && visibleRows.length > 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 overflow-x-auto pt-2 text-center">
            <CustomersPagination
              currentPage={pagination?.current_page ?? page}
              lastPage={pagination?.last_page ?? 1}
              onPageChange={handlePageChange}
            />
            <p className="text-sm font-medium text-muted-text">
              Showing {pagination?.from ?? 0}-{pagination?.to ?? 0} of{" "}
              {pagination?.total ?? 0} customers
            </p>
          </div>
        ) : null}
      </CustomersCanvas>
      </CustomersShell>

      <CustomerDetails
        open={isCustomerDetailsOpen}
        slug={selectedCustomerSlug}
        onClose={closeCustomerDetails}
      />
    </>
  );
}

export default Customers;
