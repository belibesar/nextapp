import ProductModel from "@/db/models/ProductModel";
import errorHandler from "@/lib/errorHandler";
import { NextRequest } from "next/server";


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { newProduct, userRole, supplierId } = body;

        const products = await ProductModel.create(newProduct, userRole, supplierId);
        
        return Response.json(products)
    } catch (error) {
        return errorHandler(error)
    }
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const search = searchParams.get("search") || "";

    const products = await ProductModel.getAll({ page, search });
    return Response.json(products);
}


