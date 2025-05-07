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

  static async getOrderbyUser(distributorId: string) {
    const cursor = this.collection().find({ distributorId: new ObjectId(distributorId) });
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
        .find({ distributorId: new ObjectId(distributorId)})
        .toArray();
  }

  static async getAllOrders() {
    return await this.collection().find({}).toArray();
  }
}

export default OrderModel;
