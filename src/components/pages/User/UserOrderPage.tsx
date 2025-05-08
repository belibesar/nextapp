"use client";
import { OrderType, ProductType, UserType } from "@/types/types";
import { useEffect, useState } from "react";
import UserComponentOrderPage from "./UserComponentOrderPage";
// import { getLoggedInUserFromRequest } from "@/lib/getLoggedInUserFromRequest";
import { toast, ToastContainer } from "react-toastify";

const FILTERS = [
  "ALL",
  "AWAITING_ADMIN_CONFIRMATION",
  "AWAITING_ADMIN_CONFIRMATION_FULL",
  "AWAITING_FULL_PAYMENT",
  "PAID_IN_FULL",
  "CANCELLED"
];

const UserOrderPage = ({
  userId,
  user
}: {
  userId: string;
  user: UserType;
}) => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [filter, setFilter] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [orderId, setOrderId] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await fetch(
          `http://localhost:3000/api/orders/${userId}`
        );
        const ordersData = await orders.json();
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (filter === "ALL") return true;
    return (order.currentStatus?.toUpperCase() ?? "") === filter;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = async () => {
    try {
      if (!selectedFile) {
        throw new Error("Please select a file first.");
      }
      setUploading(true);
      setUploadError("");
      const formData = new FormData();
      formData.append("paymentProof", selectedFile);
      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }
      const res = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
        method: "POST",
        body: formData
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to upload payment proof.");
      }
      const data = await res.json();
      if (data.updateStatus) {
        toast.success("Payment proof uploaded successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      } else {
        throw new Error(data.message || "Failed to upload payment proof.");
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } finally {
      closeModal();
      setUploading(false);
      window.location.reload(); // Refresh the page to see the updated status
    }
  };

  const openModal = (
    orderId: string,
    totalPrice: number,
    product: ProductType
  ) => {
    setIsModalOpen(true); // Set modal visibility to true when button is clicked
    setOrderId(orderId);
    setTotalPrice(totalPrice);
    setProduct(product);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal by setting visibility to false
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID").format(amount);
  };

  return (
    <>
      <div className="h-screen mb-5">
        {FILTERS.map((filters) => (
          <button
            key={filters}
            className={`btn btn-sm ${
              filter === filters ? "bg-blue-600 text-white" : "bg-gray-200"
            } hover:bg-gray-400 text-gray-700 border-none mr-2`}
            onClick={() => setFilter(filters)}
          >
            {filters.replace(/_/g, " ")}
          </button>
        ))}
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) =>
            order._id ? (
              <UserComponentOrderPage
                key={order._id.toString()}
                orderData={order}
                openModal={openModal}
              />
            ) : null
          )
        ) : (
          <p className="text-gray-500 mt-15 pl-15">No orders with selected status</p>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full h-[380px] pt-10">
            <button
              onClick={closeModal}
              className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-xl font-bold w-10 h-10"
            >
              &times;
            </button>

            <h3 className="text-2xl font-bold text-center mb-4">Payment</h3>
            <p className="text-center mb-4 text-sm">
              Transfer to this Account to finish payment
            </p>

            <div className="flex justify-between mt-2">
              <h3 className="font-semibold">23908593408590</h3>
              <h3 className="font-semibold">10% DP</h3>
            </div>
            <div className="flex justify-between">
              <p>{user.bankAccount?.name}</p>
              <h3 className="font-semibold">Total</h3>
            </div>
            <div className="flex justify-between">
              <p>{product?.producer && product?.producer.name}</p>
              <h3 className="font-semibold">
                Rp. {formatCurrency(totalPrice)}
              </h3>
            </div>

            <div className="flex flex-col justify-center mt-2">
              <label
                htmlFor="paymentProof"
                className="text-sm font-semibold text-center mt-5"
              >
                Upload your transfer note
              </label>
              <div className="flex flex-row items-center justify-center mt-2">
                <input
                  id="paymentProof"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="self-center w-50 items-center text-center bg-gray-600 text-sm text-white py-1 px-2 rounded-md hover:cursor-pointer hover:bg-gray-700"
                />
              </div>

              {uploading && (
                <p className="text-center text-sm text-blue-600">
                  Uploading...
                </p>
              )}
              {uploadError && (
                <p className="text-center text-sm text-red-600">
                  {uploadError}
                </p>
              )}
            </div>

            <div className="flex flex-col justify-center mt-5">
              <p className="text-xs text-center">
                Press this button if payment process already finished
              </p>
              <button
                className="self-center w-30 bg-blue-400 rounded-md hover:bg-blue-500 hover:cursor-pointer text-sm font-semibold text-white mt-1 pt-1 pb-1"
                onClick={handleUploadClick}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default UserOrderPage;
