"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { useMenuStore } from "@/hooks/store/user.store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const { isMenuOpen, onMenuClose } = useMenuStore();
  const router = useRouter();
  return (
    <div className="relative bg-muted rounded-full flex items-center pl-2 pr-8">
      <Input
        type="text"
        placeholder="검색어를 입력하세요"
        className="border-none focus-visible:ring-0"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            isMenuOpen && onMenuClose();
            router.push(`/browse?name=${search}`);
          }
        }}
      />
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => {
          isMenuOpen && onMenuClose();
          router.push(`/browse?name=${search}`);
        }}
        className="absolute right-1 top-0 h-full hover:bg-transparent"
      >
        <Icon.search className="size-5" />
      </Button>
    </div>
  );
}
