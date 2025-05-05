export type CreatePaymentType = {
  orderId: string;
  amount: number;
  status:
    | "READY"
    | "IN_PROGRESS"
    | "WAITING_FOR_DEPOSIT"
    | "DONE"
    | "CANCELED"
    | "PARTIAL_CANCELED"
    | "ABORTED"
    | "EXPIRED";
  orderName: string;
};

export type PaymentRequestType = {
  paymentKey: string;
  orderId: string;
  amount: number;
};

export type PaymentResponseType = {
  approvedAt?: string;
  mId?: string;
  orderName?: string;
  requestedAt?: string;
  status:
    | "READY"
    | "IN_PROGRESS"
    | "WAITING_FOR_DEPOSIT"
    | "DONE"
    | "CANCELED"
    | "PARTIAL_CANCELED"
    | "ABORTED"
    | "EXPIRED";
  receipt?: {
    url?: string;
  };
  checkout?: {
    url?: string;
  };

  card?: {
    number?: string;
    cardType?: string;
  };

  type?: "NORMAL" | "BILLING" | "BRANDPAY";
  totalAmount: number;
  method?: "카드" | "가상계좌" | "계좌이체";
};

export type PaymentType = {
  id: string;
  paymentKey: string;
  orderId: string;
  amount: number;
  status:
    | "READY"
    | "IN_PROGRESS"
    | "WAITING_FOR_DEPOSIT"
    | "DONE"
    | "CANCELED"
    | "PARTIAL_CANCELED"
    | "ABORTED"
    | "EXPIRED";
  orderName: string;
  approvedAt: string;
  mId?: string;
  receiptUrl?: string;
  cardNumber?: string;
  method?: "카드" | "가상계좌" | "계좌이체";
};

export type PaymentResultType = {
  method?: "카드" | "가상계좌" | "계좌이체";
  amount?: number;
  approvedAt?: string;
  cardNumber?: string;
  cardType?: string;
  checkoutUrl?: string;
  failureCode?: string;
  failureMessage?: string;
  id?: string;
  mId?: string;
  orderId?: string;
  orderName?: string;
  paymentKey?: string;
  requestedAt?: string;
  receiptUrl?: string;
  status?:
    | "READY"
    | "IN_PROGRESS"
    | "WAITING_FOR_DEPOSIT"
    | "DONE"
    | "CANCELED"
    | "PARTIAL_CANCELED"
    | "ABORTED"
    | "EXPIRED";
  type?: "NORMAL" | "BILLING" | "BRANDPAY";
  updatedAt?: string;
};
