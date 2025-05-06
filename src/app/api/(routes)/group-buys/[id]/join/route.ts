import GroupBuyModel from "@/db/models/GroupBuyModel";
import OrderModel from "@/db/models/OrderModel";
import NotificationModel from "@/db/models/NotificationModel";
import errorHandler from "@/lib/errorHandler";

export async function POST(request: Request) {
    try {
        const id = new URL(request.url).pathname.split("/").slice(-2)[0]; // Group Buy ID
        const { quantity, paymentProof } = await request.json();

        // Validasi apakah Group Buy masih OPEN
        const groupBuy = await GroupBuyModel.findById(id);
        if (!groupBuy || groupBuy.status !== "OPEN") {
            return Response.json({ message: "Group Buy is not open" });
        }

        // Ambil distributorId dari header
        const distributorId = request.headers.get("x-user-id");
        if (!distributorId) {
            throw { message: "Distributor ID is required in the request headers." };
        }

        const supplierId = groupBuy.supplierId;

        // Validasi quantity
        if (quantity < groupBuy.minQuantity) {
            throw { message: `Minimum quantity is ${groupBuy.minQuantity}` };
        }
        if (quantity > groupBuy.maxQuantity) {
            throw { message: `Maximum quantity is ${groupBuy.maxQuantity}` };
        }

        // Hitung total harga dan jumlah pembayaran
        const totalPrice = quantity * groupBuy.price;
        const depositAmount = totalPrice * (groupBuy.depositPercentage / 100);
        const paymentAmount = paymentProof ? depositAmount : totalPrice; // DP jika ada paymentProof, full jika tidak

        // Buat data Order
        const order = await OrderModel.create({
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
            currentStatus: paymentProof ? "AWAITING_ADMIN_CONFIRMATION" : "FULL_PAYMENT_PENDING",
            isGroupBuy: true,
            paymentProof: paymentProof || null, // Simpan paymentProof jika ada
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const updateResult = await GroupBuyModel.updateGroupBuy(id, {
            $push: {
                participants: {
                    distributorId, 
                    qty: quantity,
                    joinedAt: new Date(), 
                },
            },
            $inc: { currentOrders: quantity }, 
        });

        if (!updateResult) {
            throw { message: "Failed to update Group Buy participants." };
        }

        // Buat notifikasi untuk user
        await NotificationModel.create({
            userId: distributorId,
            message: `You have joined the Group Buy: ${groupBuy.productName}`,
            createdAt: new Date(),
        });

        // Buat notifikasi untuk admin jika ada paymentProof
        if (paymentProof) {
            await NotificationModel.create({
                userId: "admin",
                message: `Order ${order.insertedId} requires your confirmation.`,
                createdAt: new Date(),
            });
        } else {
            await NotificationModel.create({
                userId: "admin",
                message: `Distributor ${distributorId} has joined the Group Buy: ${groupBuy.productName}`,
                createdAt: new Date(),
            });
        }

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
                : "Full payment required. Please complete your payment.",
        });
    } catch (error) {
        console.error("Error joining Group Buy:", error);
        return errorHandler(error);
    }
}