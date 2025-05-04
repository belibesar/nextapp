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
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  supplierId: string;
  producerId: string;
  createdAt?: Date;
  updatedAt?: Date;
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
  currentStatus: "pending" | "failed" | "preparing" | "shipped" | "finished";
  isGroupBuy: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderItemType = {
    productId: string;
    qty: number;
    price: number;
}
  