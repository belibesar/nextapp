import OrderModel from "@/db/models/OrderModel";
import errorHandler from "@/lib/errorHandler";

export async function GET(request: Request) {
    try {
        const orders = await OrderModel.getAllOrders();
        if (!orders || orders.length === 0) throw { message: "No orders found"}

        return Response.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return errorHandler(error);
    }
}


export async function POST(request: Request) {
    try {
        const id = new URL(request.url).pathname.split("/").pop();
        if (!id) {
            throw { message: "Invalid ID in request URL", status: 400 };
        }
        
        const res = await request.json();
        await OrderModel.create(res);
        return Response.json({ message: "Order successfully created", status: 201 })
    } catch (error) {
        console.error("Error updating group buy:", error);
        return errorHandler(error);
    }
}