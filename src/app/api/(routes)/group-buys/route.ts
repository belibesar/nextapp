import { NextRequest, NextResponse } from "next/server";
import GroupBuyModel from "@/db/models/GroupBuyModel";
import errorHandler from "@/lib/errorHandler";

export async function GET() {
    try {
        const groupBuys = await GroupBuyModel.findAll({});
        return Response.json(groupBuys);
    } catch (error) {
        console.error("Error fetching group buys:", error);
        return errorHandler(error);
    }
}

export async function POST(request: Request) {
    try {
        const groupBuy = await request.json();
        const insertedId = await GroupBuyModel.create(groupBuy);
        return Response.json({ success: true, insertedId }, { status: 201 });
    } catch (error) {
        console.error("Error creating group buy:", error);
        return errorHandler(error);
    }
}