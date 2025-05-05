import {
  CreateOrder,
  findOrderByOrderId,
  findOrderByUserId,
  findOrdersAllForAdmin,
} from "@/actions/order.actions";
import { createOrderType } from "@/type/order.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export async function useCreateOrder() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: createOrderType) => CreateOrder(values),
    mutationKey: ["order"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });
  return mutation;
}

export function useFindOrderByOrderId(orderId?: string) {
  const query = useQuery({
    enabled: !!orderId,
    queryFn: async () => findOrderByOrderId(orderId),
    queryKey: ["order"],
  });
  return query;
}

export function useFindOrderByUserId() {
  const query = useQuery({
    queryFn: findOrderByUserId,
    queryKey: ["orders"],
  });
  return query;
}

export function useFindOrdersAllForAdmin() {
  const query = useQuery({
    queryFn: findOrdersAllForAdmin,
    queryKey: ["orders"],
  });
  return query;
}
