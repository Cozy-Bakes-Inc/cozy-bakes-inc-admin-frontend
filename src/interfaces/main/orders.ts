import type { ReactNode } from "react";
import type {
  ApiOrderStatus,
  OrderFilterValue,
  OrderPaymentMethod,
  OrderPaymentStatus,
  OrderStatus,
  OrderViewMode,
} from "@/types/main/orders";

export interface OrderRecord {
  id: string;
  customer: string;
  phone: string;
  items: number;
  details: string;
  total: string;
  status: OrderStatus;
  date: string;
  time: string;
}

export interface OrderFilterOption {
  label: string;
  value: OrderFilterValue;
  count: number;
}

export interface OrdersHeaderProps {
  title: string;
  description: string;
}

export interface OrdersFilterTabsProps {
  filters: OrderFilterOption[];
  activeFilter: OrderFilterValue;
  onFilterChange: (value: OrderFilterValue) => void;
}

export interface OrdersToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  viewMode: OrderViewMode;
  onViewModeChange: (value: OrderViewMode) => void;
}

export interface OrdersStatusBadgeProps {
  status: OrderStatus;
  onChangeRequest: (status: OrderStatus) => void;
  disabled?: boolean;
}

export interface PendingOrderStatusUpdate {
  orderId: string;
  customer: string;
  nextStatus: OrderStatus;
}

export interface OrdersTableProps {
  orders: OrderRecord[];
  onStatusChangeRequest: (order: OrderRecord, status: OrderStatus) => void;
  onViewDetails: (order: OrderRecord) => void;
}

export interface OrdersCardGridProps {
  orders: OrderRecord[];
  onStatusChangeRequest: (order: OrderRecord, status: OrderStatus) => void;
  onViewDetails: (order: OrderRecord) => void;
}

export interface OrdersPaginationProps {
  pages: number[];
  currentPage: number;
}

export interface OrdersViewToggleOption {
  value: OrderViewMode;
  label: string;
  icon: ReactNode;
}

export interface OrdersEmptyStateProps {
  hasSearch: boolean;
  hasFilteredStatus: boolean;
  viewMode: OrderViewMode;
  onResetFilters: () => void;
  onClearSearch: () => void;
}

export interface OrdersPaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface OrderListItem {
  id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string | null;
  customer_email: string;
  total_quantity: string;
  subtotal: string;
  delivery_fee: string;
  total_amount: string;
  status: ApiOrderStatus;
  payment_status: OrderPaymentStatus;
  payment_method: OrderPaymentMethod;
  created_at: string;
}

export interface OrdersPaginationData {
  current_page: number;
  data: OrderListItem[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: OrdersPaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface OrdersApiResponse {
  status: string;
  message: string;
  data: OrdersPaginationData;
}

export interface OrderStatusCountData {
  pending: string;
  processed: string;
  packed: string;
  shipped: string;
  completed: string;
  cancelled: string;
  total_orders: number;
}

export interface OrderStatusCountApiResponse {
  status: string;
  message: string;
  data: OrderStatusCountData;
}

export interface OrderCustomerDetails {
  name: string;
  email: string;
  phone: string | null;
}

export interface OrderPricingDetails {
  subtotal: string;
  delivery_fee: string;
  total_amount: string;
  total_quantity: string;
}

export interface OrderShippingShop {
  id: number;
  name: string;
  address?: string | null;
}

export interface OrderShippingDetails {
  fulfillment_type: string;
  address_line: string | null;
  note: string | null;
  shop: OrderShippingShop | null;
}

export interface OrderItemImage {
  id?: number;
  url?: string;
  path?: string;
  alt?: string | null;
}

export interface OrderItemPriceSnapshot {
  type: string;
  label: string;
  pack_quantity: string | number | null;
  unit_price: string;
}

export interface OrderItemFlavor {
  name: string;
  qty: number;
}

export interface SingleOrderItem {
  product_id: string | number;
  product_name: string;
  quantity: string | number;
  price: string;
  price_snapshot: OrderItemPriceSnapshot | null;
  flavors: { flavors: OrderItemFlavor[] } | null;
  subtotal: string | number | null;
  images: string[] | OrderItemImage[];
}

export interface SingleOrderData {
  id: number;
  order_number: string;
  customer: OrderCustomerDetails;
  pricing: OrderPricingDetails;
  order_status: ApiOrderStatus;
  payment_status: OrderPaymentStatus;
  payment_method: OrderPaymentMethod;
  cod_payment_method: string | null;
  payment_intent_id: string | null;
  refund_id: string | null;
  shipping: OrderShippingDetails;
  items: SingleOrderItem[];
  created_at: string;
  updated_at: string;
}

export interface SingleOrderApiResponse {
  status: string;
  message: string;
  data: SingleOrderData;
}
