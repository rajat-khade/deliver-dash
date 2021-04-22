import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Notification from './Notification'

const NotificationList = ({ type, id }) => {

  const [notifList, setNotifList] = useState([])

  useEffect(async () => {
    let notifList = await axios({ url: `/api/${type}/notifications/${id}`, baseURL: 'http://localhost:5000' })
    console.log(notifList)
    setNotifList([...notifList.data])
  }, [])

  
  return (
    <div style={{
      display: 'block', 
      position: 'absolute', 
      maxHeight: '300px',
    //   overflowY: 'scroll',
      right: '20px',
      top: '40px'}}>
      {notifList.map((notification) => {
        return <Notification notification={notification}/>
      })}
    </div>
  )

}

export default NotificationList
