"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOpenFilterStore } from "@/hooks/store/product.store";
import FilterSection from "./filter-section";

export default function FilterDialog() {
  const { isOpen, onClose } = useOpenFilterStore();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-h-[800px] overflow-auto max-w-[400px]">
        <DialogHeader>
          <DialogTitle>필터</DialogTitle>
        </DialogHeader>
        <FilterSection />
      </DialogContent>
    </Dialog>
  );
}
