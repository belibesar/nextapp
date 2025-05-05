import React from 'react';

const CartPage = () => {
  return (
    <>
      {/* Main Content */}
      <section className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Cart</h1>
          <button className="btn btn-primary rounded-full">Group Buying</button>
        </div>

        {/* Cart Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4">Items</th>
                <th className="text-center py-4">Price</th>
                <th className="text-center py-4">Amount</th>
                <th className="text-right py-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Item 1 */}
              <tr className="border-b">
                <td className="py-4">
                  <div className="font-medium">Indomie Goreng</div>
                  <div className="text-sm text-gray-600">1 Paket - 500 karton</div>
                  <div className="text-sm text-gray-600">Indofood CBP</div>
                </td>
                <td className="text-center py-4">Rp.120.000/pkg</td>
                <td className="py-4">
                  <div className="flex justify-center items-center gap-2">
                    <button className="btn btn-circle btn-sm bg-gray-200 border-none text-black hover:bg-gray-300">-</button>
                    <span className="w-6 text-center">1</span>
                    <button className="btn btn-circle btn-sm bg-gray-200 border-none text-black hover:bg-gray-300">+</button>
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex justify-end items-center gap-4">
                    <span>Rp. 60.000.000</span>
                    <button className="btn btn-sm bg-gray-200 hover:bg-gray-300 text-gray-700 border-none rounded-md">Delete</button>
                  </div>
                </td>
              </tr>

              {/* Item 2 */}
              <tr className="border-b">
                <td className="py-4">
                  <div className="font-medium">Indomie Goreng</div>
                  <div className="text-sm text-gray-600">1 Paket - 500 karton</div>
                  <div className="text-sm text-gray-600">Indofood CBP</div>
                </td>
                <td className="text-center py-4">Rp.120.000/pkg</td>
                <td className="py-4">
                  <div className="flex justify-center items-center gap-2">
                    <button className="btn btn-circle btn-sm bg-gray-200 border-none text-black hover:bg-gray-300">-</button>
                    <span className="w-6 text-center">2</span>
                    <button className="btn btn-circle btn-sm bg-gray-200 border-none text-black hover:bg-gray-300">+</button>
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex justify-end items-center gap-4">
                    <span>Rp. 70.000.000</span>
                    <button className="btn btn-sm bg-gray-200 hover:bg-gray-300 text-gray-700 border-none rounded-md">Delete</button>
                  </div>
                </td>
              </tr>

              {/* Item 3 */}
              <tr className="border-b">
                <td className="py-4">
                  <div className="font-medium">Indomie Goreng</div>
                  <div className="text-sm text-gray-600">1 Paket - 500 karton</div>
                  <div className="text-sm text-gray-600">Indofood CBP</div>
                </td>
                <td className="text-center py-4">Rp.120.000/pkg</td>
                <td className="py-4">
                  <div className="flex justify-center items-center gap-2">
                    <button className="btn btn-circle btn-sm bg-gray-200 border-none text-black hover:bg-gray-300">-</button>
                    <span className="w-6 text-center">1</span>
                    <button className="btn btn-circle btn-sm bg-gray-200 border-none text-black hover:bg-gray-300">+</button>
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex justify-end items-center gap-4">
                    <span>Rp. 124.000.000</span>
                    <button className="btn btn-sm bg-gray-200 hover:bg-gray-300 text-gray-700 border-none rounded-md">Delete</button>
                  </div>
                </td>
              </tr>

              {/* Item 4 */}
              <tr className="border-b">
                <td className="py-4">
                  <div className="font-medium">Indomie Goreng</div>
                  <div className="text-sm text-gray-600">1 Paket - 500 karton</div>
                  <div className="text-sm text-gray-600">Indofood CBP</div>
                </td>
                <td className="text-center py-4">Rp.120.000/pkg</td>
                <td className="py-4">
                  <div className="flex justify-center items-center gap-2">
                    <button className="btn btn-circle btn-sm bg-gray-200 border-none text-black hover:bg-gray-300">-</button>
                    <span className="w-6 text-center">1</span>
                    <button className="btn btn-circle btn-sm bg-gray-200 border-none text-black hover:bg-gray-300">+</button>
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex justify-end items-center gap-4">
                    <span>Rp. 340.000.000</span>
                    <button className="btn btn-sm bg-gray-200 hover:bg-gray-300 text-gray-700 border-none rounded-md">Delete</button>
                  </div>
                </td>
              </tr>

              {/* Total Row */}
              <tr>
                <td
                  colSpan={2}
                  className="py-6"
                ></td>
                <td className="py-6 text-center font-bold">Total</td>
                <td className="py-6 text-right font-bold">Rp. 620.000.000</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Checkout Button */}
        <div className="flex justify-end mt-6">
          <button className="btn bg-navy-800 hover:bg-navy-900 text-white px-8">Checkout</button>
        </div>
      </section>
    </>
  );
};

export default CartPage;
