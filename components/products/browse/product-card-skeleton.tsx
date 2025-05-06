import { Skeleton } from "@/components/ui/skeleton"; // shadcn/ui의 Skeleton 가져오기

// ProductCard랑 똑같이 props는 안 받아도 돼. 그냥 정적인 모양이니까!
export default function ProductCardSkeleton() {
  return (
    <div className=" max-w-3xs md:max-w-3xs rounded relative w-full">
      <div className="relative w-full h-[42vh] md:h-[35vh] group">
        <Skeleton className="w-full h-full rounded-xl" />
        <div className="absolute bottom-0 bg-black/40 w-full flex justify-between items-center gap-1 py-2 px-1">
          <Skeleton className="h-4 w-3/4 rounded-sm" />
          <Skeleton className="h-5 w-10 rounded-sm" />
        </div>
      </div>
      <div className="py-1 flex flex-col gap-1">
        <div className="flex gap-4 items-center justify-between py-2">
          <div className="flex flex-row gap-2 items-center">
            <Skeleton className="h-4 w-16 rounded-sm" />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="size-4 rounded-sm" />
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="size-4 rounded-sm" />
          </div>
        </div>
        <div className="flex items-center w-full gap-2">
          <div className="relative">
            <Skeleton className="size-9 rounded-md" />
          </div>
          <div className="flex-1">
            <Skeleton className="w-full h-9 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
