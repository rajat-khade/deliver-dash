import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Notification from './Notification'

const NotificationList = ({ type, id, setTracker }) => {

  const [notifList, setNotifList] = useState([])

  useEffect(async () => {
    let response = await axios({ url: `/api/${type}/notifications/${id}`, baseURL: 'http://localhost:5000' })
    // console.log(notifList)
    setNotifList([...response.data].reverse())
    // notifList.reverse()
  }, [])

  
  return (
    <div className = "notification-items">
      {notifList.map((notification) => {
        return <Notification notification={notification} setTracker={setTracker}/>
      })}
    </div>
  )

}

export default NotificationList
