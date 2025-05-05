import GroupBuyModel from "@/db/models/GroupBuyModel";
import OrderModel from "@/db/models/OrderModel";
import NotificationModel from "@/db/models/NotificationModel";
import errorHandler from "@/lib/errorHandler";

export async function POST(request: Request) {
    try {
        const id  = new URL(request.url).pathname.split("/").slice(-2)[0]; // Group Buy ID
        const { distributorId, supplierId, quantity } = await request.json();

        // Validasi apakah Group Buy masih OPEN
        const groupBuy = await GroupBuyModel.findById(id);
        if (!groupBuy || groupBuy.status !== "OPEN") {
            return Response.json({  message: "Group Buy is not open" });
        }

        // Validasi quantity
        if (quantity < groupBuy.moq) {
            throw { message: `Minimum quantity is ${groupBuy.moq}` }
        }
        if (quantity > groupBuy.maxQuantity) {
            throw { message: `Maximum quantity is ${groupBuy.maxQuantity}` }
        }

        // Hitung pembayaran awal (10% dari total harga)
        const totalPrice = quantity * groupBuy.price;
        const depositAmount = totalPrice * (groupBuy.depositPercentage / 100);

        // Buat data Order
        const orderId = await OrderModel.create({
            distributorId,
            supplierId,
            items: [
                {
                    productId: groupBuy.productId,
                    productName: groupBuy.productName,
                    quantity,
                    price: groupBuy.price,
                },
            ],
            totalPrice,
            currentStatus: "DEPOSIT_PENDING",
            isGroupBuy: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Buat notifikasi untuk user dan admin
        await NotificationModel.create({
            userId: distributorId,
            message: `You have joined the Group Buy: ${groupBuy.productName}`,
            createdAt: new Date(),
        });

        await NotificationModel.create({
            userId: "admin", // Assuming "admin" is the admin user ID
            message: `Distributor ${distributorId} has joined the Group Buy: ${groupBuy.productName}`,
            createdAt: new Date(),
        });

        // Kembalikan informasi pembayaran awal
        return Response.json({
            success: true,
            orderId,
            depositAmount,
            message: `Please pay the deposit amount of ${depositAmount}`,
        });
    } catch (error) {
        console.error("Error joining Group Buy:", error);
        return errorHandler(error);
    }
}