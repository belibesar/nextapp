import CartModel from "@/db/models/CartModel";
import OrderModel from "@/db/models/OrderModel";
import UserModel from "@/db/models/UserModel";
import errorHandler from "@/lib/errorHandler";
import { notifyAdmin, notifyUser } from "@/lib/notifications";
import { OrderItemType, OrderType } from "@/types/types";
import { ObjectId } from "mongodb";


export async function POST(request: Request) {
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) throw { message: "User id missing in headers", status: 401 };

        const { supplierId } = await request.json();
        if (!supplierId) throw { message: "Supplier id is missing", status: 400 };

        const cart = await CartModel.getCartWithProducts(userId);
        if (!cart || cart.items.length === 0) throw { message: "Cart is empty", status: 400 };

        const items: OrderItemType[] = cart.items.map((item: any) => ({
            productId: new ObjectId(item.productId),
            qty: item.qty,
            price: item.product.price,
        }));

        const totalPrice = items.reduce((sum, item) => sum + item.qty * item.price, 0);

        const orderData: OrderType = {
            distributorId: new ObjectId(userId),
            supplierId: new ObjectId(supplierId),
            items,
            totalPrice,
            currentStatus: "pending",
            isGroupBuy: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
      
          const result = await OrderModel.create(orderData);
      
          await CartModel.clearCart(userId);

          await notifyUser(userId, result.insertedId.toString());
          await notifyAdmin(result.insertedId.toString());
      
          return Response.json({ message: "Checkout successful", orderId: result.insertedId });

    } catch (error) {
        return errorHandler(error);
    }
}

export async function PATCH(request: Request) {
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) throw { message: "User ID is missing in headers", status: 401 };

        const user = await UserModel.findById(userId);
        if (!user) throw { message: "User not found", status: 404 };

        if (user.role !== "admin") {
         throw { message: "Unauthorized: Only admins can update order status", status: 403 };
         }  

      const { orderId, currentStatus } = await request.json();
  
      if (!orderId) throw { message: "Order ID is missing", status: 400 };
      if (!currentStatus) throw { message: "Current status is missing", status: 400 };
  
      const validStatuses = ["pending", "failed", "preparing", "shipped", "finished"];
      if (!validStatuses.includes(currentStatus)) {
        throw { message: `Invalid status: ${currentStatus}`, status: 400 };
      }
  
      const result = await OrderModel.updateOrder(orderId, { currentStatus });
  
      if (result.modifiedCount === 0) {
        throw { message: "Failed to update order status", status: 404 };
      }

      const order = await OrderModel.getOrderById(orderId);
      if (!order) throw { message: "Order not found", status: 404 };

      await notifyUser(order.distributorId.toString(), `Your order status has been updated to ${currentStatus}`);
  
      return Response.json({ message: "Order status updated successfully" });
    } catch (error) {
      return errorHandler(error);
    }
}