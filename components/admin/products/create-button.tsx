import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "../product-form";

export default function CreateButton({ categoryList, platformList }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer float-right">상품 등록</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center overflow-y-scroll max-h-[80vh] w-full z-[1200]">
        <DialogHeader>
          <DialogTitle>상품 등록</DialogTitle>
        </DialogHeader>
        <div>
          <ProductForm
            categoryList={categoryList}
            platformList={platformList}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
