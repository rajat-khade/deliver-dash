import React, { useState, useEffect } from 'react'
import Stepper from './Stepper'
import axios from "axios"
import HorizontalStepper from "./Stepper"
import './Tracker.css'
import { useHistory } from 'react-router'

const Tracker = ({ tracker, setTracker }) => {

  const [order, setOrder] = useState({})
  const history = useHistory()

  useEffect(async () => {
    const response = await axios({ url: `/api/getorder/${tracker.orderId}`, baseURL: 'http://localhost:5000' })
    setOrder({...response.data})
    console.log(response)
  }, [])

  if(order.hasOwnProperty("productList"))
  return (
    <div className='tracker-container'>
      <div className='tracker-content'>
      <button onClick = {()=>setTracker(false)} style={{zIndex:2,position:'absolute',right:'0',top:'0', width:'20px', height:'20px',cursor:'pointer',margin: '10px 10px 0 auto',border:'none', background:"url(/images/Group-11862.svg) no-repeat", backgroundSize:'100% auto'}}></button>
        <div className='tracker-order-details'>
          <div style={{fontWeight: 'bold', fontSize: '2rem'}}>Order Details</div>
          <div className='tracker-product-container' style={{marginTop: '10px'}}>
            <div className='tracker-product-id' style={{fontWeight: 'bold', paddingRight: '10px'}}>
              ProductId
            </div>
            <div className='tracker-product-name' style={{fontWeight: 'bold', paddingRight: '10px'}}>
              Product Name
            </div>
            <div className='tracker-product-quantity' style={{fontWeight: 'bold', paddingRight: '10px'}}>
              Quantity
            </div>
            <div className='tracker-product-price' style={{fontWeight: 'bold', paddingRight: '20px'}}>
              Price
            </div>
          </div>
          <div
            className='tracker-product-details' 
            style={{width: '100%', height: '225px', overflowY: 'scroll'}}>
          {
            order.productList.map((product) => {
            return (
              <div className='tracker-product-container'>
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
                &#8377;{product.price}
                </div>
              </div>)
            })
          }
          </div>
        </div>
        <div style={{fontWeight: 'bold', fontSize: '1.5rem', marginTop: '20px'}}>Total Price: &#8377;{order.transaction}</div>
        <div 
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bold', 
            fontSize: '2rem', 
            marginTop: '20px'
          }} className='tracker-order-status'
          >
          Order Status
        </div>
        <HorizontalStepper status = {order.status}/>
        {order.status==="delivered"?
        <div className = "feedback-button" 
              onClick = {()=>history.push(`./feedback?owner=${order.fromId}`)}
            >Leave us a Feedback</div>:
        <></>
        }
      </div>
    </div>
  )

  return <></>
}

export default Tracker

