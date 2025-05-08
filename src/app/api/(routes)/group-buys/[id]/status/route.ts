import GroupBuyModel from "@/db/models/GroupBuyModel";
import OrderModel from "@/db/models/OrderModel";
import NotificationModel from "@/db/models/NotificationModel";
import { NextResponse } from "next/server";
import errorHandler from "@/lib/errorHandler";
import { GroupBuyStatus } from "@/types/types";

export async function GET() {
  try {
    const groupBuys = await GroupBuyModel.findAllWithProducts();
    return Response.json(groupBuys);
  } catch (error) {
    console.error("Error fetching group buys:", error);
    return errorHandler(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const id = new URL(request.url).pathname.split("/").slice(-2)[0];
    const { status } = await request.json();

    const validStatuses = Object.values(GroupBuyStatus);
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    const success = await GroupBuyModel.updateById(id, { status });

    if (!success) {
      throw { message: "Group buy not found", status: 404 };
    }

    const orders = await OrderModel.findAllByGroupBuyId(id);
    const notifTitle = "Update Group Buy";
    let notifMessage = "";

    switch (status) {
      case GroupBuyStatus.WAITING_FULL_PAYMENT:
        notifMessage = "MOQ terpenuhi. Silakan lakukan pembayaran penuh.";
        break;
      case GroupBuyStatus.PROCESSING:
        notifMessage =
          "Pembayaran telah dikonfirmasi. Pesanan sedang diproses ke supplier.";
        break;
      case GroupBuyStatus.SHIPPED:
        notifMessage = "Produk sedang dalam pengiriman.";
        break;
      case GroupBuyStatus.DONE:
        notifMessage = "Group Buy selesai. Barang akan dikirim.";
        break;
      case GroupBuyStatus.FAILED:
        notifMessage = "Group Buy gagal. Tidak mencapai MOQ sebelum deadline.";
        break;
    }

    // await Promise.all(
    orders.forEach((order) => {
      NotificationModel.create({
        userId: order.distributorId,
        title: notifTitle,
        message: notifMessage,
        groupBuyId: id
      });
    });
    // );

    return NextResponse.json({
      success: true,
      message: notifMessage,
      groupBuyId: id,
      status: status,
      title: notifTitle
    });
  } catch (error) {
    console.error("Error updating group buy status:", error);
    return errorHandler(error);
  }
}
