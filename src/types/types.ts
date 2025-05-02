
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