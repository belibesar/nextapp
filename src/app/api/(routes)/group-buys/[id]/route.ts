import GroupBuyModel from "@/db/models/GroupBuyModel";
import errorHandler from "@/lib/errorHandler";

export async function GET(request: Request) {
    try {
        const id  = new URL(request.url).pathname.split("/").pop()!;
        const groupBuy = await GroupBuyModel.findById(id);

        if (groupBuy) {
            return Response.json(groupBuy);
        } else {
            throw { message: "Group buy not found", status: 404 }
        }
    } catch (error) {
        console.error("Error fetching group buy:", error);
        return errorHandler(error)
    }
}

export async function PATCH(request: Request) {
    try {
        const id  = new URL(request.url).pathname.split("/").pop()!;
        const updateData = await request.json();
        const success = await GroupBuyModel.updateById(id, updateData);

        if (success) {
            return Response.json({ message: "Group buy updated successfully" });
        } else {
            throw { message: "Group buy not found", status: 404 }
        }
    } catch (error) {
        console.error("Error updating group buy:", error);
        return errorHandler(error)
    }
}

export async function DELETE(request: Request) {
    try {
        const id  = new URL(request.url).pathname.split("/").pop()!;
        const success = await GroupBuyModel.deleteById(id);

        if (success) {
            return Response.json({ message: "Group buy deleted successfully" });
        } else {
            throw { message: "Group buy not found", status: 404 }
        }
    } catch (error) {
        console.error("Error deleting group buy:", error);
        return errorHandler(error)
    }
}