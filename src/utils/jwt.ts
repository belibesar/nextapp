import { SignJWT, jwtVerify } from "jose";

const SECRET = process.env.JWT_SECRET as string;

export const signToken = async (payload: { _id: string; email: string }) => {
    const secret = new TextEncoder().encode(SECRET);
    console.log("payloaddd nichh", payload);

    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .sign(secret);
        return token;
};

export const verifyToken = async <T>(token: string) => {
    const secret = new TextEncoder().encode(SECRET);
    const { payload } = await jwtVerify<T>(token, secret);
    return payload;
}