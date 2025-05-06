import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";
import { GroupBuy, GroupBuyStatus } from "@/types/types";

class GroupBuyModel {
  static collection() {
    return database.collection("groupBuys");
  }

  static async findById(id: string) {
    return this.collection().findOne({ _id: new ObjectId(id) });
  }

  static async findAllWithProducts() {
    return this.collection()
      .aggregate([
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "productDetails"
          }
        },
        {
          $unwind: "$productDetails"
        }
      ])
      .toArray();
  }

  static async findByStatus(status: GroupBuyStatus) {
    return this.collection().find({ status });
  }

  static async create(groupBuy: GroupBuy) {
    groupBuy.productId = new ObjectId(groupBuy.productId);
    // Create a copy without _id
    const { _id: _, ...groupBuyData } = groupBuy;
    const result = await this.collection().insertOne({
      ...groupBuyData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return result.insertedId;
  }

  static async updateById(id: string, updateData: Partial<GroupBuy>) {
    updateData.productId = new ObjectId(updateData.productId);
    const result = await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    return result.modifiedCount > 0;
  }

  static async updateGroupBuy(id: string, updateData: Partial<GroupBuy>) {
    const result = await this.collection().updateOne(
      { _id: new ObjectId(id) },
      updateData
    );
    return result.modifiedCount > 0;
  }

  static async deleteById(id: string) {
    const result = await this.collection().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

export default GroupBuyModel;
