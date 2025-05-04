import { OrderType } from "@/types/types";
import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";



class OrderModel {
    static collection() {
        return database.collection("orders")
    }

    static async createOrder(orderData: OrderType) {
        return await this.collection().insertOne(orderData);
    }

    static async getOrderById(orderId: string) {
        return await this.collection().findOne({ _id: new ObjectId(orderId)})
    }

    static async updateOrder(orderId: string, updates: Partial<OrderType>) {
        return await this.collection().updateOne({ _id: new ObjectId(orderId)}, { $set: updates });
    }
}

export default OrderModel;