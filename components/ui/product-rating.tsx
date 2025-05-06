"use client";
import { cn } from "@/lib/utils";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

interface ProductRatingProps {
  value: number;
  readOnly?: boolean;
  className?: string;
  labelHidden?: boolean;
  onChange?: (value: number) => void;
}

export default function ProductRating({
  value,
  onChange,
  className,
  readOnly = false,
  labelHidden = false,
}: ProductRatingProps) {
  const normalizedValue = Math.min(Math.max(value || 0, 0), 5);
  return (
    <div className={className}>
      <label
        className={cn(
          "text-sm text-muted-foreground mb-2",
          labelHidden && "hidden"
        )}
      >
        평점
      </label>
      <Rating value={normalizedValue} onChange={onChange} readOnly={readOnly} />
    </div>
  );
}
