"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useAddBannerStore } from "@/hooks/store/banner.store";
import { useAddCouponStore } from "@/hooks/store/coupon.store";
import { useAddProductStore } from "@/hooks/store/product.store";

export default function AddButton({
  label,
  action,
}: {
  label: string;
  action: string;
}) {
  const { onOpen: bannerOpen } = useAddBannerStore();
  const { onOpen: productOpen } = useAddProductStore();
  const { onOpen: couponOpen } = useAddCouponStore();

  const actionMap: { [key: string]: () => void } = {
    productOpen: productOpen,
    bannerOpen: bannerOpen,
    couponOpen: couponOpen,
  };

  const handleClick = actionMap[action];

  return (
    <Button
      className="cursor-pointer w-full lg:w-auto"
      size={"sm"}
      onClick={handleClick}
    >
      <Icon.adminAddProduct className="size-4" />
      {label}
    </Button>
  );
}
