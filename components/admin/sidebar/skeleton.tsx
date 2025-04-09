import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarSkeleton() {
  return (
    <ul className="w-full mt-[13]">
      <div>
        <li className={`${sidebarMenu}`}>
          <Skeleton className="size-5 mr-5" />
          <Skeleton className="h-5 w-20" />
        </li>
      </div>
      <div>
        <li className={`${sidebarMenu}`}>
          <Skeleton className="size-5 mr-5" />
          <Skeleton className="h-5 w-20" />
        </li>
      </div>
      <div>
        <li className={`${sidebarMenu}`}>
          <Skeleton className="size-5 mr-5" />
          <Skeleton className="h-5 w-20" />
        </li>
      </div>
      <div>
        <li className={`${sidebarMenu}`}>
          <Skeleton className="size-5 mr-5" />
          <Skeleton className="h-5 w-20" />
        </li>
      </div>
      <div>
        <li className={`${sidebarMenu}`}>
          <Skeleton className="size-5 mr-5" />
          <Skeleton className="h-5 w-20" />
        </li>
      </div>
    </ul>
  );
}

const sidebarMenu =
  "flex items-center justify-start text-sm leading-10 p-4 rounded-lg mb-1";
