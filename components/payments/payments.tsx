"use client";
import { Button } from "@/components/ui/button";
import { useCreatePayment } from "@/hooks/query/payment.queries";
import { OrderType } from "@/type/order.type";
import {
  loadTossPayments,
  TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import { Session } from "next-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as uuid from "uuid";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export default function Payments({
  order,
  session,
}: {
  order: OrderType;
  session: Session | null;
}) {
  const searchParams = useSearchParams();
  const customerEmail = searchParams.get("email") || session?.user.email;
  const customerKey = searchParams.get("customerKey") || uuid.v4();
  const createPayment = useCreatePayment();
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey });
      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, [clientKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      if (order.status === "SUCCESS") {
        toast.error("이미 완료된 결제입니다.");
        router.replace("/");
      }
      await widgets.setAmount({ currency: "KRW", value: order.total });

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);
    }

    renderPaymentWidgets();
  }, [widgets]);

  async function handlePayment() {
    try {
      await widgets
        ?.requestPayment({
          orderId: order.id,
          orderName: order.orderName,
          customerName: session?.user.name || "고객",
          customerEmail,
        })
        .then(async function (result) {
          createPayment.mutate(
            {
              orderId: order.id,
              amount: order.total,
              status: "IN_PROGRESS",
              orderName: order.orderName,
            },
            {
              onSuccess(data) {
                toast.success(data.message);
                router.replace(
                  `/payments/success?paymentKey=${result.paymentKey}&orderId=${order.id}&amount=${order.total}`
                );
              },
            }
          );
        })
        .catch(function (error) {
          if (error.code === "USER_CANCEL") {
            toast.error("결제가 취소되었습니다.");
          } else if (error.code === "INVALID_CARD_COMPANY") {
            toast.error("유효하지 않은 카드사입니다.");
          } else {
            toast.error(
              error.message || "결제에 실패했습니다. 다시 시도해주세요."
            );
          }
        });
    } catch (error) {
      // TODO: 에러 처리
    }
  }

  return (
    <div className="bg-white min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="container max-w-2xl mx-auto px-4">
        <h1 className="text-lg md:text-2xl font-semibold text-black">
          확인 및 결제
        </h1>
        <p className="text-gray-600">
          결제 수단을 선택하고 결제를 진행해주세요. 동의하시는 경우에만 아래
          버튼을 눌러 게임을 결제하세요.
        </p>
        <div id="payment-method" className="w-full" />
        <div id="agreement" className="w-full" />
        <Button
          variant={"default"}
          className="w-full bg-black text-white hover:bg-slate-900"
          onClick={handlePayment}
        >
          결제하기
        </Button>
      </div>
    </div>
  );
}
