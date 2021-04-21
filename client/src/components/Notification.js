import React from 'react'

const Notification = ({ notification }) => {
  return (
    <div>
      <div className='notification-left'>
        <div className='notification-image'>
        </div>
      </div>
      <div className='notification-right'>
        <div className='notification-message'>
        </div>
        <div>Click here to view details</div>
      </div>

    </div>
  )
}

export default Notification