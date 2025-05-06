'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GroupBuy, UserType } from '@/types/types';
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function GroupBuyCard({ product, user }: { product: GroupBuy, user: UserType }) {
  const [isQuantityModalOpen, setQuantityModalOpen] = useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleJoinClick = () => {
    console.log('Join button clicked');
    setQuantityModalOpen(true);
  };

  const handleQuantitySubmit = () => {
    
    if (quantity >= product.minUserOrder && quantity <= product.maxTargetQuantity) {
      setQuantityModalOpen(false);
      setPaymentModalOpen(true);
    } else {
      toast.error(`Quantity must be between ${product.minUserOrder} and ${product.maxTargetQuantity}`);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!paymentProof) {
      toast.error('Please upload a payment proof.');
      return;
    }
  
    try {
      const cloudName = 'dfdd1idfq';
      const uploadPreset = 'groupbuy_uploads';
  
      const formData = new FormData();
      formData.append('file', paymentProof);
      formData.append('upload_preset', uploadPreset);
  
      const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
  
      const cloudinaryData = await cloudinaryRes.json();
      const imageURL = cloudinaryData.secure_url;
  
      if (!imageURL) {
        throw new Error('Cloudinary upload failed.');
      }

      const response = await fetch(`http://localhost:3000/api/group-buys/${product._id}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    'x-user-id': user._id
        },
        body: JSON.stringify({
          quantity,
          paymentProof: imageURL,
        }),
      });
  
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error('Failed to join Group Buy: ' + result.message);
      }
    } catch (error) {
      console.error('Error uploading payment proof:', error);
      toast.error('An error occurred during upload. Please try again.');
    }
  
    setPaymentModalOpen(false);
  };

  const price = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(product.price).replace('Rp', 'Rp');

  const progressPercentage = Math.min(
    (product.currentOrders / product.maxTargetQuantity) * 100,
    100
  );

  const statusIcon = product.status === 'OPEN' ? (
    <FaHourglassHalf className="text-purple-500" />
  ) : product.status === 'FAILED' ? (
    <FaTimesCircle className="text-red-500" />
  ) : (
    <FaCheckCircle className="text-green-500" />
  );

  const statusBgColor =
    product.status === 'OPEN'
      ? 'bg-purple-100 text-purple-700'
      : product.status === 'FAILED'
      ? 'bg-red-100 text-red-700'
      : 'bg-green-100 text-green-700';

  return (
    <>
        <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 transform">
          <div className="h-48 bg-gray-200">
            <Image
              src="https://placehold.co/400x400"
              alt="images"
              height={400}
              width={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-sm mb-3">{product.productName}</h3>
            <div className="flex items-center justify-between text-xs">
              <span>Deadline: 2024-08-22</span>
              <span className="text-xs text-gray-600">{price}</span>
            </div>

            <div className="text-xs mt-2 grid grid-cols-2 gap-2">
              <div>
                <p>MOQ: {product.minTargetQuantity} Paket</p>
                <p>Location: Jakarta</p>
              </div>
              <div className="text-right">
                <p>Minimal: {product.minUserOrder} Paket</p>
                <p>{product.maxTargetQuantity} Paket Available</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-1/2 bg-gray-200 h-2.5">
                <div
                  className="bg-black h-2.5"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Current Orders: {Math.round(progressPercentage)}%
              </p>
            </div>

            <div className={`flex items-center mt-4 px-2 py-1 rounded w-1/4 ${statusBgColor}`}>
              {statusIcon}
              <p className="ml-2 text-xs font-semibold">
                {product.status === 'OPEN'
                  ? 'Open'
                  : product.status === 'FAILED'
                  ? 'Closed'
                  : 'Done'}
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleJoinClick}
                className="bg-[#0099cc] text-white text-xs px-3 py-1 rounded-md hover:bg-[#007aa3] transition-colors"
              >
                Join
              </button>
            </div>
          </div>
        </div>


      {/* Modal for Quantity Input */}
      {isQuantityModalOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-md flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-1/3">
            {/* Close Button */}
            <button
              onClick={() => setQuantityModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4 text-center">Enter Quantity</h3>
            <input
              type="number"
              min={product.minUserOrder}
              max={product.maxTargetQuantity}
              value={quantity}
              onChange={(e) => {
                const qty = Math.max(Number(e.target.value), product.minUserOrder); // Prevent going below minUserOrder
                setQuantity(qty);
                setTotalPrice(qty * product.price);
              }}
              className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm mb-4 text-center">
              Total Price: {totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleQuantitySubmit}
                disabled={quantity < product.minUserOrder} // Disable if quantity is less than minUserOrder
                className={`px-4 py-2 rounded transition-colors ${
                  quantity >= product.minUserOrder
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Payment Proof */}
      {isPaymentModalOpen && (
        <form onSubmit={handlePaymentSubmit}>
          <div className="fixed inset-0 bg-transparent backdrop-blur-md flex items-center justify-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-1/3">
              {/* Close Button */}
              <button
                onClick={() => setPaymentModalOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <h3 className="text-lg font-bold mb-4 text-center">Upload Payment Proof</h3>
              <p className="mb-2 text-center">
                Total Price: {totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
                className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <ToastContainer position='top-center' autoClose={3000} hideProgressBar />
        </form>
      )}
    </>
  );
}