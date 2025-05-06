// "use client";

import Image from "next/image";
import { GroupBuy } from "@/types/types";
import Link from "next/link";

export default function GroupBuyCard({ groupBuy }: { groupBuy: GroupBuy }) {
  // console.log(groupBuy, "groupBuy card");
  // const bundlePrice = groupBuy.productDetails
  //   ? new Intl.NumberFormat("id-ID", {
  //       style: "currency",
  //       currency: "IDR"
  //     }).format(groupBuy.productDetails.price * 10)
  //   : 0; // edit 10, 10 for bundle buy

  const price = groupBuy.productDetails
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      })
        .format(groupBuy.productDetails.price)
        .split(",")[0]
    : 0;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 transform">
      <Link href={`/groupbuy/${groupBuy._id}`}>
        <div className="h-48 bg-gray-200">
          <Image
            src="https://placehold.co/400x400"
            alt={groupBuy.productDetails ? groupBuy.productDetails.name : ""}
            height={400}
            width={400}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold">
              {groupBuy.productDetails &&
                (groupBuy.productDetails.name.length > 15
                  ? `${groupBuy.productDetails.name.slice(0, 15)}...`
                  : groupBuy.productDetails.name)}
            </h3>
            {/* <h3 className="font-bold">{bundlePrice}</h3> */}
          </div>

          <div className="flex flex-row justify-between">
            <p className="text-xs mt-2">
              <span className="font-bold ">Deadline:</span>{" "}
              {`${new Date(groupBuy.deadline).toDateString()}`}
            </p>
            <h3 className="font-bold">{price}</h3>
          </div>

          <div className="flex flex-row justify-between">
            <p className="text-xs mt-2">
              <span className="font-bold ">Moq:</span>{" "}
              {`${groupBuy.minUserOrder} paket`}
            </p>
            <p className="text-xs">per paket</p>
          </div>

          <div className="flex flex-row justify-between items-start mt-5">
            <p className="text-sm text-black font-semibold">
              {groupBuy.distributionLocation}
            </p>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-right">Min 1 paket</p>{" "}
              {/*change this to bundle qty */}
              {groupBuy.productDetails &&
              groupBuy.productDetails.stock !== 0 ? (
                <p className="text-sm text-blue-500">
                  {groupBuy.productDetails.stock} paket available
                </p>
              ) : (
                <p className="text-sm text-red-500">Out of stock</p>
              )}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex justify-end mt-2 px-4 pb-4">
        <button className="bg-[#0099cc] text-white text-xs px-8 py-2 rounded-md hover:bg-[#007aa3] transition-colors cursor-pointer z-50">
          Join
        </button>
      </div>
    </div>
  );
}
