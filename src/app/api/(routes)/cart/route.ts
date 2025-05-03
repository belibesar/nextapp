import CartModel from "@/db/models/CartModel";
import errorHandler from "@/lib/errorHandler";


export async function POST(request: Request) {
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) throw { message: "User id is missing in headers", status: 401 };

        const { productId, qty } = await request.json();

        if (!productId) throw { message: "Product id is missing", status: 400 };

        const updatedCart = await CartModel.addToCart(userId, productId, qty);
        return Response.json(updatedCart);
    } catch (error) {
        return errorHandler(error);
    }
}

export async function PATCH(request: Request) {
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) throw { message: "User id is missing in headers", status: 401 };
        
        const { productId, qty } = await request.json();

        if (!userId) throw { message: "User id is missing", status: 404 }
        if (!productId) throw { message: "Product id is missing", status: 404 }

        const updatedCart = await CartModel.updateQuantity(userId, productId, qty);
        return Response.json(updatedCart);
    } catch (error) {
        return errorHandler(error);
    }
}

export async function GET(request: Request) {
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) throw { message: "User id is missing in headers", status: 401 };

        const cart = await CartModel.getCartWithProducts(userId);
        return Response.json(cart);
    } catch (error) {
        return errorHandler(error);
    }
}