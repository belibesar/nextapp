import NotificationModel from "@/db/models/NotificationModel";
import errorHandler from "@/lib/errorHandler";

export async function GET({ params }: { params: { userId: string } }) {
  try {
    const { userId } = params;

    if (!userId) {
      throw { message: "User ID is required", status: 400 };
    }

    const notifications = await NotificationModel.findByUser(userId);

    return Response.json({
      success: true,
      data: notifications
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return errorHandler(error);
  }
}

export async function DELETE(req: Request) {
  try {
    const { notificationId } = await req.json();

    if (!notificationId) {
      throw { message: "User ID is required", status: 400 };
    }

    await NotificationModel.deleteById(notificationId);

    return Response.json({
      success: true,
      message: "Notifications deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting notifications:", error);
    return errorHandler(error);
  }
}
