import React, { useState } from 'react'
import './Notification.css'
import Tracker from '../Tracker'

const Notification = ({ notification, setTracker }) => {
  
  const messageBody = {
    'placed': { message : `Your Order with OrderID: ${notification.orderId} has been placed!`, color: 'orange', icon: 'fas fa-location-arrow fa-2x'},
    'dispatch': { message: `Your Order with OrderID: ${notification.orderId} has been dispatched!`, color: 'blue', icon: 'fas fa-warehouse fa-2x'},
    'transit': { message: `Your Order with OrderID: ${notification.orderId} is on the way!`, color: 'black', icon: 'fas fa-truck fa-2x'},
    'delivered': { message: `Your Order with OrderID: ${notification.orderId} has been delivered!`, color: 'green', icon: 'fas fa-check fa-2x'}
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
            // backgroundColor: messageBody[notification.status].color
          }}>
          <i className={messageBody[notification.status].icon} style={{color: '#222831', transform: 'scale(0.6)'}}></i>
        </div>
      </div>
      <div className='notification-right'>
        <div className='notification-message'>
          {messageBody[notification.status].message}
          <div style={{fontWeight: 'bold'}}>Track your order here!</div>
        </div>
      </div>

    </div>
  </>
  )
}

export default Notification