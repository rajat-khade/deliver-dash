import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './Order.css'

const Order = ({ order }) => {

  const [seller, setSeller] = useState({})
  const [buyer, setBuyer] = useState({})

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
      <div className='order-row-1'>
        <div className='order-name'>
          {order.name}
        </div>
        <div className='order-transaction-amount'>
          {order.transaction}
        </div>
      </div>

      <div className='order-row-2'>
        <div className='order-delivery-status'>
          Delivered
        </div>
      </div>
     
      <div className='order-row-3'>
        <div className='order-seller-name'>
          {seller.name}
        </div>
        <div className='order-seller-address'>
          {seller.location}
        </div>
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
