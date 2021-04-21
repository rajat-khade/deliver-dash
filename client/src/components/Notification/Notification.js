import React from 'react'
import './Notification.css'

const Notification = ({ notification, notifCode }) => {

  const messageBody = {
    'placed': `Your Order ${notification.name} (ID: ${notification.productId}) has been placed!`,
    'dispatch': `Your Order ${notification.name} (ID: ${notification.productId}) has been dispatched!`,
    'transit': `Your Order ${notification.name} (ID: ${notification.productId}) is on the way!`,
    'delivered': `Your Order ${notification.name} (ID: ${notification.productId}) has been delivered!`,
  }

  return (
    <div className='notification-container'>
      <div className='notification-left'>
        <div 
          className='notification-image' 
          style={{
            background: `url(${notification.image}) no-repeat`, 
            backgroundSize: 'cover'
          }}>
        </div>
      </div>
      <div className='notification-right'>
        <div className='notification-message'>
          {notification.message}
          <div>Track your order here!</div>
        </div>
      </div>

    </div>
  )
}

export default Notification