import { OrderType } from "@/types/types";
import React from "react";

const UserOrderPage = async ({ order }: { order: OrderType }) => {
  const dates = new Date(order.createdAt || Date.now());
  const formattedDate = `${dates.getDate()}-${
    dates.getMonth() + 1
  }-${dates.getFullYear()}`;
  console.log(order, "order from user order page");

  if (!order.items) {
    throw new Error("Order items are undefined or empty");
  }
  const product = await fetch(
    `http://localhost:3000/api/products/${order.items.productId}`
  );
  const productData = await product.json();
  console.log(productData, "productData from user order page");
  const producerName = productData.producer.name;
  const productId = productData._id.toString();

  const formattedSinglePrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  })
    .format(productData.price ?? 0)
    .replace("IDR", "Rp.");
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  })
    .format(order.totalPrice ?? 0)
    .replace("IDR", "Rp.");
  return (
    <>
      <div className="mb-5">
        {/* Order Cards */}
        <div className="space-y-6">
          {/* First Order */}
          <div className="card bg-base-100 shadow-md border border-gray-200">
            <div className="card-body">
              <div className="flex justify-between mb-2">
                <div>
                  <p>
                    <span className="font-semibold">Order ID:</span>{" "}
                    <span className="badge badge-sm">
                      {order._id?.toString()}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className="badge badge-warning badge-sm">
                      {order.currentStatus}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Items:</span>
                  </p>
                </div>
                <div>
                  <p className="badge badge-outline">
                    Ordered At {formattedDate}
                  </p>
                </div>
              </div>

              <div className="divider my-1"></div>

              <div className="space-y-4 mt-2">
                {/* First Item */}
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{productData.name}</p>
                    <p className="text-gray-600">{producerName}</p>
                    <p className="text-gray-500 text-sm">
                      Product ID {productId}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>{order.items.quantity} Paket</p>
                    <p className="font-medium">{formattedSinglePrice}</p>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-end border-t pt-2">
                  <p className="font-semibold bg-[#0088c2] text-white px-4 py-2 rounded-lg">
                    Total: {formattedPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrderPage;
