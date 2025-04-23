"use client";

import { AddCouponSheet } from "@/components/admin/coupons/add/add-coupon-sheet";
import { AddProductSheet } from "@/components/admin/products/add/add-product-sheet";
import { EditProductSheet } from "@/components/admin/products/add/edit-product-sheet";
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
    </>
  );
}
