import { requestPayment } from "@/actions/payment.actions";
import { PaymentRequestType, PaymentResultType } from "@/type/payment.type";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  searchParams: PaymentRequestType;
}

export default async function SuccessPage({ searchParams }: Props) {
  const paymentKey = searchParams.paymentKey;
  const orderId = searchParams.orderId;
  const amount = searchParams.amount;

  const data: PaymentResultType = await requestPayment({
    paymentKey,
    orderId,
    amount,
  });
  console.log("data", data);

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <div className="flex flex-col gap-6 pb-8 pt-4">
        <h3 className="font-semibold text-lg md:text-2xl">주문 내역</h3>
        <div className="rounded-md p-2 border-1 cursor-pointer">
          <h3 className="font-semibold">주문</h3>
          <p className="text-sm mt-1">{data?.orderName}</p>
        </div>
      </div>
      <div className="flex flex-col gap-6 pb-8 pt-4">
        <h3 className="font-semibold text-lg md:text-2xl">결제 내역</h3>
        <div className="rounded-md p-2 border-1 cursor-pointer">
          <h3 className="font-semibold">결제 수단</h3>
          <p className="text-sm mt-1">{data?.method}</p>
        </div>
      </div>
      <div className="flex flex-col gap-6 pb-8 pt-4">
        <h3 className="font-semibold text-lg md:text-2xl">결제 금액</h3>
        <div className="rounded-md p-2 border-1 cursor-pointer">
          <p className="text-sm mt-1">{data?.amount?.toLocaleString()}원</p>
        </div>
      </div>
      <div className="flex flex-col gap-6 pb-8 pt-4">
        <h3 className="font-semibold text-lg md:text-2xl">결제 일시</h3>
        <div className="rounded-md p-2 border-1 cursor-pointer">
          <p className="text-sm mt-1">
            {data?.approvedAt
              ? format(new Date(data?.approvedAt), "yyyy-MM-dd HH:mm:ss")
              : "N/A"}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 py-8">
        <Link
          href="/account"
          className="bg-gray-50 hover:bg-gray-200 px-6 py-3 text-black rounded-md text-center"
        >
          구매 내역 확인
        </Link>
      </div>
    </div>
  );
}
