import GroupBuyModel from "@/db/models/GroupBuyModel";
import OrderModel from "@/db/models/OrderModel";
import errorHandler from "@/lib/errorHandler";
import { ObjectId } from "mongodb";

export async function PATCH(request: Request) {
    try {
        const id = new URL(request.url).pathname.split("/").pop();
        if (!id) {
            throw { message: "Invalid ID in request URL", status: 400 };
        }

        const { quantity, ...updateData } = await request.json();

        const success = await OrderModel.updateStatus(id, updateData);

        const userData = request.headers.get("x-user-data");

        if (!userData) {
            throw { message: "Header 'x-user-data' is required", status: 400 };
        }
        
        let userDataJson;
        try {
            if (userData.startsWith("{")) {
                userDataJson = JSON.parse(userData);
            } else {
                userDataJson = { _id: userData };
            }
        } catch (error) {
            throw { message: "Invalid JSON or encoding in 'x-user-data' header", status: 400 };
        }
        
        const distributorId = userDataJson?._id;
        
        if (!distributorId) {
            throw { message: "Distributor ID is missing in headers", status: 400 };
        }

        if (success) {
        
            const order = await OrderModel.getOrderById(id);
            if (!order) {
                throw { message: "Order not found", status: 404 };
            }
        
            if (order.isGroupBuy && order.groupBuyId) {
        
                const groupBuyExists = await GroupBuyModel.findById(order.groupBuyId);
                if (!groupBuyExists) {
                    throw { message: "Group buy not found", status: 404 };
                }

                await GroupBuyModel.updateGroupBuy(order.groupBuyId, distributorId, order.items[0].quantity);
            }

            return Response.json({
                success: true,
                message: "Payment confirmed and user added to participants.",
            });
        } else {
            throw { message: "Failed to update order status", status: 500 };
        }
        
    } catch (error) {
        console.error("Error updating group buy:", error);
        return errorHandler(error);
    }
}