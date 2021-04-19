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
        let authToken = localStorage.getItem("customer-auth") || localStorage.getItem("retailer-auth") || localStorage.getItem("wholesaler-auth") || localStorage.getItem("delivery-auth")
        
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
            <div style={{marginTop:-60}}>
                <Advertise image={'/images/1.png'} />
            </div>
            <ItemList type = {user.type} category={'Fruits'} modalHandler = {modalHandler}/>
            <Features />
            <Advertise image={'/images/veggies.png'} />
            <ItemList type = {user.type} category={'Vegetables'} modalHandler = {modalHandler}/>
            <Features />
            <Advertise image={'/images/groceries.png'} />
            <ItemList type = {user.type} category={'Groceries'} modalHandler = {modalHandler}/>
            <Features />
            <Advertise image={'/images/beverages.png'} />
            <ItemList type = {user.type} category={'Beverages'} modalHandler = {modalHandler}/>
            <Features />
            <Advertise image={'/images/meat.png'} />
            <ItemList type = {user.type} category={'Processed foods'} modalHandler = {modalHandler}/>
            <Features />
            <Advertise image={'/images/snacks.jpg'} />
            <ItemList type = {user.type} category={'Snacks'} modalHandler = {modalHandler}/>
            <Features />
        </div>
    )
    }
    else
        return <div></div>
}

export default Dashboard
