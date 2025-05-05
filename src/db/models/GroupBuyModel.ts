import { ObjectId } from "mongodb";
import { database } from "../config/mongodb"
import { GroupBuy, GroupBuyStatus } from "@/types/types";


class GroupByModel {
    static collection() {
        return database.collection("groupBuys");
    }

    static async findById(id: string) {
        return this.collection().findOne({ _id: new ObjectId(id) })
    }

    static async findAll(filter: Partial<GroupBuy>) {
        return this.collection().find(filter).toArray();
    }

    static async findByStatus(status: GroupBuyStatus){
        return this.collection().find({ status });
    }

    static async create(groupBuy: GroupBuy) {
        const result = await this.collection().insertOne({
            ...groupBuy,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return result.insertedId;
    }

    static async updateById(id: string, updateData: Partial<GroupBuy>) {
        const result = await this.collection().updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...updateData, updatedAt: new Date() } }
        );
        return result.modifiedCount > 0;
    }

    static async deleteById(id: string) {
        const result = await this.collection().deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    }

}

export default GroupByModel