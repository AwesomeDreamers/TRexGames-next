import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyPrice(
  originalPrice: number,
  discountPercentage: number
) {
  if (discountPercentage <= 0) {
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
