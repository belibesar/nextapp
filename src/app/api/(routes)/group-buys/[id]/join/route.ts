import GroupBuyModel from "@/db/models/GroupBuyModel";
import OrderModel from "@/db/models/OrderModel";
import NotificationModel from "@/db/models/NotificationModel";
import errorHandler from "@/lib/errorHandler";
import UserModel from "@/db/models/UserModel";
import { cloudinary } from "@/lib/cloudinaryConfig";
import { GroupBuy, GroupBuyStatus, ORDER_STATUS } from "@/types/types";
import { Readable } from "stream";

export async function POST(request: Request) {
  try {
    const id = new URL(request.url).pathname.split("/").slice(-2)[0];
    const formData = await request.formData();
    const quantity = parseInt(formData.get("quantity") as string, 10);
    const paymentProof = formData.get("paymentProof") as File;
    if (!paymentProof) {
      throw { message: "Payment proof is required", status: 400 };
    }

    const groupBuyArr = await GroupBuyModel.findById(id);
    const groupBuy = groupBuyArr[0] as GroupBuy;
    if (!groupBuy || groupBuy.status !== GroupBuyStatus.OPEN) {
      return Response.json({ message: "Group Buy is not open" });
    }

    const userData = request.headers.get("x-user-data");
    const userDataJson = userData ? JSON.parse(userData) : null;
    const distributorId = userDataJson?._id;

    const user = await UserModel.findById(distributorId);
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }
    if (user.role !== "distributor") {
      return Response.json({ message: "Unauthorized Role" }, { status: 403 });
    }

    const alreadyJoined = await OrderModel.hasJoinedGroupBuy(distributorId, id);

    if (alreadyJoined)
      throw { message: "You have already joined this Group Buy.", status: 400 };

    if (quantity < groupBuy.minTargetQuantity) {
      throw { message: `Minimum quantity is ${groupBuy.minTargetQuantity}` };
    }
    if (quantity > groupBuy.maxTargetQuantity) {
      throw { message: `Maximum quantity is ${groupBuy.maxTargetQuantity}` };
    }

    const totalPrice = groupBuy.productDetails
      ? quantity * groupBuy.productDetails.price
      : 0;
    const percentage =
      (groupBuy.productDetails ? groupBuy.productDetails.price : 0) /
      groupBuy.depositPercentage;
    const depositAmount = totalPrice * (percentage / 100);

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

    const order = await OrderModel.create({
      distributorId,
      items: {
        productId: groupBuy.productId,
        quantity
      },
      totalPrice,
      currentStatus: paymentProof
        ? ORDER_STATUS.AWAITING_ADMIN_CONFIRMATION
        : ORDER_STATUS.AWAITING_FULL_PAYMENT,
      groupBuyId: groupBuy._id!,
      downPayment: {
        status: ORDER_STATUS.AWAITING_ADMIN_CONFIRMATION,
        paymentProof: paymentProofUrl,
        amount: depositAmount,
        percentage: percentage
      },
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await NotificationModel.create({
      userId: distributorId,
      title: "Yeayy!!",
      message: `You have joined the Group Buy: ${groupBuy.productDetails?.name}`
    });

    const getAdmins = await UserModel.getAllAdmin();
    const adminIds = getAdmins.map((admin) => admin._id);
    // :v
    adminIds.forEach(async (adminId) => {
      await NotificationModel.createAdmin({
        userId: adminId,
        title: "New Group Buy Participant",
        message: `${user.name} has joined the Group Buy for: ${groupBuy.productDetails?.name}`
      });
    });

    return Response.json({
      success: true,
      orderId: order.insertedId,
      quantity,
      totalPrice,
      depositAmount,
      message: paymentProof
        ? "Deposit payment submitted. Awaiting admin confirmation."
        : "Full payment required. Please complete your payment."
    });
  } catch (error) {
    console.error("Error joining Group Buy:", error);
    return errorHandler(error);
  }
}
