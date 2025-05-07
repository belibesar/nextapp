import GroupBuyModel from "@/db/models/GroupBuyModel";
import NotificationModel from "@/db/models/NotificationModel";
import OrderModel from "@/db/models/OrderModel";
import UserModel from "@/db/models/UserModel";
import { cloudinary } from "@/lib/cloudinaryConfig";
import errorHandler from "@/lib/errorHandler";
import { ORDER_STATUS, OrderType } from "@/types/types";
import { Readable } from "stream";

export async function POST(request: Request) {
  try {
    const id = new URL(request.url).pathname.split("/").pop();
    if (!id) {
      throw { message: "Invalid ID in request URL", status: 400 };
    }
    const formData = await request.formData();

    const paymentProof = formData.get("paymentProof") as File;
    if (!paymentProof) {
      throw { message: "Payment proof is required", status: 400 };
    }

    const getOrder = await OrderModel.getOrderById(id);
    if (!getOrder) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }

    let paymentProofUrl = "";

    if (paymentProof) {
      const buffer = Buffer.from(await paymentProof.arrayBuffer());

      paymentProofUrl = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "payment-proofs",
            resource_type: "image"
          },
          (error, result) => {
            if (error || !result) {
              console.error("Cloudinary upload error:", error);
              reject(new Error("Failed to upload payment proof"));
            } else {
              resolve(result.secure_url); // Resolve with the secure URL
            }
          }
        );

        Readable.from(buffer).pipe(stream);
      });
    } else {
      throw {
        message: "Payment proof is required for deposit payment"
      };
    }

    const updateData = {
      currentStatus: ORDER_STATUS.AWAITING_ADMIN_CONFIRMATION_FULL,
      "fullPayment.status": ORDER_STATUS.AWAITING_ADMIN_CONFIRMATION_FULL,
      "fullPayment.paymentProof": paymentProofUrl
    };

    const updateStatus = await OrderModel.updateStatus(id, updateData);

    return Response.json({ updateStatus }, { status: 200 });
  } catch (error) {
    console.error("Error updating group buy:", error);
    return errorHandler(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const id = new URL(request.url).pathname.split("/").pop();
    if (!id) {
      throw { message: "Invalid ID in request URL", status: 400 };
    }

    const { ...updateData } = await request.json();
    if (!updateData || !updateData.currentStatus) {
      throw { message: "Update data is required", status: 400 };
    }

    const currentStatus = updateData.currentStatus;
    if (!Object.values(ORDER_STATUS).includes(currentStatus)) {
      throw { message: "Invalid order status", status: 400 };
    }

    const userData = request.headers.get("x-user-data");
    const userDataJson = userData ? JSON.parse(userData) : null;
    const adminId = userDataJson?._id;
    if (!adminId) {
      throw { message: "Admin ID is missing in headers", status: 400 };
    }

    const user = await UserModel.findById(adminId);
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }
    if (user.role !== "admin") {
      return Response.json({ message: "Unauthorized Role" }, { status: 403 });
    }

    const getOrder = await OrderModel.getOrderById(id);
    if (!getOrder) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }

    if (currentStatus === ORDER_STATUS.DP_CONFIRMED) {
      const newStatus = ORDER_STATUS.AWAITING_FULL_PAYMENT;
      updateData.currentStatus = newStatus;
      updateData["downPayment.status"] = ORDER_STATUS.DP_CONFIRMED;
      updateData.fullPayment = {
        status: ORDER_STATUS.AWAITING_FULL_PAYMENT,
        paymentProof: updateData.paymentProof,
        amount: getOrder.totalPrice - getOrder.downPayment.amount
      };
      const success = await OrderModel.updateStatus(id, updateData);
      console.log(success, "success");

      if (success) {
        const order = await OrderModel.getOrderById(id);
        if (!order) {
          throw { message: "Order not found", status: 404 };
        }

        if (order && order.groupBuyId) {
          const groupBuyExists = await GroupBuyModel.findById(
            order.groupBuyId as string
          );
          if (!groupBuyExists) {
            throw { message: "Group buy not found", status: 404 };
          }

          await GroupBuyModel.updateGroupBuy(
            order.groupBuyId as string,
            order.distributorId as string,
            order.items.quantity
          );
        }

        await NotificationModel.create({
          userId: order.userId,
          title: "Order Confirmed",
          message: `Your order with ID ${id} has been confirmed.`,
          groupBuyId: order.groupBuyId
        });

        return Response.json({
          success: true,
          message: "Payment confirmed and user added to participants."
        });
      } else {
        throw { message: "Failed to update order status", status: 500 };
      }
    } else if (currentStatus === ORDER_STATUS.FULLPAYMENT_CONFIRMED) {
      const newStatus = ORDER_STATUS.PAID_IN_FULL;
      updateData.currentStatus = newStatus;
      updateData["fullPayment.status"] = ORDER_STATUS.FULLPAYMENT_CONFIRMED;
      const success = await OrderModel.updateStatus(id, updateData);

      if (success) {
        const order = await OrderModel.getOrderById(id);
        if (!order) {
          throw { message: "Order not found", status: 404 };
        }

        await NotificationModel.create({
          userId: order.userId,
          title: "Full Payment Confirmed",
          message: `Your full payment for order ID ${id} has been confirmed.`,
          groupBuyId: order.groupBuyId
        });

        return Response.json({
          success: true,
          message: "Full payment confirmed."
        });
      } else {
        throw { message: "Failed to update order status", status: 500 };
      }
    }
  } catch (error) {
    console.error("Error updating group buy:", error);
    return errorHandler(error);
  }
}

/* 
    const userData = request.headers.get("x-user-data");

    if (!userData) {
      throw { message: "Header 'x-user-data' is required", status: 400 };
    }

    let userDataJson;
    try {
      if (userData.startsWith("{")) {
        userDataJson = JSON.parse(userData);
      } else {
        userDataJson = { _id: userData };
      }
    } catch (error) {
      throw {
        message: "Invalid JSON or encoding in 'x-user-data' header",
        status: 400
      };
    }
    */
