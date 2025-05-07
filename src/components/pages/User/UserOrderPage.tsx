'use client'
import { OrderType, UserType } from "@/types/types";
import React, {useEffect} from "react";
import UserComponentOrderPage from "./UserComponentOrderPage";
import { getLoggedInUserFromRequest } from "@/lib/getLoggedInUserFromRequest";

const FILTERS = [
  'ALL',
  'PENDING',
  'AWAITING_ADMIN_CONFIRMATION',
  'DP_CONFIRMED',
  'AWAITING_ADMIN_CONFIRMATION_FULL',
  'FULLPAYMENT_CONFIRMED',
  'AWAITING_FULL_PAYMENT',
  'PAID_IN_FULL',
  'CANCELLED',
];

const UserOrderPage = ({userId}:{userId:string}) => {
  const [orders, setOrders] = React.useState<OrderType[]>([])
  const [filter, setFilter] = React.useState<string>('ALL')

  useEffect(()=>{
    const fetchOrders = async () => {
      try {
        const orders = await fetch(`http://localhost:3000/api/orders/${userId}`)
        const ordersData = await orders.json()
        setOrders(ordersData)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
      
    }
    fetchOrders()
  },[])

  const filteredOrders = orders.filter(order => {
    if (filter === 'ALL') return true;
    return (order.currentStatus?.toUpperCase() ?? '') === filter;
  });


  return (
    <>
      <div className="mb-5">
        {FILTERS.map((filters) => (
          <button
            key={filters}
            className={`btn btn-sm ${filter === filters ? 'bg-blue-600 text-white' : 'bg-gray-200'} hover:bg-gray-400 text-gray-700 border-none mr-2`}
            onClick={() => setFilter(filters)}>
              {filters.replace(/_/g, ' ')}
          </button>
        ))}
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => order._id ? (
            <UserComponentOrderPage key={order._id.toString()} orderData={order} />
          ) : null
        )) : (
          <p className='text-gray-500'>No orders with selected status</p>
        )}
      </div>
    </>
  );
};

export default UserOrderPage;
