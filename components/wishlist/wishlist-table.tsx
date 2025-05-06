"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFindWishlistAll } from "@/hooks/query/wishlist.queries";
import { WishlistType } from "@/type/wishlist.type";
import WishlistTableRow from "./wishlist-table-row";

const WishlistTable = () => {
  const { data, isLoading } = useFindWishlistAll();
  const findWishlistsAll = data?.payload || [];
  console.log("findWishlistsAll", findWishlistsAll);

  if (isLoading) return null;

  const item = findWishlistsAll.map((items: WishlistType) => items.productId);
  return (
    <div>
      <h1 className="py-4 text-lg font-bold">찜 목록</h1>
      <div className="grid md:grid-cols-4 md:gap-5 h-[calc(100vh-140px)] overflow-y-auto">
        <div className="overflow-x-auto md:col-span-4 h-[calc(100vh-280px)] md:h-[760px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>상품</TableHead>
                <TableHead className="text-right hidden md:table-cell">
                  카테고리
                </TableHead>
                <TableHead className="text-right hidden md:table-cell">
                  가격
                </TableHead>
                <TableHead className="text-right hidden md:table-cell">
                  평점
                </TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {findWishlistsAll.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    장바구니에 담긴 상품이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                findWishlistsAll.map((item: WishlistType) => (
                  <WishlistTableRow key={item.id} item={item} />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default WishlistTable;
