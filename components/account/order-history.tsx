"use client";
import { useFindOrderByUserId } from "@/hooks/query/order.queires";
import { useOpenOrderStore } from "@/hooks/store/order.store";
import { currencyPrice } from "@/lib/utils";
import { OrderType } from "@/type/order.type";
import { format } from "date-fns";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function OrderHistory({ session }: { session: Session | null }) {
  const router = useRouter();
  const { onOpen } = useOpenOrderStore();
  const { data: orderData, isLoading: orderIsLoading } = useFindOrderByUserId();
  const userOrders = orderData?.payload || [];

  console.log("userOrders", userOrders);

  const getStatusColor = (status: "PENDING" | "FAILED" | "SUCCESS") => {
    switch (status) {
      case "PENDING":
        return "bg-blue-500";
      case "SUCCESS":
        return "bg-green-500";
      case "FAILED":
        return "bg-red-500";
    }
  };

  if (orderIsLoading) return null;
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-6">구매 내역</h2>
        <div className="overflow-x-auto">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%] md:w-[70%]">주문명</TableHead>
                <TableHead className="text-center w-[80px] md:w-[120px]">
                  상태
                </TableHead>
                <TableHead className="text-center w-[100px] hidden lg:table-cell">
                  합계
                </TableHead>
                <TableHead className="text-center w-[200px] hidden lg:table-cell">
                  날짜
                </TableHead>
                <TableHead className="text-center w-[85px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    구매 내역이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                userOrders.map((order: OrderType) => (
                  <TableRow key={order.id}>
                    <TableCell className="truncate">
                      {order.orderName}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`${getStatusColor(order.status)} text-white`}
                      >
                        {order.status === "SUCCESS" ? "결제완료" : "결제대기"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right hidden lg:table-cell">
                      {currencyPrice(order.total, 0)}
                    </TableCell>
                    <TableCell className="text-center  hidden lg:table-cell">
                      {format(new Date(order.createdAt), "yyyy-MM-dd")}
                    </TableCell>
                    <TableCell>
                      {order.status === "SUCCESS" ? (
                        <Button
                          type="button"
                          variant={"outline"}
                          size={"sm"}
                          onClick={() => onOpen(order.id)}
                        >
                          상세보기
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant={"default"}
                          size={"sm"}
                          onClick={() =>
                            router.push(
                              `payments?customerKey=${session?.user.id}&orderId=${order.id}&email=${session?.user.email}`
                            )
                          }
                        >
                          결제하기
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <Separator />
        </div>
      </CardContent>
    </Card>
  );
}
