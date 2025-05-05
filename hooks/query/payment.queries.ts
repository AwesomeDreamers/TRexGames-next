import { CreatePayment } from "@/actions/payment.actions";
import { paymentType } from "@/type/payment.type";
import { useMutation } from "@tanstack/react-query";

export function useCreatePayment() {
  const mutation = useMutation({
    mutationFn: async (values: paymentType) => CreatePayment(values),
    mutationKey: ["payment"],
  });
  return mutation;
}
