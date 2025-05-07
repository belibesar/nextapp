import OrderModel from "@/db/models/OrderModel";
import errorHandler from "@/lib/errorHandler";

export async function GET(request: Request) {
    try {
        const userData = request.headers.get("x-user-data");
        if (!userData) {
            return Response.json(
                { message: "Header 'x-user-data' is required" },
                { status: 400 }
            );
        }

        let userDataJson;
        try {
            if (userData.startsWith("{")) {
                userDataJson = JSON.parse(userData);
            } else {
                userDataJson = { _id: userData };
            }
        } catch (error) {
            return Response.json(
                { message: "Invalid JSON or encoding in 'x-user-data' header" },
                { status: 400 }
            );
        }

        const distributorId = userDataJson?._id;
        if (!distributorId) {
            return Response.json(
                { message: "User ID is missing in headers" },
                { status: 400 }
            );
        }

        // Fetch all orders for the user
        const orders = await OrderModel.getOrdersByUserId(distributorId);
        if (!orders || orders.length === 0) {
            return Response.json(
                { message: "No orders found for this user" },
                { status: 404 }
            );
        }

        return Response.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return errorHandler(error);
    }
}