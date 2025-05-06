"use client";

import OrderDetailDialog from "@/components/account/order-detail-dialog";
import { AddBannerSheet } from "@/components/admin/banners/add/add-banner-sheet";
import { AddCouponSheet } from "@/components/admin/coupons/add/add-coupon-sheet";
import { AddProductSheet } from "@/components/admin/products/add/add-product-sheet";
import { EditProductSheet } from "@/components/admin/products/add/edit-product-sheet";
import FilterDialog from "@/components/products/browse/filter-dialog";
import { AddReviewSheet } from "@/components/review/add-review-sheet";
import { EditReviewSheet } from "@/components/review/edit-review-sheet";
import { CartSheet } from "@/components/shared/header/cart-sheet";
import { MenuSheet } from "@/components/shared/header/menu-sheet";
import { useEffect, useState } from "react";

export default function SheetProvider() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <>
      <EditProductSheet />
      <AddProductSheet />
      <AddCouponSheet />
      <AddBannerSheet />
      <MenuSheet />
      <CartSheet />
      <FilterDialog />
      <OrderDetailDialog />
      <AddReviewSheet />
      <EditReviewSheet />
    </>
  );
}
