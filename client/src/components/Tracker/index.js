import React, { useState, useEffect } from 'react'
import Stepper from './Stepper'
import axios from "axios"
import HorizontalStepper from "./Stepper"
import './Tracker.css'

const Tracker = ({ tracker }) => {

  const [order, setOrder] = useState({})

  useEffect(async () => {
    const response = await axios({ url: `/api/getorder/${tracker.orderId}`, baseURL: 'http://localhost:5000' })
    setOrder({...response.data})
    console.log(response)
  }, [])

  if(order.hasOwnProperty("productList"))
  return (
    <div className='tracker-container'>
      <div className='tracker-content'>
        <div className='tracker-order-details'>
          <div>Order Details</div>
          {
          
            order.productList.map((product) => {
            return (<div className='tracker-product-container'>
              {console.log(product)}
              <div className='tracker-product-id'>
                {product._id}
              </div>
              <div className='tracker-product-name'>
                {product.name}
              </div>
              <div className='tracker-product-quantity'>
                {product.quantity}
              </div>
              <div className='tracker-product-price'>
                {product.price}
              </div>
            </div>)
          })
          }
          <div>Total Price: {order.transaction}</div>
        </div>
        <div className='tracker-order-status'>Order Status</div>
        <HorizontalStepper status = {order.status}/>
      </div>
    </div>
  )

  return <></>
}

export default Tracker

