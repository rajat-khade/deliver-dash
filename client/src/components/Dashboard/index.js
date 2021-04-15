import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Advertise from './Advertise'
import ItemList from './ItemList'
import Features from './Features'
import ProductModal from '../ProductModal'
import axios from "axios"
import jwt_decode from "jwt-decode"
const Dashboard = () => {

    const [modal,setModal] = useState(false)
    const [user,setUser] = useState(null)

    const modalHandler = (val) => {
        setModal(val)
        console.log(modal)
    }

    useEffect( async () => {
        let authToken = localStorage.getItem("customer-auth") || localStorage.getItem("retailer-auth") || localStorage.getItem("wholesaler-auth")
        
        let userDecoded = jwt_decode(JSON.parse(authToken).token)
        let buyerId = userDecoded.user.id

        let user = await axios({ url: `/api/getuser/${buyerId}`, baseURL: 'http://localhost:5000' })
        setUser(user.data)
    }, [])
    

    if(user){
        console.log(user)
        return (
            <div>           
            {modal && <ProductModal modalHandler = {modalHandler} modal = {modal}/>}
            <Navbar />
            <Advertise />
            <ItemList type = {user.type} category={'Batsman'} modalHandler = {modalHandler}/>
            <Features />
        </div>
    )
    }
    else
        return <div></div>
}

export default Dashboard
