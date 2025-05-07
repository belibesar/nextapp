import UserModel from "@/db/models/UserModel";
import errorHandler from "@/lib/errorHandler";

export async function GET() {
    try {
        const getDistributors = await UserModel.collection().find({ role: "distributor" }).toArray();
        return Response.json(getDistributors);
    } catch (error) {
        return errorHandler(error);
    }
}