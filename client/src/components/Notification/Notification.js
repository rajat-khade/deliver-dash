import React, { useState } from 'react'
import './Notification.css'
import Tracker from '../Tracker'

const Notification = ({ notification, setTracker }) => {
  
  const messageBody = {
    'placed': { message : `Your Order with OrderID: ${notification.orderId} has been placed!`, color:'orange'},
    'dispatch': { message: `Your Order with OrderID: ${notification.orderId} has been dispatched!`, color: 'blue'},
    'transit': { message: `Your Order with OrderID: ${notification.orderId} is on the way!`, color: 'black'},
    'delivered': { message: `Your Order with OrderID: ${notification.orderId} has been delivered!`, color: 'green'}
  }

  return (
    <>
    <div 
      className='notification-container'
      onMouseDown={() => {
        setTracker({...notification})
      }}>
      <div className='notification-left'>
        <div 
          className='notification-image' 
          style={{
            // background: `url(${notification.image}) no-repeat`, 
            // backgroundSize: 'cover'
            backgroundColor: messageBody[notification.status].color
          }}>
        </div>
      </div>
      <div className='notification-right'>
        <div className='notification-message'>
          {messageBody[notification.status].message}
          <div>Track your order here!</div>
        </div>
      </div>

    </div>
  </>
  )
}

export default Notification