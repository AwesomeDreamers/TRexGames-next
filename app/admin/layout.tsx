import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/shared/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full min-h-screen">
      <div className="hidden xl:block xl:w-[15%] sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className="w-full xl:w-[85%] flex flex-col ">
        <Header />
        <main className="px-5">{children}</main>
      </div>
    </div>
  );
}
