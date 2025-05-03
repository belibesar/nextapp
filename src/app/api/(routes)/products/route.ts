import ProductModel from "@/db/models/ProductModel";
import UserModel from "@/db/models/UserModel";
import errorHandler from "@/lib/errorHandler";
import { NextRequest } from "next/server";

export async function POST(request: Request) {
  try {
    const newProduct = await request.json();

    const userData = request.headers.get("x-user-data");
    const userDataJson = userData ? JSON.parse(userData) : null;
    const user = await UserModel.findById(userDataJson._id);
    if (!user) throw { message: "User not found", status: 404 };

    if (user.role !== "admin") throw { message: "Unauthorized", status: 403 };

    const product = await ProductModel.create(newProduct);

    return Response.json({ message: "Product successfully created", product });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";

  const products = await ProductModel.getAll({ page, search });
  return Response.json(products);
}
