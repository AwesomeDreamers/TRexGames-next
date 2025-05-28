import { auth } from "@/auth";
import AdminHeader from "@/components/admin/header";
import AdminSidebar from "@/components/admin/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="min-h-screen">
      <SidebarProvider>
        <AdminSidebar session={session} />
        <div className={cn("transition-all duration-300 min-h-screen w-full")}>
          <AdminHeader session={session} />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
