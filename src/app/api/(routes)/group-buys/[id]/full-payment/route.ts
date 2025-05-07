import GroupBuyModel from "@/db/models/GroupBuyModel";
import OrderModel from "@/db/models/OrderModel";
import { cloudinary } from "@/lib/cloudinaryConfig";
import errorHandler from "@/lib/errorHandler";
import { GroupBuyStatus, ORDER_STATUS } from "@/types/types";
import { NextRequest } from "next/server";
import { Readable } from "stream";

export async function POST(request: NextRequest) {
    try {
        const id = new URL(request.url).pathname.split("/").slice(-2)[0]; // group-buy ID
        const formData = await request.formData();
        const fullPaymentProof = formData.get("fullPaymentProof") as File;

        if (!fullPaymentProof) {
            return Response.json({ message: "Payment proof is required", status: 400 });
          }
        
        const userData = request.headers.get("x-user-data");
        const userDataJson = userData ? JSON.parse(userData) : null;
        const distributorId = userDataJson?._id;

        // Validasi group buy
        const groupBuyArr = await GroupBuyModel.findById(id);
        const groupBuy = groupBuyArr[0];
        if (!groupBuy || groupBuy.status !== GroupBuyStatus.MOQ_REACHED) {
            throw { message: "Group Buy is not eligible for full payment", status: 400 };
        }

        // Cari order berdasarkan distributorId dan groupBuyId
        const order = await OrderModel.findGroupBuyOrder(distributorId, id);
        if (!order) {
            throw { message: "Order not found", status: 404 };
        }

        // Validasi jika status order sesuai untuk full payment
        if (order.currentStatus !== ORDER_STATUS.AWAITING_FULL_PAYMENT) {
            return Response.json({ message: "Order is not awaiting full payment" }, { status: 400 });
        }

        // Upload payment proof to Cloudinary
        const buffer = Buffer.from(await fullPaymentProof.arrayBuffer());

        const stream = cloudinary.uploader.upload_stream(
            {
              folder: "full-payments",
              resource_type: "image",
            },
            async (error, result) => {
              if (error || !result) {
                console.error(error);
                return Response.json(
                  { message: "Upload failed", status: 500 },
                  { status: 500 }
                );
              }
      
              const paymentProofUrl = result.secure_url;
      
              await OrderModel.updateOrder(order._id.toString(), {
                fullPaymentProof: paymentProofUrl,
                currentStatus: ORDER_STATUS.AWAITING_ADMIN_CONFIRMATION_FULL,
                updatedAt: new Date(),
              });
      
              return Response.json({
                success: true,
                message: "Full payment submitted. Awaiting admin confirmation.",
              });
            }
          );
      
          Readable.from(buffer).pipe(stream);
    } catch (error) {
        errorHandler(error);
    }
}