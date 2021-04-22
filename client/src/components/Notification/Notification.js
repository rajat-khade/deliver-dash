import React from 'react'

const Notification = ({ notification }) => {
  return (
    <div className='notification-container'>
      <div className='notification-left'>
        <div className='notification-image'>
          {notification.productId}
        </div>
      </div>
      <div className='notification-right'>
        <div className='notification-message'>
          {notification.message}
        </div>
        <div>Click here to view details</div>
      </div>

    </div>
  )
}

export default Notification