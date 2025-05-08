import NotificationModel from "@/db/models/NotificationModel";
import errorHandler from "@/lib/errorHandler";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const userData = request.headers.get("x-user-data");

    if (!userData) {
      throw { message: "x-user-data header is missing", status: 400 };
    }

    console.log("x-user-data header:", userData);

    let userDataJson;
    try {
      userDataJson = JSON.parse(userData);
    } catch (parseError) {
      console.error("Invalid JSON in x-user-data header:", userData); 
      userDataJson = { _id: userData };
    }

    const userId = userDataJson?._id;

    if (!userId) {
      throw { message: "User ID is required", status: 400 };
    }

    const notifications = await NotificationModel.findByUserAdmin(userId);

    return Response.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return errorHandler(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const userData = request.headers.get("x-user-data");

    if (!userData) {
      throw { message: "x-user-data header is missing", status: 400 };
    }

    console.log("x-user-data header:", userData);

    let userDataJson;
    try {
      userDataJson = JSON.parse(userData);
    } catch (parseError) {
      console.error("Invalid JSON in x-user-data header:", userData);
      userDataJson = { _id: userData };
    }

    const userId = userDataJson?._id;

    if (!userId) {
      throw { message: "User ID is required", status: 400 };
    }

    const body = await request.json();
    console.log("Request body:", body); // Tambahkan log ini
    const { notificationId } = body;

    if (!notificationId) {
      throw { message: "Notification ID is required", status: 400 };
    }

    console.log(`Deleting notification with ID: ${notificationId} for user: ${userId}`);

    // Gunakan filter untuk memastikan hanya notifikasi milik user yang dihapus
    const result = await NotificationModel.deleteOneAdmin({
      _id: new ObjectId(notificationId),
      userId: new ObjectId(userId),
    });

    if (!result) {
      throw { message: "Notification not found or not deleted", status: 404 };
    }

    return Response.json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return errorHandler(error);
  }
}