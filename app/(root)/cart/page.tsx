import CartTable from "@/components/cart/cart-table";

export const metadata = {
  title: "장바구니",
};

const CartPage = async () => {
  return (
    <main className="container mx-auto">
      <CartTable />
    </main>
  );
};

export default CartPage;
