import { OrderType } from "@/types/types";
import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";

class OrderModel {
  static collection() {
    return database.collection("orders");
  }

  static async create(order: OrderType) {
    const { _id: _, ...orderWithoutId } = order; // Destructure to remove _id if present
    // Prepare a new object to avoid mutating the original
    const orderData = {
      ...orderWithoutId,
      distributorId: new ObjectId(order.distributorId),
      groupBuyId: new ObjectId(order.groupBuyId),
      items: {
        productId: new ObjectId(order.items.productId),
        quantity: order.items.quantity
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    // Ensure _id is removed if present (let MongoDB generate it)
    if ("_id" in orderData) {
      delete orderData._id;
    }
    // return orderData;
    return await this.collection().insertOne(orderData);
  }

  static async getOrderById(orderId: string) {
    return await this.collection().findOne({
      _id: new ObjectId(orderId)
    });
  }

  static async getOrderbyUser(distributorId: string) {
    const cursor = this.collection().find({
      distributorId: new ObjectId(distributorId)
    });
    return await cursor.toArray();
  }

  static async updateOrder(orderId: string, updates: Partial<OrderType>) {
    return await this.collection().updateOne(
      { _id: new ObjectId(orderId) },
      { $set: updates }
    );
  }

  static async findGroupBuyOrder(distributorId: string, groupBuyId: string) {
    return await this.collection().findOne({
      distributorId: new ObjectId(distributorId),
      groupBuyId: new ObjectId(groupBuyId),
      isGroupBuy: true
    });
  }

  static async findAllByGroupBuyId(groupBuyId: string) {
    const orders = await this.collection()
      .find({ groupBuyId: new ObjectId(groupBuyId) })
      .toArray();
    return orders;
  }

  static async updateStatus(
    orderId: string | ObjectId,
    updateData: Partial<OrderType>
  ): Promise<boolean> {
    const result = await this.collection().updateOne(
      { _id: new ObjectId(orderId) },
      { $set: updateData }
    );

    return result.modifiedCount > 0;
  }

  static async hasJoinedGroupBuy(distributorId: string, groupBuyId: string) {
    const existingOrder = await this.collection().findOne({
      distributorId: new ObjectId(distributorId),
      groupBuyId: new ObjectId(groupBuyId)
    });
    return existingOrder;
  }

  static async getOrdersByUserId(distributorId: string) {
    return await this.collection()
      .find({ distributorId: new ObjectId(distributorId) })
      .toArray();
  }

  static async getAllOrders() {
    return await this.collection().find({}).toArray();
  }
}

export default OrderModel;
