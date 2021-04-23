import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import axios from "axios"
import NotificationList from './NotificationList'
import Tracker from '../Tracker'

const NotificationSplash = ({ setTracker }) => {

  const [user,setUser] = useState(null)

  useEffect(async ()=>{
    let authToken = localStorage.getItem("customer-auth") || localStorage.getItem("retailer-auth") || localStorage.getItem("wholesaler-auth") || localStorage.getItem("delivery-auth")
        
    if(authToken){
        let userDecoded = jwt_decode(JSON.parse(authToken).token)
        let buyerId = userDecoded.user.id

        let user = await axios({ url: `/api/getuser/${buyerId}`, baseURL: 'http://localhost:5000' })
        setUser(user.data)
    }
  },[])

  if(user)
  return (
    <>
    <div style={{ display: 'block' }}>
      <NotificationList setTracker={setTracker} type = {user.type} id = {user._id}/>
    </div>
    </>
  )

  return <></>
}

export default NotificationSplash