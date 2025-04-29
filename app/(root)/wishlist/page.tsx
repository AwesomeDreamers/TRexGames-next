import WishlistTable from "@/components/wishlist/wishlist-table";

export const metadata = {
  title: "찜 목록",
};

const WishlistPage = async () => {
  return (
    <main className="container mx-auto">
      <WishlistTable />
    </main>
  );
};

export default WishlistPage;
