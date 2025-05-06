import { NextRequest, NextResponse } from 'next/server';
import ProductModel from '@/db/models/ProductModel';
import errorHandler from '@/lib/errorHandler';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const search = searchParams.get("search") || "";
        const products = await ProductModel.getAllUnlimited({ search });
        return NextResponse.json(products);
    } catch (error) {
        errorHandler(error);
    }
}