"use client";
import { OrderType } from "@/types/types";
import React from "react";
import { useEffect } from "react";
import { ProductType } from "@/types/types";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function AdminComponentOrderPage({
  order
}: {
  order: OrderType;
}) {
  const [product, setProduct] = React.useState<ProductType>({} as ProductType);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/products/${order.items?.productId}`
        );
        const productData = await res.json();

        setProduct(productData);
      } catch (err) {
        console.error("Error fetching product or distributor:", err);
      }
    };

    fetchProduct();
  }, [order.items]);

  const getNextStatus = (currentStatus: string) => {
    // Normalize 'pending' to 'PENDING' and leave the other statuses in uppercase
    const normalizedStatus =
      currentStatus === "pending" ? "PENDING" : currentStatus.toUpperCase();
    const nextStatus = (function () {
      switch (normalizedStatus) {
        case "PENDING":
          return "AWAITING_ADMIN_CONFIRMATION";
        case "AWAITING_ADMIN_CONFIRMATION":
          return "DP_CONFIRMED";
        case "DP_CONFIRMED":
          return "AWAITING_ADMIN_CONFIRMATION_FULL";
        case "AWAITING_ADMIN_CONFIRMATION_FULL":
          return "FULLPAYMENT_CONFIRMED";
        case "FULLPAYMENT_CONFIRMED":
          return "AWAITING_FULL_PAYMENT";
        case "AWAITING_FULL_PAYMENT":
          return "PAID_IN_FULL";
        case "PAID_IN_FULL":
          return "PAID_IN_FULL";
        default:
          return "AWAITING_ADMIN_CONFIRMATION";
      }
    })();
    return nextStatus;
  };

  const handleNext = async () => {
    const nextStatus = getNextStatus(
      order.currentStatus ?? "AWAITING_ADMIN_CONFIRMATION"
    );
    console.log(nextStatus, "next status");

    try {
      const res = await fetch(`http://localhost:3000/api/orders/${order._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Pass the admin user data as needed in the headers
          "x-user-data": JSON.stringify({ _id: "adminId" }) // Adjust based on how the admin data is managed
        },
        body: JSON.stringify({ currentStatus: nextStatus })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success(`Status updated to ${nextStatus}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      window.location.reload(); // Refresh the page to see the updated status
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  const handleCancel = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmation) return;

    try {
      const cancelStatus = "CANCELLED";

      const res = await fetch(`http://localhost:3000/api/orders/${order._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-data": JSON.stringify({ _id: "adminId" }) // Adjust based on how the admin data is managed
        },
        body: JSON.stringify({ currentStatus: cancelStatus })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("The order has been canceled.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel the order", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  const dates = new Date(order.createdAt ?? Date.now());
  const formattedDate = `${dates.getDate()}-${
    dates.getMonth() + 1
  }-${dates.getFullYear()}`;
  const producerName = product?.producer?.name ?? "Unknown Producer";
  const productId = product?._id?.toString() ?? "Unknown Product ID";

  const formattedSinglePrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  })
    .format(product.price ?? 0)
    .replace("IDR", "Rp.");
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  })
    .format(order.totalPrice ?? 0)
    .replace("IDR", "Rp.");

  const disabledNextButton =
    order.currentStatus === "PAID_IN_FULL" ||
    order.currentStatus === "CANCELLED" ||
    order.currentStatus === "AWAITING_FULL_PAYMENT"
      ? true
      : false;

  return (
    <>
      {/* Order Cards */}
      <div className="space-y-6 mt-5">
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
              <div className="flex flex-col items-center gap-2">
                <p className="badge badge-outline">
                  Ordered At {formattedDate}
                </p>
                <div className="flex justify-between flex-row w-full">
                  <button
                    className={`border-1 p-2 w-20 rounded-md duration-200 
                        ${
                          disabledNextButton
                            ? "bg-gray-400 text-gray-200 cursor-not-allowed" // Disabled color
                            : "bg-green-600 text-white hover:cursor-pointer hover:bg-green-700"
                        }`}
                    onClick={handleNext}
                    disabled={disabledNextButton}
                  >
                    next
                  </button>
                  <button
                    className={`border-1 p-2 w-20 rounded-md duration-200 
                        ${
                          order.currentStatus === "CANCELLED"
                            ? "bg-gray-400 text-gray-200 cursor-not-allowed" // Disabled color
                            : "bg-red-600 text-white hover:cursor-pointer hover:bg-red-700"
                        }`}
                    onClick={handleCancel}
                    disabled={order.currentStatus === "CANCELLED"}
                  >
                    cancel
                  </button>
                </div>
              </div>
            </div>

            <div className="divider my-1"></div>

            <div className="space-y-4 mt-2">
              {/* First Item */}
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">
                    {product.name ?? "Unknown Product"}
                  </p>
                  <p className="text-gray-600">{producerName}</p>
                  <p className="text-gray-500 text-sm">
                    Product ID {productId}
                  </p>
                </div>
                <div className="text-right">
                  <p>{order.items?.quantity ?? 0} Paket</p>
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
      <ToastContainer />
    </>
  );
}
