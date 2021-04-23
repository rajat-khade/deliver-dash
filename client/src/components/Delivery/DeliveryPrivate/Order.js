import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './Order.css'

const Order = ({ order, setForceRender, forceRender }) => {

  const [seller, setSeller] = useState({})
  const [buyer, setBuyer] = useState({})

  console.log("Re rendered")
  const changeStatus = async (status) => {
    if(status === "")
      return
    await axios({ method: 'patch', url: `/api/order/${order._id}?status=${status}`, baseURL: 'http://localhost:5000' })

    const buyerId = order.toId
    const sellerId = order.fromId

    let body = {
      orderId: order._id,
      status
    }
    
    await axios({ method: "post", url: `/api/${buyer.type}/notification/${buyerId}`, baseURL: 'http://localhost:5000', data: body })
    await axios({ method: "post", url: `/api/${seller.type}/notification/${sellerId}`, baseURL: 'http://localhost:5000', data: body })
    setForceRender(!forceRender)
  }

  const getUser = async () => {
    const sellerRes = await axios({ url: `/api/getuser/${order.fromId}`, baseURL: 'http://localhost:5000' })
    const buyerRes = await axios({ url: `/api/getuser/${order.toId}`, baseURL: 'http://localhost:5000' })

    setSeller({...sellerRes.data})
    setBuyer({...buyerRes.data})
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className='order-container'>
      <div className='order-label'>
        <div>OrderID</div>
        <div>Amount</div>
      </div>
      <div className='order-row-1'>
        <div className='order-name'>
          {order._id}
        </div>
        <div className='order-transaction-amount'>
          {order.transaction}
        </div>
      </div>

      <div className='order-label'>
        <div>Delivery Status</div>
      </div>
      <div className='order-row-2'>
        <div className='order-delivery-status'>
          {order.status === 'dispatch' ? 'Dispatched':
            order.status === 'transit' ? 'In transit':
            order.status === 'delivered' ? 'Delivered': ''}
        </div>
        <div className={`accept-button delivery-${order.status}`}
            onClick = {()=>changeStatus(
              order.status === 'dispatch' ? 'transit': 
              order.status === 'transit'? 'delivered': 
              '')}
          >
          {order.status === 'dispatch'? "Accept": 
            order.status === 'transit' ? 'Finish Delivery':
            'Delivered'}
        </div>
      </div>
     
      <div className='order-label'>
        <div>Seller Name</div>
        <div>Seller Address</div>
      </div>
      <div className='order-row-3'>
        <div className='order-seller-name'>
          {seller.name}
        </div>
        <div className='order-seller-address'>
          {seller.location}
        </div>
      </div>
      
      <div className='order-label'>
        <div>Customer Name</div>
        <div>Customer Address</div>
      </div>
      <div className='order-row-4'>
        <div className='order-buyer-name'>
          {buyer.name}
        </div>
        <div className='order-buyer-address'>
          {buyer.location}
        </div>
      </div>


    </div>
  )
}

export default Order
