// import { getAllProducts, deleteProduct } from '@/lib/actions/product.actions';
// import { formatCurrency, formatId } from '@/lib/utils';
import CreateButton from "@/components/admin/products/create-button";
import UpdateButton from "@/components/admin/products/update-button";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { platform, product } from "@/lib/constants";
// import { getAllCategories } from "@/lib/actions/category.actions";
// import { getAllPlatforms } from "@/lib/actions/platform.actions";
// import { getAllProducts } from "@/lib/actions/product.actions";
import { currencyPrice } from "@/lib/utils";
// import Pagination from '@/components/shared/pagination';
// import DeleteDialog from '@/components/shared/delete-dialog';
// import { requireAdmin } from '@/lib/auth-guard';

const AdminProductsPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
}) => {
  // await requireAdmin();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";
  const category = searchParams.category || "";

  const categoryList = category;
  const platformList = platform;

  return (
    <div className="space-y-2">
      <h1 className="h2-bold text-2xl">Products</h1>
      <CreateButton categoryList={categoryList} platformList={platformList} />

      <Table className="mt-3">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">상품 이름</TableHead>
            <TableHead className="text-center hidden lg:table-cell">
              카테고리
            </TableHead>
            <TableHead className="text-center">가격</TableHead>
            <TableHead className="text-center hidden lg:table-cell">
              할인율
            </TableHead>
            <TableHead className="w-[100px] text-center">액션</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableHead className="text-center">{product.title}</TableHead>
            <TableHead className="text-center hidden lg:table-cell">
              {product.category.category}
            </TableHead>
            <TableHead className="text-center">
              {currencyPrice(product.price, product.discount)}
            </TableHead>
            <TableHead className="text-center hidden lg:table-cell">
              -{product.discount}%
            </TableHead>
            <TableHead className="grid grid-cols-2 place-items-center gap-2">
              <UpdateButton
                categoryList={categoryList}
                platformList={platformList}
                product={product}
              />
              <Button
                variant={"ghost"}
                size={"icon"}
                className="cursor-pointer"
              >
                삭제
              </Button>
            </TableHead>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminProductsPage;
