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
  // buat update qty produk di cart
  // nerima {_id, qty} dari body
  // qty yang diterima replace qty yang ada di cart
  try {
    // cek user
    const userData = request.headers.get("x-user-data");
    const userDataJson = userData ? JSON.parse(userData) : null;

    const user = await UserModel.findById(userDataJson._id);
    if (!user) throw { message: "User not found", status: 404 };
    if (user.role !== "distributor")
      throw { message: "Invalid role", status: 403 };

    const { _id, qty } = await request.json();

    if (!_id) throw { message: "Product id is missing", status: 404 };
    if (!qty) throw { message: "Quantity is missing", status: 404 };
    if (qty <= 0 || isNaN(qty))
      throw {
        message: "Quantity must be a number greater than 0",
        status: 400
      };

    const updatedCart = await CartModel.updateQuantity(
      userDataJson._id,
      _id,
      qty
    );

    if (!updatedCart) throw { message: "Cart not found", status: 404 };
    return Response.json({ message: "Cart updated" });
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
