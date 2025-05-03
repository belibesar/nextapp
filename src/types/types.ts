import { ObjectId } from "mongodb";

export type UserType = {
    name: string;
    email: string;
    password: string;
    role: "admin" | "distributor";
    companyName: string;
    contact: ContactType;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ContactType = {
    phone: string;
    address: {
        province: string;
        regency: string;
    }
}

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
}

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
}

export type NewProduct = {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    supplierId?: string;
    producerId?: string;
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
}

export type CartType = {
    userId: ObjectId;
    items: {
        productId: ObjectId;
        qty: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
}