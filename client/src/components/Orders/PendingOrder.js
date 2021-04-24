import React, { useState, useEffect } from 'react'
import './Order.css'
import axios from "axios"

const PendingOrder = ({ order, setForceRender, forceRender }) => {
  const [buyer, setBuyer] = useState("")

  useEffect(async () => {
    const response = await axios({ url: `/api/getuser/${order.toId}`, baseURL: 'http://localhost:5000' })
      
    setBuyer(response.data)
  }, [])

  const dispatch = async () => {
    if (order.status !== 'placed') return

    await axios({ method: 'patch', url: `/api/order/${order._id}?status=dispatch`, baseURL: 'http://localhost:5000' })

    const buyerId = order.toId
    const deliveryGuyId = order.deliveryGuyId

    let body = {
      orderId: order._id,
      status: 'dispatch'
    }
    
    await axios({ method: "post", url: `/api/${buyer.type}/notification/${buyerId}`, baseURL: 'http://localhost:5000', data: body })
    await axios({ method: "post", url: `/api/Delivery/notification/${deliveryGuyId}`, baseURL: 'http://localhost:5000', data: body })
    
    setForceRender(!forceRender)
  }

  return (
    <div className='seller-order-container'>
      <div className='seller-order-id'>
        {order._id}
      </div>
      <div className='seller-order-customer-name'>
        {buyer.name}
      </div>
      <div className='seller-order-transaction'>
        {order.transaction}
      </div>
      <div className='seller-order-delivery-date'>
        {order.date.slice(0, 10)}
      </div> 
      <div 
        className={`seller-order-dispatch ${order.status}`}
        onClick={() => dispatch()}>
        {order.status === 'placed' ? 'Dispatch': 
          order.status === 'dispatch' ? 'Dispatched':
          order.status === 'transit' ? 'In Transit': 
          'Delivered'
        }
      </div> 
      
    </div>
  )
}

export default PendingOrder