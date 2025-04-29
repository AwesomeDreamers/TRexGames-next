"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFindCartsAll } from "@/hooks/query/cart.queires";
import { currencyPrice } from "@/lib/utils";
import { CartItemType } from "@/type/cart.type";
import { Icon } from "../ui/icon";
import CartTableRow from "./cart-table-row";

const CartTable = () => {
  const { data, isLoading } = useFindCartsAll();
  const findCartsAll = data?.payload || [];
  const totalPriceAfterDiscount = findCartsAll.reduce(
    (acc: number, cart: CartItemType) => {
      const discountedPrice = parseFloat(
        currencyPrice(cart.price * (cart.quantity || 1), cart.discount).replace(
          /[^0-9.-]+/g,
          ""
        )
      );
      return acc + discountedPrice;
    },
    0
  );

  if (isLoading) return null;

  return (
    <div>
      <h1 className="py-4 text-lg font-bold">장바구니</h1>
      <div className="grid md:grid-cols-4 md:gap-5 h-[calc(100vh-140px)] overflow-y-auto">
        <div className="overflow-x-auto md:col-span-3 h-[calc(100vh-280px)] md:h-[760px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>제품</TableHead>
                <TableHead className="text-center">수량</TableHead>
                <TableHead className="text-right">가격</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {findCartsAll.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    장바구니에 담긴 상품이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                findCartsAll.map((item: CartItemType) => (
                  <CartTableRow key={item.name} item={item} />
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <Card className="h-35 bg-[#121216]">
          <CardContent className="p-4 gap-4">
            <div className="flex justify-between items-center pb-3 text-xl">
              <div className="">금액 ({findCartsAll.length})</div>
              <div className="text-right font-bold">
                {currencyPrice(totalPriceAfterDiscount, 0)}
              </div>
            </div>
            <Button className="w-full">
              <Icon.creditCard className="w-4 h-4" />
              결제
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartTable;
