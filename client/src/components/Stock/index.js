import React, { useEffect, useState } from 'react'
import Stock from './Stock'
import jwt_decode from "jwt-decode"
import axios from "axios"

const StockSplash = () => {

  const [id,setId] = useState(null)
  const [type,setType] = useState(null)

  useEffect(async () => {
    let authToken = localStorage.getItem("customer-auth") || localStorage.getItem("retailer-auth") || localStorage.getItem("wholesaler-auth")
    
    let user = jwt_decode(JSON.parse(authToken).token)
    setId(user.user.id)

    user = await axios({ url: `/api/getuser/${user.user.id}`, baseURL: 'http://localhost:5000' })
    setType(user.data.type)
    
  }, [])

  if(id && type){
    return (
      <div>
        <Stock
          type={type}
          id={id} 
        />
      </div>
    )
  }
  return <div></div>
  
}

export default StockSplash
