import { ObjectId } from "mongodb";

export type UserType = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "distributor" | "supplier";
  companyName: string;
  contact: ContactType;
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
  _id : string
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  supplierId: string;
  producerId: string;
  producer: {
    _id: string
    name: string;
    contact: {
      phone: string;
      email: string;
      address: string;
    },
    createdAt?: Date;
    updatedAt?: Date;
  }
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
  supplierId?: string | ObjectId;
  producerId?: string | ObjectId;
};

export type ProducerType = {
  name: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
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

export type OrderType = {
  distributorId: string | ObjectId;
  supplierId: string | ObjectId;
  items: OrderItemType[];
  totalPrice: number;
  currentStatus: string;
  isGroupBuy: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderItemType = {
  productId: string | ObjectId;
  productName: string;
  quantity: number;
  price: number;
};

export type GroupBuy = {
  productId: string;
  productName: string;
  price: number;
  moq: number; 
  maxQuantity: number;
  currentOrders: number;
  depositPercentage: number;
  deadline: Date;
  distributionLocation: string;
  description: string;
  status: GroupBuyStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum GroupBuyStatus {
  OPEN = "OPEN",
  MOQ_REACHED = "MOQ_REACHED",
  PROCESSING = "PROCESSING",
  WAITING_FULL_PAYMENT = "WAITING_FULL_PAYMENT",
  DONE = "DONE",
  FAILED = "FAILED"
}
