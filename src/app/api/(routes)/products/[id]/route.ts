import ProductModel from "@/db/models/ProductModel";
import errorHandler from "@/lib/errorHandler";


export async function GET(request: Request, { params }: { params: Promise<{ id: string}>}) {
    try {
        const { id } = await params;
        const product = await ProductModel.findById(id);

        if (!product) {
            throw { message: "Product not found", status: 404 };
        }

        return Response.json(product);
    } catch (error) {
        return errorHandler(error);
    }
}