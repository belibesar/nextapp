import CartModel from "@/db/models/CartModel";
import UserModel from "@/db/models/UserModel";
import errorHandler from "@/lib/errorHandler";

export async function POST(request: Request) {
  // nambah produk ke keranjang
  // nerima {_id} dari produk
  // qty secara default dipaksa jadi 1 lalu nantinya diupdate di patch
  try {
    const data = await request.json();
    // console.log(data, "ini data dari body");
    const productId = data._id;
    if (!productId) throw { message: "Invalid productId", status: 400 };
    // console.log(productId, "ini product id dari body");

    // cek user
    const userData = request.headers.get("x-user-data");
    const userDataJson = userData ? JSON.parse(userData) : null;

    const user = await UserModel.findById(userDataJson._id);
    if (!user) throw { message: "User not found", status: 404 };
    if (user.role !== "distributor")
      throw { message: "Invalid role", status: 403 };

    const addToCart = await CartModel.addToCart(userDataJson._id, productId);
    console.log(addToCart, "ini add to cart dari return cart model");

    return Response.json(addToCart);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId)
      throw { message: "User id is missing in headers", status: 401 };

    const { productId, qty } = await request.json();

    if (!userId) throw { message: "User id is missing", status: 404 };
    if (!productId) throw { message: "Product id is missing", status: 404 };

    const updatedCart = await CartModel.updateQuantity(userId, productId, qty);
    return Response.json(updatedCart);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET(request: Request) {
  try {
    // cek user
    const userData = request.headers.get("x-user-data");
    const userDataJson = userData ? JSON.parse(userData) : null;

    const user = await UserModel.findById(userDataJson._id);
    if (!user) throw { message: "User not found", status: 404 };
    if (user.role !== "distributor")
      throw { message: "Invalid role", status: 403 };

    const cart = await CartModel.getCartWithProducts(userDataJson._id);
    return Response.json(cart);
  } catch (error) {
    return errorHandler(error);
  }
}
