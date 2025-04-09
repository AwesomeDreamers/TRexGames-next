import ProductForm from "@/components/admin/product-form";
import { category, platform } from "@/lib/constants";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "상품 등록",
};

const CreateProductPage = async () => {
  return (
    <>
      <h2 className="h2-bold">Create Product</h2>
      <div className="my-8 mx-auto w-[1280px]">
        <ProductForm categoryList={category} platformList={platform} />
      </div>
    </>
  );
};

export default CreateProductPage;
