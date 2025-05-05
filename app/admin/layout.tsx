"use client";
import AdminSidebar from "@/components/admin/sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div
        className={cn(
          "transition-all duration-300",
          isSidebarOpen ? "md:ml-64 ml-0" : "md:ml-16 ml-0",
          "min-h-screen"
        )}
      >
        {children}
      </div>
    </div>
  );
}
