import UserModel from "@/db/models/UserModel";
import errorHandler from "@/lib/errorHandler";


export async function POST(request: Request) {
    try {
        const res = await request.json();
        await UserModel.create(res);

        return Response.json({ message: "User created successfully", status: 201 })
    } catch (error) {
        return errorHandler(error);
    }
}