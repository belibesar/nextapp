import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";

interface Notification {
  userId: string | ObjectId;
  title: string;
  message: string;
  groupBuyId?: string;
  createdAt: Date;
}

class NotificationModel {
  static collection() {
    return database.collection("user_notifications");
  }

  static collectionAdmin() {
    return database.collection("notifications");
  }

  static async create(notification: Omit<Notification, "createdAt">) {
    const groupBuyId = new ObjectId(notification.groupBuyId);
    const userId =
      typeof notification.userId === "string"
        ? new ObjectId(notification.userId)
        : notification.userId;

    const notifData = {
      ...notification,
      groupBuyId,
      userId,
      createdAt: new Date()
    };

    console.log("📨 Inserting notif to user_notifications:", notifData);

    const result = await this.collection().insertOne(notifData);

    console.log("✅ Notif inserted with ID:", result.insertedId);

    return result.insertedId;
  }

  static async createAdmin(notification: Omit<Notification, "createdAt">) {
    notification.userId = new ObjectId(notification.userId);
    const result = await this.collectionAdmin().insertOne({
      ...notification,
      createdAt: new Date()
    });
    return result.insertedId;
  }

  static async findByUser(userId: string) {
    const notifications = await this.collection()
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();
    return notifications;
  }

  static async deleteOne(filter: { _id: ObjectId; userId: ObjectId }) {
    const result = await this.collection().deleteOne(filter);
    return result.deletedCount > 0;
  }
}

export default NotificationModel;
