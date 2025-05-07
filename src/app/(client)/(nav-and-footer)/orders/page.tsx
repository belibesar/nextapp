"use server";
import UserOrderPage from "@/components/pages/User/UserOrderPage";
import AdminOrderPage from "@/components/pages/Admin/AdminOrderPage";
import { getLoggedInUserFromRequest } from "@/lib/getLoggedInUserFromRequest";
import React from "react";
import { cookies } from "next/headers";
import { OrderType, UserType } from "@/types/types";

const Orders = async () => {
  const user = await getLoggedInUserFromRequest();
  if (!user) {
    throw new Error("User not found or invalid user type");
  }

  const cookieStore = await cookies();
  const cookie = cookieStore.get("Authorization")?.value;
  const getOrders = await fetch("http://localhost:3000/api/orders/user", {
    headers: {
      Cookie: `Authorization=${cookie}`
    }
  });
  const orders = await getOrders.json();
  // console.log(orders, "orders from orders page");

  try {
    return (
      <div>
        {/* Main Content */}
        <main className="container mx-auto px-6 py-8 flex-grow">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Admin Orders
          </h1>

          {/* Status Filters */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {["Pending", "Preparing", "Shipped", "Finished", "Failed"].map(
              (status) => (
                <button
                  key={status}
                  className="btn btn-sm bg-gray-300 hover:bg-gray-400 text-gray-800 border-none"
                >
                  {status}
                </button>
              )
            )}
          </div>
          {(user as UserType).role === "admin" ? (
            <AdminOrderPage />
          ) : (
            orders.map((order: OrderType) => (
              <UserOrderPage key={order._id?.toString()} order={order} />
            ))
          )}
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

export default Orders;
