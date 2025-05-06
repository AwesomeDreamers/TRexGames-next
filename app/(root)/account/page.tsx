import { auth } from "@/auth";
import OrderHistory from "@/components/account/order-history";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { noImage } from "@/constants/common";
import Image from "next/image";

export default async function AccountPage() {
  const session = await auth();
  return (
    <div className="min-h-[calc(100vh-64px)] py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">내 계정</h1>
        </div>
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">구매 내역</TabsTrigger>
            <TabsTrigger value="mypage">내 정보</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <OrderHistory session={session} />
          </TabsContent>
          <TabsContent value="mypage">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center md:items-start">
                  <h2 className="text-xl font-semibold mb-6">내 정보</h2>
                  <div className="w-full flex flex-col md:flex-row justify-between items-center mb-4">
                    <div className="flex justify-between items-center gap-4">
                      <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden">
                        <Image
                          src={session?.user.image ?? noImage}
                          alt={session?.user.name || "유저"}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="flex flex-col ml-4">
                        <span className="text-gray-500">
                          {session?.user.name}
                        </span>
                        <span className="text-gray-500">
                          {session?.user.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0">
                      <Button variant={"outline"}>회원정보 변경</Button>
                      <Button variant={"outline"}>비밀번호 변경</Button>
                      <Button className="bg-rose-600 text-white hover:bg-rose-700">
                        회원 탈퇴
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
