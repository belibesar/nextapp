"use client"
import { GroupBuy, GroupBuyStatus, UserType } from "@/types/types";
import React, { useEffect, useState } from "react";

export default function GroupBuyProfile({ user }: { user: UserType }) {
  const [groupBuys, setGroupBuys] = useState<GroupBuy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGroupBuys = async () => {
    try {
      console.log("Sending request with user ID:", user._id);
      const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/users/user-group-buy`, {
        headers: {
          "x-user-data": JSON.stringify({ _id: user._id }),
        },
      });
      const data = await response.json();
      console.log("API Response:", data);
  
      if (data.success && Array.isArray(data.data)) {
        setGroupBuys(data.data);
      } else {
        setError("Failed to fetch group buys.");
      }
    } catch (err) {
      console.error("Error fetching group buys:", err);
      setError("An error occurred while fetching group buys.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupBuys();
  }, []);

  if (loading) {
    return <p>Loading group buys...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (groupBuys.length === 0) {
    return <p className="text-gray-500">No group buys found.</p>;
  }

  return (
    <div className="space-y-4">
      {groupBuys.map((groupBuy) => {
        const progressPercentage = Math.min(
          (groupBuy.currentOrders / groupBuy.maxTargetQuantity) * 100,
          100
        );
        return (
          <div
            key={groupBuy._id?.toString()}
            className="bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] rounded-xl p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full -mt-10 -mr-10"></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#1e3a5f] mb-1">
                  {groupBuy.productDetails?.name || "Unknown Product"}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span>Deadline: {new Date(groupBuy.deadline).toLocaleDateString()}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Distribution:</span> {groupBuy.distributionLocation}
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-600 mr-2">Progress:</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    {groupBuy.currentOrders}/{groupBuy.maxTargetQuantity} orders
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${progressPercentage}%`,
                    }}
                  ></div>
                </div>
                <div className="mt-2">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      groupBuy.status === "OPEN"
                        ? "bg-green-100 text-green-800"
                        : groupBuy.status === GroupBuyStatus.MOQ_REACHED
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {groupBuy.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}