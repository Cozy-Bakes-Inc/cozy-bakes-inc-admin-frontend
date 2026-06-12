import {
  listOrdersAPI,
  orderStatusCountAPI,
  singleOrderAPI,
} from "@/services/queries/orders";
import { useCustomInfiniteQuery, useCustomQuery } from "../useCustomQuery";
import { OrderSort } from "@/types/main/orders";

export function useOrders(page: number, sort?: OrderSort) {
  return useCustomQuery(["orders", page, sort], () =>
    listOrdersAPI(page, sort),
  );
}

export function useInfiniteOrders(sort?: OrderSort) {
  return useCustomInfiniteQuery(
    ["orders", sort],
    async ({ pageParam = 1 }) => {
      return listOrdersAPI(pageParam, sort);
    },
    {
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const pagination = lastPage?.data;
        if (!pagination) return undefined;
        if (
          pagination.next_page_url &&
          pagination.current_page < pagination.last_page
        ) {
          return pagination.current_page + 1;
        }
        return undefined;
      },
    },
  );
}

export function useSingleOrder(orderNo: string, enabled = true) {
  return useCustomQuery(
    ["single-order", orderNo],
    () => singleOrderAPI(orderNo),
    { enabled: enabled && Boolean(orderNo) },
  );
}

export function useOrderStatusCount() {
  return useCustomQuery(["order-status-count"], orderStatusCountAPI);
}
