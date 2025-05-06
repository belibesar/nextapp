import GroupBuyModel from "@/db/models/GroupBuyModel";
import OrderModel from "@/db/models/OrderModel";
import NotificationModel from "@/db/models/NotificationModel";
import errorHandler from "@/lib/errorHandler";
import UserModel from "@/db/models/UserModel";
import { GroupBuy } from "@/types/types";

export async function POST(request: Request) {
  try {
    const id = new URL(request.url).pathname.split("/").slice(-2)[0]; // Group Buy ID
    const { quantity, paymentProof } = await request.json();

    // Validasi apakah Group Buy masih OPEN
    const groupBuyArr = await GroupBuyModel.findById(id);
    const groupBuy = groupBuyArr[0] as GroupBuy;
    if (!groupBuy || groupBuy.status !== "OPEN") {
      return Response.json({ message: "Group Buy is not open" });
    }

    // console.log(groupBuy, "Group Buy Data");

    // Ambil distributorId dari header
    const userData = request.headers.get("x-user-data");
    const userDataJson = userData ? JSON.parse(userData) : null;
    const distributorId = userDataJson?._id; // Ambil userId dari token yang sudah di-decode

    // Validasi apakah user ada dalam database dan memiliki role distributor
    const user = await UserModel.findById(distributorId);
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }
    if (user.role !== "distributor") {
      return Response.json({ message: "Unauthorized Role" }, { status: 403 });
    }

    // Validasi quantity
    if (quantity < groupBuy.minTargetQuantity) {
      throw { message: `Minimum quantity is ${groupBuy.minTargetQuantity}` };
    }
    if (quantity > groupBuy.maxTargetQuantity) {
      throw { message: `Maximum quantity is ${groupBuy.maxTargetQuantity}` };
    }

    // Hitung total harga dan jumlah pembayaran
    const totalPrice = groupBuy.productDetails
      ? quantity * groupBuy.productDetails.price
      : 0;
    const depositAmount = totalPrice * (groupBuy.depositPercentage / 100);
    const paymentAmount = paymentProof ? depositAmount : totalPrice; // DP jika ada paymentProof, full jika tidak

    // Update Group Buy dengan join sebagai distributor
    const updateResult = await GroupBuyModel.updateGroupBuy(
      id,
      distributorId,
      quantity
    );

    if (!updateResult) {
      throw { message: "Failed to update Group Buy participants." };
    }

    // Buat data Order
    const order = await OrderModel.create({
      distributorId,
      items: [
        {
          productId: groupBuy.productId,
          productName: groupBuy.productDetails
            ? groupBuy.productDetails.name
            : "",
          quantity,
          price: groupBuy.productDetails ? groupBuy.productDetails.price : 0
        }
      ],
      totalPrice,
      currentStatus: paymentProof
        ? "AWAITING_ADMIN_CONFIRMATION"
        : "FULL_PAYMENT_PENDING",
      isGroupBuy: true,
      paymentProof: paymentProof || null, // Simpan paymentProof jika ada
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Buat notifikasi untuk user
    await NotificationModel.create({
      userId: distributorId,
      message: `You have joined the Group Buy: ${groupBuy.productDetails?.name}`
    });

    // console.log(userNotification, "User Notification");

    // =================== YANG DI BAWAH INI DI DISABLE DULU, NANTI KALO SIAP BARU GAS ===================
    // Get all users with role 'admin'
    // const admins = await UserModel.getAllAdmin();
    // Extract admin IDs
    // const adminIds = admins.map((admin) => admin._id.toString());

    // Buat notifikasi untuk admin jika ada paymentProof
    // =================== NANTI INI LOOP SETIAP ADMIN ID BUAT CREATE NOTIFIKASI ===================
    // if (paymentProof) {
    //   await NotificationModel.create({
    //     userId: "admin",
    //     message: `Order ${order.insertedId} requires your confirmation.`
    //   });
    // } else {
    //   await NotificationModel.create({
    //     userId: "admin",
    //     message: `Distributor ${distributorId} has joined the Group Buy: ${groupBuy.productDetails?.name}`
    //   });
    // }

    // Kembalikan informasi pembayaran
    return Response.json({
      success: true,
      orderId: order.insertedId,
      quantity,
      totalPrice,
      depositAmount,
      paymentAmount,
      message: paymentProof
        ? "Deposit payment submitted. Awaiting admin confirmation."
        : "Full payment required. Please complete your payment."
    });
  } catch (error) {
    console.error("Error joining Group Buy:", error);
    return errorHandler(error);
  }
}
