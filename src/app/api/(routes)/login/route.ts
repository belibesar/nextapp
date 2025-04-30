import UserModel from "@/db/models/UserModel";
import { comparePassword } from "@/utils/bcrypt";
import errorHandler from "@/lib/errorHandler";
import { signToken } from "@/utils/jwt";
import { cookies } from "next/headers";


export async function POST(request: Request) {
    try {
        const body = await request.json();

        const user = await UserModel.findByEmail(body.email);
        if (!user) throw { message: "Invalid email/password", status: 401 };

        const isValidPassword = comparePassword(body.password, user.password);
        if (!isValidPassword) throw { message: "Invalid email/password", status: 401 };

        const accessToken = await signToken({
            _id: user._id.toString(),
            email: user.email,
        });

        const cookieStore = await cookies();
        cookieStore.set("Authorization", `Bearer ${accessToken}`);

        return Response.json({ accessToken });
    } catch (error) {
        return errorHandler(error);
    }
}