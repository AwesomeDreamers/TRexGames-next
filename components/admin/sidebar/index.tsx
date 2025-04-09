"use client";
import { Icon } from "@/components/ui/icon";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import SidebarSkeleton from "./skeleton";

export default function Sidebar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const NAVMENU = [
    {
      title: "Overview",
      icon: Icon.dashboard,
      href: "/admin/overview",
    },
    {
      title: "Products",
      icon: Icon.products,
      href: "/admin/products",
    },
    {
      title: "Orders",
      icon: Icon.order,
      href: "/admin/orders",
    },
    {
      title: "Members",
      icon: Icon.user,
      href: "/admin/members",
    },
  ];

  return (
    <section className="h-full flex flex-col items-center max-w-[325px] bg-[#121216] px-2 overflow-auto scrollbar-hide z-[1200]">
      <Logo />
      {status === "loading" ? (
        <SidebarSkeleton />
      ) : (
        <ul className="w-full">
          <>
            {NAVMENU.map((menu) => (
              <Link href={menu.href} key={menu.title}>
                <li
                  className={`${sidebarMenu} ${
                    pathname === menu.href ? "bg-[#28282c]" : ""
                  }`}
                >
                  <menu.icon className="size-5 mr-5" />
                  {menu.title}
                </li>
              </Link>
            ))}
            <Link href={"/logout"}>
              <li className={`${sidebarMenu}`}>
                <Icon.logout className="size-5 mr-5" />
                로그아웃
              </li>
            </Link>
          </>
        </ul>
      )}
    </section>
  );
}

const sidebarMenu =
  "flex items-center justify-start text-sm leading-10 p-4 cursor-pointer transition-all duration-300 hover:bg-[#28282c] rounded-lg mb-1";
