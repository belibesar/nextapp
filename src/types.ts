
export type UserType = {
    name: string;
    email: string;
    password: string;
    role: "supplier" | "distributor";
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
    role: "supplier" | "distributor";
    companyName: string;
    contact: ContactType;
};

export type CustomeError = {
    message: string;
    status: number;
}