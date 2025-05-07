import React from 'react';

const UserOrderPage = () => {
  return (
    <>
      <div className="min-h-screen">
        {/* Main Content */}
        <main className="container mx-auto px-6 py-8 flex-grow">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">User Orders</h1>

          {/* Status Filters */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {['Pending', 'Preparing', 'Shipped', 'Finished', 'Failed'].map((status) => (
              <button
                key={status}
                className="btn btn-sm bg-gray-300 hover:bg-gray-400 text-gray-800 border-none"
              >
                {status}
              </button>
            ))}
          </div>

          {/* Order Cards */}
          <div className="space-y-6">
            {/* First Order */}
            <div className="card bg-base-100 shadow-md border border-gray-200">
              <div className="card-body">
                <div className="flex justify-between mb-2">
                  <div>
                    <p>
                      <span className="font-semibold">Order ID:</span> <span className="badge badge-sm">xxx89q7hxcxc000</span>
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span> <span className="badge badge-warning badge-sm">Pending</span>
                    </p>
                    <p>
                      <span className="font-semibold">Items:</span>
                    </p>
                  </div>
                  <div>
                    <p className="badge badge-outline">Ordered At 24-8-2025</p>
                  </div>
                </div>

                <div className="divider my-1"></div>

                <div className="space-y-4 mt-2">
                  {/* First Item */}
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">Indomie Goreng</p>
                      <p className="text-gray-600">Indofood CBP</p>
                      <p className="text-gray-500 text-sm">Product ID ab343acf3432x3900</p>
                    </div>
                    <div className="text-right">
                      <p>2 Paket</p>
                      <p className="font-medium">Rp. 240.000.000</p>
                    </div>
                  </div>

                  {/* Second Item */}
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">Mie Sedaap Goreng</p>
                      <p className="text-gray-600">Wingsfood</p>
                      <p className="text-gray-500 text-sm">Product ID ab343acfa32x3340</p>
                    </div>
                    <div className="text-right">
                      <p>1 Paket</p>
                      <p className="font-medium">Rp. 120.000.000</p>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-end border-t pt-2">
                    <p className="font-semibold bg-[#0088c2] text-white px-4 py-2 rounded-lg">Total: Rp. 360.000.000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Order */}
            <div className="card bg-base-100 shadow-md border border-gray-200">
              <div className="card-body">
                <div className="flex justify-between mb-2">
                  <div>
                    <p>
                      <span className="font-semibold">Order ID:</span> <span className="badge badge-sm">xxx89q7hxcxc000</span>
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span> <span className="badge badge-success badge-sm">Finished</span>
                    </p>
                    <p>
                      <span className="font-semibold">Items:</span>
                    </p>
                  </div>
                  <div>
                    <p className="badge badge-outline">Ordered At 24-8-2025</p>
                  </div>
                </div>

                <div className="divider my-1"></div>

                <div className="space-y-4 mt-2">
                  {/* First Item */}
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">Indomie Goreng</p>
                      <p className="text-gray-600">Indofood CBP</p>
                      <p className="text-gray-500 text-sm">Product ID ab343acf3432x3900</p>
                    </div>
                    <div className="text-right">
                      <p>2 Paket</p>
                      <p className="font-medium">Rp. 240.000.000</p>
                    </div>
                  </div>

                  {/* Second Item */}
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">Mie Sedaap Goreng</p>
                      <p className="text-gray-600">Wingsfood</p>
                      <p className="text-gray-500 text-sm">Product ID ab343acfa32x3340</p>
                    </div>
                    <div className="text-right">
                      <p>1 Paket</p>
                      <p className="font-medium">Rp. 120.000.000</p>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-end border-t pt-2">
                    <p className="font-semibold bg-[#0088c2] text-white px-4 py-2 rounded-lg">Total: Rp. 360.000.000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserOrderPage;
