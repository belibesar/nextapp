import GroupBuyModel from "@/db/models/GroupBuyModel";
import NotificationModel from "@/db/models/NotificationModel";
import OrderModel from "@/db/models/OrderModel";
import UserModel from "@/db/models/UserModel";
import { cloudinary } from "@/lib/cloudinaryConfig";
import errorHandler from "@/lib/errorHandler";
import { ORDER_STATUS, OrderType } from "@/types/types";
import { stat } from "fs";
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

    const updateStatus = await OrderModel.updateStatus(id, updateData as Partial<OrderType>);

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

      const { currentStatus } = await request.json();

      if (!currentStatus) {
          throw { message: "Update data is required", status: 400 };
      }

      // Ensure that the status is valid
      if (!Object.values(ORDER_STATUS).includes(currentStatus)) {
          throw { message: "Invalid order status", status: 400 };
      }

      const getOrder = await OrderModel.getOrderById(id);
      if (!getOrder) {
          return Response.json({ message: "Order not found" }, { status: 404 });
      }

      const updateData = { currentStatus };

      // Correct the flow logic here
      if (currentStatus === ORDER_STATUS.FULLPAYMENT_CONFIRMED) {
          updateData.currentStatus = ORDER_STATUS.PAID_IN_FULL;  // Transition directly to PAID_IN_FULL
      }

      const success = await OrderModel.updateStatus(id, updateData);

      if (!success) {
          throw { message: "Failed to update order status", status: 500 };
      }

      return Response.json({ success: true, message: "Status updated successfully." }, { status: 200 });
  } catch (error) {
      console.error("Error updating order status:", error);
      return errorHandler(error);
  }
}

export async function GET(request: Request) {
  try {
    const id = new URL(request.url).pathname.split("/").pop();
    if (!id) {
      throw { message: "Invalid ID in request URL", status: 400 };
    }

    const order = await OrderModel.getOrderById(id);
    if (!order) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }

    return Response.json(order, { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
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
