"use client";

import Image from "next/image";
import {
  CalendarDays,
  Eye,
  Link as LinkIcon,
  MapPin,
  PencilLine,
} from "lucide-react";
import { useState } from "react";
import type {
  FindUsHereActionButtonProps,
  FindUsHereMarketCardProps,
} from "@/interfaces/main/find-us-here";
import { Button } from "@/components/ui/button";
import DeleteMarketLocation from "./delete-market-location";
import EditMarketLocation from "./edit-market-location";
import ViewMarketLocation from "./view-market-location";

function FindUsHereActionButton({
  children,
  variant = "primary",
  buttonProps,
}: FindUsHereActionButtonProps) {
  const variantClassName =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary/90"
      : variant === "danger"
        ? "bg-danger-soft text-danger hover:bg-danger-soft/80"
        : "border border-primary/15 bg-[#fbf8eb80] text-primary hover:bg-[#fbf8eb]";

  return (
    <Button
      type="button"
      variant="ghost"
      className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors ${variantClassName}`}
      {...buttonProps}
    >
      {children}
    </Button>
  );
}

export function FindUsHereMarketCard({ location }: FindUsHereMarketCardProps) {
  const [isViewMarketLocationOpen, setIsViewMarketLocationOpen] =
    useState(false);
  const [isEditMarketLocationOpen, setIsEditMarketLocationOpen] =
    useState(false);

  return (
    <>
      <article className="overflow-hidden rounded-2xl bg-background shadow-[0_1px_2px_rgba(16,24,40,0.05),0_0_0_4px_rgba(209,150,40,0.05)]">
        <div className="grid lg:grid-cols-[1.02fr_1fr]">
          <div className="relative h-full min-h-72">
            {location.imageSrc ? (
              <Image
                src={location.imageSrc}
                alt={location.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            ) : (
              <div className="flex h-full min-h-72 items-center justify-center bg-[linear-gradient(135deg,#fbf8eb_0%,#f3ead1_100%)] p-6 text-center">
                <div>
                  <p className="text-lg font-semibold text-primary">
                    No cover image
                  </p>
                  <p className="mt-2 text-sm font-medium text-muted-text">
                    Add a market image to preview this location here.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center gap-6 p-6 md:p-8">
            <div className="space-y-4">
              <span className="inline-flex h-8 items-center rounded-full bg-market-tag px-4 text-sm font-medium text-market-tag-foreground">
                {location.badge}
              </span>

              <div className="space-y-4">
                <h2 className="text-[28px] font-semibold leading-8 tracking-[-0.02em] text-dark">
                  {location.title}
                </h2>

                <div className="rounded-2xl border border-market-outline bg-[#fbf8eb26] px-4 py-3">
                  <p className="text-xs font-semibold italic leading-5 text-primary">
                    {location.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm font-semibold text-muted-text">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" strokeWidth={2} />
                <span>{location.schedule}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" strokeWidth={2} />
                <span>{location.address}</span>
              </div>
              {location.mapLink && (
                <div className="flex items-center gap-2">
                  <LinkIcon className="size-4 text-primary" strokeWidth={2} />
                  <a
                    href={location.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    View on Map
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <FindUsHereActionButton
                buttonProps={{
                  onClick: () => setIsEditMarketLocationOpen(true),
                }}
              >
                <PencilLine className="size-4" strokeWidth={2} />
                Edit Market Details
              </FindUsHereActionButton>

              <FindUsHereActionButton
                variant="secondary"
                buttonProps={{
                  onClick: () => setIsViewMarketLocationOpen(true),
                }}
              >
                <Eye className="size-4" strokeWidth={2} />
                Preview Market Details
              </FindUsHereActionButton>

              <DeleteMarketLocation
                marketSlug={location.id}
                marketName={location.title}
                marketAddress={location.address}
                marketSchedule={location.schedule}
              />
            </div>
          </div>
        </div>
      </article>

      <ViewMarketLocation
        open={isViewMarketLocationOpen}
        onClose={() => setIsViewMarketLocationOpen(false)}
        marketSlug={location.id}
      />

      <EditMarketLocation
        open={isEditMarketLocationOpen}
        onClose={() => setIsEditMarketLocationOpen(false)}
        marketSlug={location.id}
      />
    </>
  );
}
