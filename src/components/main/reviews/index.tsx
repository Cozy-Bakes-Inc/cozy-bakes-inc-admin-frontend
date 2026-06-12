"use client";

import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  reviewFilterOptions,
  reviewModerationControls,
  reviewSummaryMetrics,
  reviewsWorkspace,
} from "@/data/main/reviews";
import type {
  ReviewFilter,
  ReviewStatus,
  ReviewListApiStatus,
  ReviewListApiSortOption,
} from "@/types/main/reviews";
import type { ReviewRow } from "@/interfaces/main/reviews";
import { ReviewsFilterTabs } from "./reviews-filter-tabs";
import { ReviewsHeader } from "./reviews-header";
import { ReviewsModerationPanel } from "./reviews-moderation-panel";
import { ReviewsDeleteModal } from "./reviews-delete-modal";
import CreateReviewModal from "./create-review";
import EditReviewModal from "./edit-review";
import ViewReviewModal from "./view-review-modal";
import { ReviewsShell } from "./reviews-shell";
import { ReviewsSummaryGrid } from "./reviews-summary-grid";
import { ReviewsTable } from "./reviews-table";
import { ReviewsToolbar } from "./reviews-toolbar";
import { ReviewsPagination } from "./reviews-pagination";
import { useReviewList } from "@/hooks/api";
import { deleteReviewAPI } from "@/services/mutations";

function Reviews() {
  const queryClient = useQueryClient();
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>("all");
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState<ReviewListApiSortOption>("newest");
  const [reviewToDelete, setReviewToDelete] = useState<ReviewRow | null>(null);
  const [reviewSlugToView, setReviewSlugToView] = useState<string | null>(null);
  const [reviewSlugToEdit, setReviewSlugToEdit] = useState<string | null>(null);
  const [isCreateReviewOpen, setIsCreateReviewOpen] = useState(false);
  const [isViewReviewOpen, setIsViewReviewOpen] = useState(false);
  const [isEditReviewOpen, setIsEditReviewOpen] = useState(false);
  const [isDeletingReview, setIsDeletingReview] = useState(false);
  const statusFilter: ReviewListApiStatus | undefined =
    activeFilter === "all"
      ? undefined
      : activeFilter === "hidden"
        ? "rejected"
        : activeFilter;
  const { data, isLoading, isFetching } = useReviewList(
    page,
    sortValue,
    statusFilter,
  );
  const pagination = data?.data;

  const apiRows = useMemo(
    () => pagination?.data ?? [],
    [pagination?.data],
  );

  const mappedRows = useMemo(
    () =>
      apiRows.map((row) => {
        const status: ReviewStatus =
          row.status === "approved"
            ? "Approved"
            : row.status === "pending"
              ? "Pending"
              : "Hidden";
        const parsedRating = Number(row.rating);

        return {
          id: String(row.id),
          slug: row.slug,
          name: row.customer_name,
          email: row.customer_email,
          rating: Number.isFinite(parsedRating) ? parsedRating : 0,
          reviewText: row.review_text ?? "",
          date: row.date ?? "",
          status,
        };
      }),
    [apiRows],
  );

  const visibleRows = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    if (normalizedSearch.length === 0) {
      return mappedRows;
    }

    return mappedRows.filter((row) =>
      [row.name, row.email, row.reviewText]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch),
    );
  }, [mappedRows, searchValue]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((value: ReviewListApiSortOption) => {
    setSortValue(value);
    setPage(1);
  }, []);

  const handleFilterChange = useCallback((value: ReviewFilter) => {
    setActiveFilter(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback(
    (nextPage: number) => {
      const lastPage = pagination?.last_page ?? 1;
      setPage(Math.min(Math.max(nextPage, 1), lastPage));
    },
    [pagination?.last_page],
  );

  const handleDeleteRequest = useCallback((row: ReviewRow) => {
    setReviewToDelete(row);
  }, []);

  const handleEditRequest = useCallback((row: ReviewRow) => {
    setReviewSlugToEdit(row.slug);
    setIsEditReviewOpen(true);
  }, []);

  const handleViewDetails = useCallback((row: ReviewRow) => {
    setReviewSlugToView(row.slug);
    setIsViewReviewOpen(true);
  }, []);

  const closeViewModal = useCallback(() => {
    setIsViewReviewOpen(false);
    setReviewSlugToView(null);
  }, []);

  const closeCreateModal = useCallback(() => {
    setIsCreateReviewOpen(false);
  }, []);

  const closeEditModal = useCallback(() => {
    setIsEditReviewOpen(false);
    setReviewSlugToEdit(null);
  }, []);

  const closeDeleteModal = useCallback(() => {
    if (isDeletingReview) {
      return;
    }

    setReviewToDelete(null);
  }, [isDeletingReview]);

  const confirmDeleteReview = useCallback(async () => {
    if (!reviewToDelete) {
      return;
    }

    setIsDeletingReview(true);
    const result = await deleteReviewAPI(reviewToDelete.slug);

    if (result?.ok) {
      toast.success(result?.message);
      setReviewToDelete(null);
      setIsDeletingReview(false);
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
      return;
    }

    toast.error(result?.message);
    setIsDeletingReview(false);
  }, [queryClient, reviewToDelete]);

  return (
    <>
      <ReviewsShell>
        <ReviewsHeader
          title={reviewsWorkspace.title}
          description={reviewsWorkspace.description}
          actionLabel={reviewsWorkspace.primaryActionLabel}
          onActionClick={() => setIsCreateReviewOpen(true)}
        />

        <ReviewsSummaryGrid metrics={reviewSummaryMetrics} />

        <ReviewsModerationPanel controls={reviewModerationControls} />

        <div className="space-y-4">
          <ReviewsFilterTabs
            filters={reviewFilterOptions}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />

          <ReviewsToolbar
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            sortValue={sortValue}
            onSortChange={handleSortChange}
          />

          <ReviewsTable
            rows={visibleRows}
            isLoading={isLoading}
            onEditRequest={handleEditRequest}
            onDeleteRequest={handleDeleteRequest}
            onViewDetails={handleViewDetails}
          />

          {!isLoading && visibleRows.length > 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <ReviewsPagination
                currentPage={pagination?.current_page ?? page}
                lastPage={pagination?.last_page ?? 1}
                onPageChange={handlePageChange}
              />
              <p className="text-sm font-medium text-muted-text">
                Showing {pagination?.from ?? 0}-{pagination?.to ?? 0} of{" "}
                {pagination?.total ?? 0} reviews
                {isFetching ? " ..." : ""}
              </p>
            </div>
          ) : null}
        </div>
      </ReviewsShell>

      <ReviewsDeleteModal
        review={reviewToDelete}
        isLoading={isDeletingReview}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteReview}
      />

      <ViewReviewModal
        open={isViewReviewOpen}
        onClose={closeViewModal}
        reviewSlug={reviewSlugToView ?? ""}
      />

      <CreateReviewModal
        open={isCreateReviewOpen}
        onClose={closeCreateModal}
      />

      <EditReviewModal
        open={isEditReviewOpen}
        onClose={closeEditModal}
        reviewSlug={reviewSlugToEdit ?? ""}
      />
    </>
  );
}

export default Reviews;
