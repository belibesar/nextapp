import UserModel from "@/db/models/UserModel";
import errorHandler from "@/lib/errorHandler";


export async function PUT(request: Request) {
    try {
        const { id, updatedUser } = await request.json();
        const res = await UserModel.updateUser(id, updatedUser);
        return Response.json(res);
    } catch (error) {
        return errorHandler(error);
    }
}

export async function GET(request: Request) {
    try {
        const userDataHeader = request.headers.get("x-user-data");

        const userData = userDataHeader ? JSON.parse(userDataHeader) : null;
        const user = await UserModel.findById(userData.id);

        return Response.json(user);
    } catch (error) {
        return errorHandler(error);
    }
}
