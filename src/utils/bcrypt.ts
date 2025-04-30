import { hashSync, compareSync } from "bcryptjs";

export const hashPassword = (password: string) => hashSync(password);
export const comparePassword = (password: string, hashedPassword: string) => compareSync(password, hashedPassword);