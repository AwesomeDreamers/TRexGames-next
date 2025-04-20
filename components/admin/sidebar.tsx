"use client";

import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const menuItems = [
  {
    name: "Products",
    icon: Icon.adminProducts,
    href: "/admin/products",
  },
  {
    name: "Add Product",
    icon: Icon.adminAddProduct,
    href: "/admin/products/add",
  },
  {
    name: "Orders",
    icon: Icon.adminOrders,
    href: "/admin/orders",
  },
  {
    name: "Add Coupon",
    icon: Icon.adminAddCoupon,
    href: "/admin/coupons/add",
  },
  {
    name: "Settings",
    icon: Icon.adminSettings,
    href: "/admin/settings",
  },
  {
    name: "Logout",
    icon: Icon.adminLogout,
    href: "",
  },
];

export default function AdminSidebar({ isOpen, toggle }: SidebarProps) {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }
  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-background transition-all duration-300",
        isOpen ? "w-64" : "w-16",
        "border-r"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <h1 className={cn("font-semibold", !isOpen && "hidden")}>
          T-Rex Games Admin
        </h1>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="ml-auto"
          onClick={toggle}
        >
          {isOpen ? (
            <Icon.chevronLeft className="size-4" />
          ) : (
            <Icon.chevronRight className="size-4" />
          )}
        </Button>
      </div>
      <div className="space-y-1 py-4">
        {menuItems.map((item) => (
          <div
            onClick={
              item.name === "Logout"
                ? handleLogout
                : () => router.push(item.href)
            }
            key={item.name}
            className={cn(
              "flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="size-4" />
            <span className={cn("ml-3", !isOpen && "hidden")}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
