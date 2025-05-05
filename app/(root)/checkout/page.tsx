import { auth } from "@/auth";
import Checkout from "@/components/checkout/checkout";
export default async function CheckoutPage() {
  const session = await auth();
  return <Checkout session={session} />;
}
