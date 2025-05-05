import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils/jwt";
import errorHandler from "./lib/errorHandler";

export async function middleware(request: NextRequest) {
  try {
    // Exclude GET requests to /api/products
    if (
      request.nextUrl.pathname.startsWith("/api/products") &&
      request.method === "GET"
    ) {
      return NextResponse.next();
    }

    const isApiRequest = request.nextUrl.pathname.startsWith("/api"); // Check if the request is for an API route
    const getCookie = request.cookies.get("Authorization")?.value;
    const [type, token] = getCookie?.split(" ") || [];

    if (!getCookie || type !== "Bearer" || !token) {
      if (isApiRequest) {
        // Use errorHandler for API requests
        return errorHandler({ message: "Unauthorizeds", status: 401 });
      } else {
        // Redirect to login page for client-side requests
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    const tokenPayload = await verifyToken(token as string);
    // ini nanti kalau mau lebih efisien bisa langsung ambil user ke db
    // const user = await UserModel.findById(tokenPayload._id);

    const response = NextResponse.next();
    response.headers.set("x-user-data", JSON.stringify(tokenPayload)); // Set user data in a cookie for client-side access

    return response;
  } catch (error) {
    if (request.nextUrl.pathname.startsWith("/api")) {
      // Use errorHandler for API errors
      return errorHandler({
        message: "Authentication failed",
        status: 401
      });
    }
    console.log(error);
    return errorHandler(error); // Handle other errors
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/orders/:path*",
    "/products/:path*",
    "/profile/:path*",
    "/api/producers:path*",
    "/api/cart:path*",
    "/api/products:path*"
  ]
};
