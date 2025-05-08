"use server";
import UserOrderPage from "@/components/pages/User/UserOrderPage";
import AdminOrderPage from "@/components/pages/Admin/AdminOrderPage";
import { getLoggedInUserFromRequest } from "@/lib/getLoggedInUserFromRequest";
import React from "react";
import { cookies } from "next/headers";
import { OrderType, UserType } from "@/types/types";

const Orders = async () => {
  const fetchUser = await getLoggedInUserFromRequest();
  if (!fetchUser) {
    throw new Error("User not found or invalid user type");
  }
  const user = JSON.parse(JSON.stringify(fetchUser)) as UserType;
  const userId: string = user._id?.toString();

  try {
    return (
      <div>
        {/* Main Content */}
        <main className="container mx-auto px-6 py-8 flex-grow">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>

          {(user as UserType).role === "admin" ? (
            <AdminOrderPage />
          ) : (
            <UserOrderPage userId={userId} user={user} />
          )}
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

export default Orders;
