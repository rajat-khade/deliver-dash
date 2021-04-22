import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Notification from './Notification'

const NotificationList = ({ type }) => {

  const [notifList, setNotifList] = useState([])

  useEffect(async () => {
    let notifList = await axios({ url: `/api/${type}/notifications/${id}`, baseURL: 'http://localhost:5000' })

    setNotifList([...notifList.data])
  }, [])

  
  return (
    <div style={{display: 'flex',justifyContent: 'center'}}>
      {notifList.map((notification) => {
        return <Notification notification={notification} />
      })}
    </div>
  )

}

export default NotificationList
