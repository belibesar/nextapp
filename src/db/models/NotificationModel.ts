import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";

class NotificationModel {
    static collection() {
        return database.collection("notifications");
    }

    static async create(notification: { userId: string; message: string; createdAt: Date }) {
        const result = await this.collection().insertOne(notification);
        return result.insertedId;
    }
}

export default NotificationModel;