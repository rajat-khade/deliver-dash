import React from 'react'
import Order from './Order'

const OrderList = ({ orders }) => {
  return (
    <div style={{ width: '90%' }}>
      {orders.map((order) => <Order order={order} />)}
    </div>
  )
}

export default OrderList