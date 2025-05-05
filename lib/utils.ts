import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyPrice(
  originalPrice: number,
  discountPercentage?: number
) {
  if (discountPercentage === undefined || discountPercentage <= 0) {
    const formattedPrice = originalPrice.toLocaleString("ko-KR", {
      style: "currency",
      currency: "KRW",
    });
    return formattedPrice;
  }
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;

  const formattedPrice = discountedPrice.toLocaleString("ko-KR", {
    style: "currency",
    currency: "KRW",
  });
  return formattedPrice;
}

export function randomCouponCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}
