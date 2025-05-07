import OrderModel from "@/db/models/OrderModel";
import errorHandler from "@/lib/errorHandler";

export async function GET() {
    try {
        const orders = await OrderModel.getAllOrders();
        if (!orders || orders.length === 0) throw { message: "No orders found"}

        return Response.json(orders);
    } catch (error) {
        return errorHandler(error);
    }
}