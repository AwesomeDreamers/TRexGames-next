"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function FailPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const message = searchParams.get("message");
  const orderId = searchParams.get("orderId");
  const router = useRouter();

  return (
    <div>
      <div className="text-center min-h-[calc(100vh-64px)] flex flex-col justify-center">
        <div>
          <h2 className="text-3xl font-semibold">결제가 실패했습니다.</h2>
          <p className="text-gray-500 mt-4 font-semibold">
            결제 도중 아래와 같은 문제가 생겼습니다. 다시 시도해주세요.
          </p>

          <p className="text-gray-400 text-xs max-w-lg mx-auto mt-8">
            에러 코드: {code}
          </p>
          <p className="text-gray-400 text-xs max-w-lg mx-auto mt-2">
            에러 메세지: {message}
          </p>
          <p className="text-gray-400 text-xs max-w-lg mx-auto mt-2">
            주문 ID: {orderId}
          </p>
          <div className="mt-8">
            <Button className="px-4 py-2.5" onClick={() => router.replace("/")}>
              메인으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
