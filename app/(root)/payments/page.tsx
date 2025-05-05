import { findOrderByOrderId } from "@/actions/order.actions";
import { auth } from "@/auth";
import Payments from "@/components/payments/payments";
import { OrderType } from "@/type/order.type";

interface Props {
  searchParams: {
    orderId: string;
    customerKey: string;
    email: string;
  };
}

export default async function PaymentsPage({ searchParams }: Props) {
  const { orderId } = searchParams;
  const session = await auth();
  const data = await findOrderByOrderId(orderId);
  const order: OrderType = data.payload;
  return <Payments order={order} session={session} />;
}
