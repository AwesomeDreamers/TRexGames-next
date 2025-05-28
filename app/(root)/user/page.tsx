import { auth } from "@/auth";
import MyPage from "@/components/account/my-page";

export default async function UserPage() {
  const session = await auth();
  return (
    <div className="min-h-[calc(100vh-64px)] py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">내 계정</h1>
        </div>
        <MyPage session={session} />
      </div>
    </div>
  );
}
