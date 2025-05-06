import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";

class NotificationModel {
  static collection() {
    return database.collection("notifications");
  }

  static async create(notification: {
    userId: string | ObjectId;
    message: string;
  }) {
    notification.userId = new ObjectId(notification.userId);
    const result = await this.collection().insertOne({
      ...notification,
      createdAt: new Date()
    });
    return result.insertedId;
  }
}

export default NotificationModel;
