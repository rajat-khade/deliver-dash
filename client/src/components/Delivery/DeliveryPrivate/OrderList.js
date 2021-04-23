import React from 'react'
import Order from './Order'

const OrderList = ({ orders, forceRender, setForceRender }) => {
  return (
    <div 
      style={{ 
        width: '100%'
      }}>
      {orders.map((order) => <Order setForceRender = {setForceRender} forceRender = {forceRender} order={order} />)}
    </div>
  )
}

export default OrderList