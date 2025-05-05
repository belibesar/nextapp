import GroupBuyModel from "@/db/models/GroupBuyModel";
import errorHandler from "@/lib/errorHandler";

export async function PATCH(request: Request) {
    try {
        const id  = new URL(request.url).pathname.split("/").slice(-2)[0];
        const  { status }  = await request.json();

        const success = await GroupBuyModel.updateById(id, { status });

        if (success) {
            return Response.json({ message: "Group buy status updated successfully" });
        } else {
            throw { message: "Group buy not found", status: 404 }
        }
    } catch (error) {
        console.error("Error updating group buy status:", error);
        return errorHandler(error)
    }
}