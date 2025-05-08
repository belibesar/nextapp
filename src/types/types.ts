import { ObjectId } from "mongodb";

export type UserType = {
  _id: string | ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "distributor" | "supplier";
  companyName: string;
  contact: ContactType;
  bankAccount?: {
    name: string;
    number: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

export type ContactType = {
  phone: string;
  address: {
    province: string;
    regency: string;
  };
};

export type NewUser = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "distributor";
  companyName: string;
  contact: ContactType;
};

export type CustomeError = {
  message: string;
  status: number;
};

export type GeocodeResult = {
  province: string | null;
  regency: string | null;
};

export type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  // supplierId: string;
  producerId: string;
  producer: {
    _id: string;
    name: string;
    contact: {
      phone: string;
      email: string;
      address: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
  };
  img?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProductCardType = {
  _id: string;
  name: string;
  category: string;
  producer: {
    name: string;
  };
  price: number;
};

export type NewProduct = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  // supplierId?: string | ObjectId;
  producerId?: string | ObjectId;
};

export type ProducerType = {
  name: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  products?: ProductType[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type CartType = {
  userId: string;
  items: {
    productId: string;
    qty: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
};

export enum ORDER_STATUS {
  PENDING = "PENDING",
  AWAITING_ADMIN_CONFIRMATION = "AWAITING_ADMIN_CONFIRMATION",
  DP_CONFIRMED = "DP_CONFIRMED",
  AWAITING_ADMIN_CONFIRMATION_FULL = "AWAITING_ADMIN_CONFIRMATION_FULL",
  FULLPAYMENT_CONFIRMED = "FULLPAYMENT_CONFIRMED",
  AWAITING_FULL_PAYMENT = "AWAITING_FULL_PAYMENT",
  PAID_IN_FULL = "PAID_IN_FULL",
  CANCELLED = "CANCELLED"
}

export type OrderType = {
  _id?: string | ObjectId;
  distributorId: string | ObjectId;
  items: OrderItemType;
  totalPrice: number;
  currentStatus: ORDER_STATUS;
  groupBuyId: string | ObjectId;
  downPayment?: {
    status: ORDER_STATUS;
    paymentProof: string;
    amount: number;
    percentage: number;
  };
  fullPayment?: {
    status: ORDER_STATUS;
    paymentProof: string;
    amount: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItemType = {
  productId: string | ObjectId;
  quantity: number;
  // price?: number;
  // productName?: string;
  // producerName?: string;
};

export type GroupBuy = {
  _id?: ObjectId;
  productId: string | ObjectId;
  minTargetQuantity: number;
  maxTargetQuantity: number;
  minUserOrder: number;
  currentOrders: number;
  depositPercentage: number;
  deadline: Date;
  participants: ParticipantType[];
  distributionLocation: string;
  description: string;
  status: GroupBuyStatus;
  createdAt: Date;
  updatedAt: Date;
  productDetails?: ProductType;
};

export type ParticipantType = {
  distributorId: string | ObjectId; // ref → users._id
  qty: number;
  joinedAt: Date;
};

export enum GroupBuyStatus {
  OPEN = "OPEN",
  MOQ_REACHED = "MOQ_REACHED",
  PROCESSING = "PROCESSING",
  WAITING_FULL_PAYMENT = "WAITING_FULL_PAYMENT",
  SHIPPED = "SHIPPED",
  DONE = "DONE",
  FAILED = "FAILED"
}
