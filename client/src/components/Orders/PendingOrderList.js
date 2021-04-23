import React, { useState } from 'react'
import PendingOrder from './PendingOrder'

const PendingOrderList = ({ orders, forceRender, setForceRender }) => {

  console.log(orders)
  return (
    <div style={{width: '100%', padding: '50px'}}>
      <div className='seller-order-container'>
      <div className='seller-order-id' style={{border:'none',fontWeight:'bold'}}>
        Order ID
      </div>
      <div className='seller-order-customer-name' style={{border:'none',fontWeight:'bold'}}>
        Customer Name
      </div>
      <div className='seller-order-transaction' style={{border:'none',fontWeight:'bold'}}>
        Transaction
      </div>
      <div className='seller-order-delivery-date' style={{border:'none',fontWeight:'bold'}}>
        Delivery Date
      </div>
       
      <div className='seller-order-customer-name' style={{border:'none',fontWeight:'bold'}}>
        Status
      </div> 
    </div>
    {orders.map((order) => {
      return (
        <PendingOrder order = {order}  setForceRender = {setForceRender} forceRender = {forceRender}/>
      )
    })}
    </div>
  )
}

export default PendingOrderList