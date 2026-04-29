"use client";

import { useEffect, useRef, useState } from "react";
import { Edit3, Eye, MoreVertical, Trash2 } from "lucide-react";
import type { ReviewsTableProps } from "@/interfaces/main/reviews";
import { Button } from "@/components/ui/button";
import { Shimmer } from "@/components/ui/shimmer";
import { ReviewsRatingBadge } from "./reviews-rating-badge";
import { ReviewsStatusBadge } from "./reviews-status-badge";

export function ReviewsTable({
  rows,
  isLoading,
  onEditRequest,
  onDeleteRequest,
  onViewDetails,
}: ReviewsTableProps) {
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setOpenActionId(null);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const renderEmptyState = () => (
    <tr className="bg-[color-mix(in_srgb,var(--color-bg-creamy)_22%,white)]">
      <td
        colSpan={6}
        className="border-b border-primary/10 px-4 py-16 text-center"
      >
        <div className="mx-auto max-w-md">
          <p className="text-lg font-semibold text-dark">No reviews found</p>
          <p className="mt-2 text-sm font-medium text-gray">
            There are no reviews matching the current filters or search.
          </p>
        </div>
      </td>
    </tr>
  );

  const renderLoadingRows = () =>
    Array.from({ length: 6 }).map((_, index) => (
      <tr
        key={index}
        className="bg-[color-mix(in_srgb,var(--color-bg-creamy)_22%,white)]"
      >
        <td className="border-b border-primary/10 px-4 py-4 align-top">
          <Shimmer className="h-5 w-36 rounded-md" />
        </td>
        <td className="border-b border-primary/10 px-4 py-4 align-top">
          <Shimmer className="h-11 w-20 rounded-[10px]" />
        </td>
        <td className="border-b border-primary/10 px-4 py-4 align-top">
          <Shimmer className="h-5 w-full rounded-md" />
        </td>
        <td className="border-b border-primary/10 px-4 py-4 align-top">
          <Shimmer className="h-5 w-24 rounded-md" />
        </td>
        <td className="border-b border-primary/10 px-4 py-4 align-top">
          <Shimmer className="h-5 w-32 rounded-full" />
        </td>
        <td className="border-b border-primary/10 px-4 py-4 align-top">
          <div className="flex items-center gap-2">
            <Shimmer className="h-10 w-10 rounded-[10px]" />
            <Shimmer className="h-10 w-10 rounded-[10px]" />
          </div>
        </td>
      </tr>
    ));

  const handleViewClick = (row: (typeof rows)[number]) => {
    setOpenActionId(null);
    onViewDetails(row);
  };

  const handleEditClick = (row: (typeof rows)[number]) => {
    setOpenActionId(null);
    onEditRequest(row);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border/25 bg-background shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-separate border-spacing-0">
          <thead>
            <tr className="bg-bg-creamy">
              <th className="px-4 py-4 text-left text-base font-semibold text-dark">
                Customer Name
              </th>
              <th className="px-4 py-4 text-left text-base font-semibold text-dark">
                Rating
              </th>
              <th className="px-4 py-4 text-left text-base font-semibold text-dark">
                Review Text
              </th>
              <th className="px-4 py-4 text-left text-base font-semibold text-dark">
                Date
              </th>
              <th className="px-4 py-4 text-left text-base font-semibold text-dark">
                Status
              </th>
              <th className="px-4 py-4 text-left text-base font-semibold text-dark">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading
              ? renderLoadingRows()
              : rows.length === 0
                ? renderEmptyState()
                : rows.map((row) => (
                    <tr
                      key={row.id}
                      className="bg-[color-mix(in_srgb,var(--color-bg-creamy)_22%,white)]"
                    >
                      <td className="border-b border-primary/10 px-4 py-4 align-top">
                        <div>
                          <p className="text-[15px] font-semibold text-dark">
                            {row.name}
                          </p>
                          <p className="mt-1 text-xs font-medium text-gray">
                            {row.email}
                          </p>
                        </div>
                      </td>
                      <td className="border-b border-primary/10 px-4 py-4 align-top">
                        <ReviewsRatingBadge rating={row.rating} />
                      </td>
                      <td className="max-w-[320px] border-b border-primary/10 px-4 py-4 align-top text-xs leading-[1.35rem] font-medium text-muted-text">
                        <p className="line-clamp-2">{row.reviewText}</p>
                      </td>
                      <td className="border-b border-primary/10 px-4 py-4 align-top text-[15px] font-medium text-dark">
                        {row.date}
                      </td>
                      <td className="border-b border-primary/10 px-4 py-4 align-top">
                        <ReviewsStatusBadge status={row.status} />
                      </td>
                      <td className="border-b border-primary/10 px-4 py-4 align-top">
                        <div className="flex items-center gap-2">
                          <div
                            className="relative"
                            ref={openActionId === row.id ? actionMenuRef : null}
                          >
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="inline-flex size-10 items-center justify-center rounded-[10px] bg-info-soft text-info"
                              aria-label={`More actions for ${row.name}`}
                              onClick={() =>
                                setOpenActionId((current) =>
                                  current === row.id ? null : row.id,
                                )
                              }
                            >
                              <MoreVertical
                                className="size-4"
                                strokeWidth={2.2}
                              />
                            </Button>

                            {openActionId === row.id ? (
                              <div className="absolute right-0 z-20 mt-2 min-w-36 overflow-hidden rounded-xl border border-primary/10 bg-white p-1 shadow-[0_18px_40px_rgba(61,44,30,0.14)]">
                                <button
                                  type="button"
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-dark transition-colors hover:bg-primary/5"
                                  onClick={() => handleEditClick(row)}
                                >
                                  <Edit3 className="size-4" strokeWidth={2} />
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#f04438] transition-colors hover:bg-[#fff5f4]"
                                  onClick={() => {
                                    setOpenActionId(null);
                                    onDeleteRequest(row);
                                  }}
                                >
                                  <Trash2 className="size-4" strokeWidth={2} />
                                  Delete
                                </button>
                              </div>
                            ) : null}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="inline-flex size-10 items-center justify-center rounded-[10px] bg-primary text-white"
                            aria-label={`View ${row.name}`}
                            onClick={() => handleViewClick(row)}
                          >
                            <Eye className="size-4" strokeWidth={2.2} />
                          </Button>
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
