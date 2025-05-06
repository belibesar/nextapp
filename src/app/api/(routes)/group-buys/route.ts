import { NextResponse } from "next/server";
import GroupBuyModel from "@/db/models/GroupBuyModel";
import errorHandler from "@/lib/errorHandler";
import { GroupBuy, GroupBuyStatus } from "@/types/types";
import ProductModel from "@/db/models/ProductModel";

export async function GET() {
  try {
    const groupBuys = await GroupBuyModel.findAllWithProducts();
    return Response.json(groupBuys);
  } catch (error) {
    console.error("Error fetching group buys:", error);
    return errorHandler(error);
  }
}

export async function POST(request: Request) {
  try {
    const groupBuyData = await request.json();

    const product = await ProductModel.findById(groupBuyData.productId);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Invalid productId" },
        { status: 400 }
      );
    }
        const groupBuy: GroupBuy = {
            productId: new ObjectId(groupBuyData.productId),
            productName: product.name,
            price: product.price,
            minTargetQuantity: groupBuyData.minTargetQuantity || 10,
            maxTargetQuantity: groupBuyData.maxTargetQuantity || 50,
            minUserOrder: groupBuyData.minUserOrder || 1,
            currentOrders: 0,
            depositPercentage: product.price * 0.1,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            participants: [],
            distributionLocation: groupBuyData.distributionLocation || "",
            description: groupBuyData.description || "",
            status: GroupBuyStatus.OPEN,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

    const insertedId = await GroupBuyModel.create(groupBuy);

    return NextResponse.json({ success: true, insertedId }, { status: 201 });
  } catch (error) {
    console.error("Error creating group buy:", error);
    return errorHandler(error);
  }
}
