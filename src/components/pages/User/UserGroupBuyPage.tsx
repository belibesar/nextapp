import GroupBuyCard from '@/components/fragments/GroupBuyCard';
import GoBackButton from '@/components/layout/GoBackButton';
import { GroupBuy } from '@/types/types';
import React from 'react';

const GroupBuyPage = async () => {
  // Sample product data
  const fetchGroupBuys = await fetch('http://localhost:3000/api/group-buys');
  const groupBuys = await fetchGroupBuys.json();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex-grow">
        {/* Action Buttons */}
        <div className="flex justify-between mb-6">
          <GoBackButton />
        </div>

        {/* Section Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Group Buy</h1>

        {/* Product Group Buy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {groupBuys.map((groupBuy: GroupBuy, index: number) => (
            <GroupBuyCard
              key={index}
              groupBuy={groupBuy}
            />
          ))}
        </div>

        {/* More Button */}
        <div className="flex justify-center mt-8">
          <button className="btn bg-[#0099cc] hover:bg-[#0088bb] text-white border-none px-8 rounded-md">More</button>
        </div>
      </main>
    </div>
  );
};

export default GroupBuyPage;
