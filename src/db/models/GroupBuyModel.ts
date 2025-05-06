import { ObjectId, UpdateFilter } from "mongodb";
import { database } from "../config/mongodb";
import { GroupBuy, GroupBuyStatus } from "@/types/types";

class GroupBuyModel {
  static collection() {
    return database.collection("groupBuys");
  }

  static async findById(id: string) {
    const result = await this.collection()
      .aggregate([
        {
          $match: { _id: new ObjectId(id) }
        },
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

      return result
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

  static async updateGroupBuy(id: string, distributorId: string, qty: number) {
    // Check if current distributorId is already in the participants array
    const groupBuy = await this.collection().findOne({ _id: new ObjectId(id) });
    if (!groupBuy) {
      throw new Error("Group buy not found");
    }
    const existingParticipant = groupBuy.participants.find(
      (participant: { distributorId: ObjectId }) =>
        participant.distributorId.toString() === distributorId
    );
    if (existingParticipant) {
      // If the distributorId already exists, return an error
      throw { message: "Distributor already joined", status: 400 };
    }

    const result = await this.collection().updateOne(
      { _id: new ObjectId(id) },
      {
        $push: {
          participants: {
            distributorId: new ObjectId(distributorId),
            qty,
            joinedAt: new Date()
          }
        },
        $inc: { currentOrders: qty },
        $set: { updatedAt: new Date() }
      } as any // Type assertion to avoid TypeScript error
    );
    return result.modifiedCount > 0;
  }

  static async deleteById(id: string) {
    const result = await this.collection().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

export default GroupBuyModel;
