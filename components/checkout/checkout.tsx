"use client";
import { useFindCartsAll } from "@/hooks/query/cart.queires";
import { useFindCouponsAll } from "@/hooks/query/coupon.queries";
import { useCreateOrder } from "@/hooks/query/order.queires";
import { currencyPrice } from "@/lib/utils";
import { CartItemType } from "@/type/cart.type";
import { CouponType } from "@/type/coupon.type";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export default function Checkout({ session }: { session: Session | null }) {
  const [couponCode, setCouponCode] = useState<string>("");
  const [applyCoupon, setApplyCoupon] = useState<CouponType | null>(null);
  const [couponError, setCouponError] = useState<string>("");
  const createOrder = useCreateOrder();
  const router = useRouter();
  const { data: cartData, isLoading: cartIsLoading } = useFindCartsAll();
  const { data: couponData, isLoading: couponIsLoading } = useFindCouponsAll();
  const findCartsAll: CartItemType[] = cartData?.payload || [];
  const findCouponsAll: CouponType[] = couponData?.payload || [];
  if (cartIsLoading || couponIsLoading) null;

  const subTotal = findCartsAll.reduce(
    (acc: number, cart: CartItemType) =>
      acc + cart.price * (cart.quantity || 1) * (1 - cart.discount / 100),
    0
  );
  const discountAmount = applyCoupon
    ? (subTotal * Number(applyCoupon.discount)) / 100
    : 0;

  const total = subTotal - discountAmount;
  function handleApplyCoupon() {
    const getCurrentCoupon = findCouponsAll.find(
      (coupon) => coupon.code === couponCode
    );
    if (!getCurrentCoupon) {
      setCouponError("유효하지 않은 쿠폰입니다.");
      toast.error("유효하지 않은 쿠폰입니다.");
      setApplyCoupon(null);
      return;
    }

    const now = new Date();
    if (
      now < new Date(getCurrentCoupon.startDate) ||
      now > new Date(getCurrentCoupon.endDate)
    ) {
      setCouponError("쿠폰 사용 기간이 아니거나 만료되었습니다.");
      toast.error("쿠폰 사용 기간이 아니거나 만료되었습니다.");
      setApplyCoupon(null);
      return;
    }

    if (Number(getCurrentCoupon.usageLimit) <= getCurrentCoupon.usageCount) {
      setCouponError(
        "쿠폰 사용 한도가 초과되었습니다. 다른 쿠폰을 사용해주세요."
      );
      toast.error("쿠폰 사용 한도가 초과되었습니다. 다른 쿠폰을 사용해주세요.");
      setApplyCoupon(null);
      return;
    }
    setApplyCoupon(getCurrentCoupon);
    toast.success("쿠폰이 적용되었습니다.");
    setCouponError("");
  }
  async function handleOrderSubmit(
    items: CartItemType[],
    total: number,
    couponId?: string
  ) {
    const values = {
      items,
      total,
      couponId,
    };

    const name =
      items.length > 1
        ? `${items[0].name}외 ${items.length - 1}건`
        : items[0].name;

    (await createOrder).mutate(
      {
        ...values,
        orderName: name,
      },
      {
        onSuccess: (data) => {
          toast.success("주문이 완료되었습니다.");
          router.replace(
            `/payments?customerKey=${data.payload.userId}&orderId=${data.payload.id}&email=${session?.user.email}`
          );
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "주문에 실패했습니다.");
        },
      }
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6  mt-5">
              <div>
                <h3 className="text-xl  font-semibold mb-4">결제</h3>
                <div className="gap-2 flex items-center">
                  <Input
                    type="email"
                    readOnly
                    className="w-full"
                    value={session?.user.email}
                  />
                  <Button
                    variant={"default"}
                    onClick={() =>
                      handleOrderSubmit(findCartsAll, total, applyCoupon?.id)
                    }
                  >
                    결제하기
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1 mt-5">
            <Card className="p-6 sticky top-8">
              <h2>주문 정보</h2>
              <div className="space-y-4 max-h-[800px] overflow-y-auto">
                {findCartsAll.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative w-20 h-28 rounded-md overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3>{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.category.name} / {item.platform.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        수량: {item.quantity}
                      </p>
                    </div>
                    <p>{currencyPrice(item.price, item.discount)}</p>
                  </div>
                ))}
                <Separator />
                <div className="space-y-2">
                  {!applyCoupon && (
                    <>
                      <Input
                        placeholder="쿠폰 코드를 입력하세요."
                        value={couponCode}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setCouponCode(e.target.value)
                        }
                      />
                      <Button
                        variant={"outline"}
                        className="w-full"
                        onClick={handleApplyCoupon}
                      >
                        쿠폰 적용
                      </Button>
                    </>
                  )}
                  {couponError && (
                    <p className="text-sm text-red-600">{couponError}</p>
                  )}

                  {applyCoupon && (
                    <p className="text-sm text-green-600">
                      쿠폰이 적용되었습니다!
                    </p>
                  )}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>소계</span>
                    <span>{currencyPrice(subTotal, 0)}</span>
                  </div>
                  {applyCoupon && (
                    <div className="flex justify-between text-green-500">
                      <span>쿠폰할인 {applyCoupon.discount}%</span>
                      <span>- {currencyPrice(discountAmount, 0)}</span>
                    </div>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>합계</span>
                  <span>{currencyPrice(total, 0)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
