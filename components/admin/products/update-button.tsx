import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "../product-form";

export default function UpdateButton({
  categoryList,
  platformList,
  product,
}: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="cursor-pointer">
          수정
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center overflow-y-scroll max-h-[80vh] w-full z-[1200]">
        <DialogHeader>
          <DialogTitle>상품 수정</DialogTitle>
        </DialogHeader>
        <div>
          <ProductForm
            categoryList={categoryList}
            platformList={platformList}
            product={product}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
