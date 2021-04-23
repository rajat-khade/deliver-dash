import React, { useEffect, useState } from 'react'
import Stock from './Stock'
import jwt_decode from "jwt-decode"
import axios from "axios"
import Navbar from '../Navbar'
import AddStockModal from '../AddStockModal'

const StockSplash = () => {

  const [id,setId] = useState(null)
  const [type,setType] = useState(null)
  const [user, setUser] = useState(null)
  const [modal, setModal] = useState(false)

  const modalHandler = (val) => {
    setModal(val)
  }

  useEffect(async () => {
    let authToken = localStorage.getItem("customer-auth") || localStorage.getItem("retailer-auth") || localStorage.getItem("wholesaler-auth")
    
    let user = jwt_decode(JSON.parse(authToken).token)
    setId(user.user.id)

    user = await axios({ url: `/api/getuser/${user.user.id}`, baseURL: 'http://localhost:5000' })
    setUser(user.data)
    setType(user.data.type)
    
  }, [modal])

  if(id && type){
    return (
      <div>
        <Navbar user = {user}/>
        <Stock
          type={type}
          id={id} 
        />
        <div 
          className='stock-add-button'
          onClick={() => modalHandler(true)}  
        >+</div>
        {modal && <AddStockModal modalHandler={modalHandler}/>}
      </div>
    )
  }
  return <div></div>
  
}

export default StockSplash
