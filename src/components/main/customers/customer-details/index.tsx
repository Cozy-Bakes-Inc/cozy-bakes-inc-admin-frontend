"use client";

import type { CustomerDetailsData } from "@/interfaces/main/customers";
import { useSingleCustomer } from "@/hooks/api";
import Modal from "@/components/ui/modal";
import { CustomerDetailsContent } from "./customer-details-content";
import { CustomerDetailsHeader } from "./customer-details-header";
import { CustomerDetailsShimmer } from "./customer-details-shimmer";

interface CustomerDetailsProps {
  open: boolean;
  slug: string | null;
  onClose: () => void;
  customer?: CustomerDetailsData;
}

export default function CustomerDetails({
  open,
  slug,
  onClose,
  customer,
}: CustomerDetailsProps) {
  const { data, isLoading } = useSingleCustomer(slug ?? "");
  const customerDetails = customer ?? data?.data;
  console.log("CustomerDetails data:", data);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={<CustomerDetailsHeader />}
      contentClassName="md:max-w-5xl gap-6 overflow-hidden rounded-[24px] border border-border/15 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-border/10"
      titleClassName="px-6 pb-6 pt-8 md:px-8"
    >
      {isLoading || !customerDetails ? (
        <CustomerDetailsShimmer />
      ) : (
        <CustomerDetailsContent customer={customerDetails} />
      )}
    </Modal>
  );
}
