import { OrderType } from "@/types/types";
import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";

class OrderModel {
  static collection() {
    return database.collection("orders");
  }

  static async create(order: OrderType) {
    // console.log(order, "ini order dari model");
    order.distributorId = new ObjectId(order.distributorId);
    return await this.collection().insertOne({
      ...order,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  static async getOrderById(orderId: string) {
    return await this.collection().findOne({ _id: new ObjectId(orderId) });
  }

  static async updateOrder(orderId: string, updates: Partial<OrderType>) {
    return await this.collection().updateOne(
      { _id: new ObjectId(orderId) },
      { $set: updates }
    );
  }

  static async updateStatus(orderId: string | ObjectId, updateData: Partial<OrderType>): Promise<boolean> {
    console.log("Updating order with ID:", orderId);
    console.log("Update data:", updateData);

    const result = await this.collection().updateOne(
        { _id: new ObjectId(orderId) },
        { $set: updateData }
    );

    console.log("Update result:", result);

    if (result.modifiedCount === 0) {
        console.error("No documents were updated. Check if the order ID exists.");
    }

    return result.modifiedCount > 0;
}
}

export default OrderModel;
