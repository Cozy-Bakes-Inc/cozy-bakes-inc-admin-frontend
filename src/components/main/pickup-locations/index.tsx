"use client";

import { useEffect, useMemo, useState } from "react";
import { usePickupAnalytics, usePickupList } from "@/hooks/api";
import type { PickupLocationShop } from "@/types/main";
import { AddPickupLocationModal } from "./add-pickup-location-modal";
import { DeletePickupLocationModal } from "./delete-pickup-location-modal";
import { EditPickupLocationModal } from "./edit-pickup-location-modal";
import { PickupLocationsAnalytics } from "./pickup-locations-analytics";
import { PickupLocationsEmptyState } from "./pickup-locations-empty-state";
import { PickupLocationsHeader } from "./pickup-locations-header";
import { PickupLocationsPagination } from "./pickup-locations-pagination";
import { PickupLocationsTable } from "./pickup-locations-table";
import { PickupLocationsTableShimmer } from "./pickup-locations-table-shimmer";
import { PickupLocationsToolbar } from "./pickup-locations-toolbar";
import { ViewPickupLocationModal } from "./view-pickup-location-modal";

function PickupLocations() {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [activeFilter, setActiveFilter] = useState<number | undefined>();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedViewSlug, setSelectedViewSlug] = useState<string | null>(null);
  const [selectedEditSlug, setSelectedEditSlug] = useState<string | null>(null);
  const [selectedDeleteShop, setSelectedDeleteShop] =
    useState<PickupLocationShop | null>(null);

  const { data: analyticsData, isLoading: isAnalyticsLoading } =
    usePickupAnalytics();
  const { data, isLoading, isFetching } = usePickupList(
    page,
    debouncedSearchValue,
    activeFilter,
  );

  const pagination = data?.data;
  const items = useMemo(() => pagination?.data ?? [], [pagination?.data]);
  const hasEmptyState = !isLoading && items.length === 0;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchValue(searchValue.trim());
      setPage(1);
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [searchValue]);

  function handleSearchChange(value: string) {
    setSearchValue(value);
  }

  function handleActiveFilterChange(value: number | undefined) {
    setActiveFilter(value);
    setPage(1);
  }

  function handlePageChange(nextPage: number) {
    const lastPage = pagination?.last_page ?? 1;
    setPage(Math.min(Math.max(nextPage, 1), lastPage));
  }

  return (
    <section className="space-y-4 md:space-y-6">
      <PickupLocationsHeader onAddClick={() => setIsAddOpen(true)} />

      <PickupLocationsAnalytics
        data={analyticsData}
        isLoading={isAnalyticsLoading}
      />

      <PickupLocationsToolbar
        searchValue={searchValue}
        activeFilter={activeFilter}
        onSearchChange={handleSearchChange}
        onActiveFilterChange={handleActiveFilterChange}
      />

      {isLoading ? (
        <PickupLocationsTableShimmer />
      ) : hasEmptyState ? (
        <PickupLocationsEmptyState searchValue={searchValue} />
      ) : (
        <div className="space-y-4">
          <PickupLocationsTable
            items={items}
            onViewDetails={(item) => setSelectedViewSlug(item.slug)}
            onEditDetails={(item) => setSelectedEditSlug(item.slug)}
            onDeleteDetails={(item) => setSelectedDeleteShop(item)}
          />

          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <PickupLocationsPagination
              currentPage={pagination?.current_page ?? page}
              lastPage={pagination?.last_page ?? 1}
              onPageChange={handlePageChange}
            />
            <p className="text-sm font-medium text-muted-text">
              Showing {pagination?.from ?? 0}-{pagination?.to ?? 0} of{" "}
              {pagination?.total ?? 0} pickup locations
              {isFetching ? " ..." : ""}
            </p>
          </div>
        </div>
      )}

      <AddPickupLocationModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />

      <ViewPickupLocationModal
        open={Boolean(selectedViewSlug)}
        slug={selectedViewSlug}
        onClose={() => setSelectedViewSlug(null)}
      />

      <EditPickupLocationModal
        open={Boolean(selectedEditSlug)}
        slug={selectedEditSlug}
        onClose={() => setSelectedEditSlug(null)}
      />

      <DeletePickupLocationModal
        open={Boolean(selectedDeleteShop)}
        slug={selectedDeleteShop?.slug ?? null}
        name={selectedDeleteShop?.name ?? ""}
        onClose={() => setSelectedDeleteShop(null)}
      />
    </section>
  );
}

export default PickupLocations;
