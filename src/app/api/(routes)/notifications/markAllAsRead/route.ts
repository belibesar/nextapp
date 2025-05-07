import { NextResponse } from "next/server";
import { database } from "@/db/config/mongodb";

export async function POST(request: Request) {
  try {
    const notificationsCollection = database.collection("user_notifications");

    // Periksa apakah body request ada
    let body;
    try {
      body = await request.json();
      if (!body || Object.keys(body).length === 0) {
        throw new Error("Request body is empty");
      }
    } catch (error) {
      console.error("Invalid or missing JSON body in request:", error);
      return NextResponse.json({ success: false, message: "Invalid or missing JSON body" }, { status: 400 });
    }

    const userData = request.headers.get("x-user-data");

    if (!userData) {
      return NextResponse.json({ success: false, message: "x-user-data header is missing" }, { status: 400 });
    }

    let userDataJson;
    try {
      userDataJson = JSON.parse(userData);
    } catch (parseError) {
      console.error("Invalid JSON in x-user-data header:", userData);
      userDataJson = { _id: userData };
    }

    const userId = userDataJson?._id;

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
    }

    const result = await notificationsCollection.updateMany(
      { userId, isRead: false },
      { $set: { isRead: true } }
    );

    return NextResponse.json({
      success: true,
      message: "All notifications marked as read",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}