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


  static async updateStatus(orderId: string | ObjectId, updateData: Partial<OrderType>): Promise<boolean> {
    const result = await this.collection().updateOne(
        { _id: new ObjectId(orderId) },
        { $set: updateData }
    );

    return result.modifiedCount > 0;
  }

  static async hasJoinedGroupBuy(distributorId: string, groupBuyId: string): Promise<boolean> {
    const existingOrder = await this.collection().findOne({
      distributorId: new ObjectId(distributorId),
      groupBuyId: new ObjectId(groupBuyId),
      isGroupBuy: true,
    });
    return !!existingOrder; 
  }

}

export default OrderModel;
