"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "../ui/icon";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const menuItems = [
  {
    name: "대시보드",
    icon: Icon.adminDashboard,
    href: "/admin/dashboard",
  },
  {
    name: "회원",
    icon: Icon.adminUsers,
    href: "/admin/users",
  },
  {
    name: "상품",
    icon: Icon.adminProducts,
    href: "/admin/products",
  },
  {
    name: "주문",
    icon: Icon.adminOrders,
    href: "/admin/orders",
  },
  {
    name: "쿠폰",
    icon: Icon.adminCoupons,
    href: "/admin/coupons",
  },
  {
    name: "배너",
    icon: Icon.adminBanners,
    href: "/admin/banners",
  },
];

export default function AdminSidebar({ session }: { session: Session | null }) {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-background text-accent-foreground"></SidebarHeader>
      <SidebarContent className="bg-background text-accent-foreground">
        <SidebarGroup>
          <SidebarGroupLabel className="text-accent-foreground">
            어드민 메뉴
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

//   <div className="flex h-16 items-center justify-between px-4">
//     <h1 className={cn("font-semibold", !isOpen && "hidden")}>
//       T-Rex Games Admin
//     </h1>
//     <Button
//       variant={"ghost"}
//       size={"icon"}
//       className="ml-auto"
//       onClick={toggle}
//     >
//       {isOpen ? (
//         <Icon.chevronLeft className="size-4" />
//       ) : (
//         <Icon.chevronRight className="size-4" />
//       )}
//     </Button>
//   </div>
//   <div className="space-y-1 py-4">
//     {menuItems.map((item) => (
//       <div
//         onClick={
//           item.name === "Logout"
//             ? handleLogout
//             : () => router.push(item.href)
//         }
//         key={item.name}
//         className={cn(
//           "flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
//         )}
//       >
//         <item.icon className="size-4" />
//         <span className={cn("ml-3", !isOpen && "hidden")}>{item.name}</span>
//       </div>
//     ))}
//   </div>
