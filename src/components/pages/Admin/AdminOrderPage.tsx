'use client'
import { OrderType } from '@/types/types';
import React, { useEffect } from 'react';
import AdminComponentOrderPage from './AdminComponentOrderPage';

const AdminOrderPage = () => {
  const [orders, setOrders] = React.useState<OrderType[]>([])

  useEffect(()=>{
    const fetchOrders = async () => {
      const orders = await fetch('http://localhost:3000/api/orders')
      const ordersData = await orders.json()
      setOrders(ordersData)
    }
    fetchOrders()
  },[])

  return (
    <>
      <div className="mb-5">
        {orders.map((order)=>{
          return order._id ? <AdminComponentOrderPage key={order._id.toString()} order={order} /> : null
          }
          )}
      </div>
    </>
  );
};

export default AdminOrderPage;
