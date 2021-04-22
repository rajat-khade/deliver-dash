import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Advertise from './Advertise'
import ItemList from './ItemList'
import Features from './Features'
import ProductModal from '../ProductModal'
import axios from "axios"
import jwt_decode from "jwt-decode"
import ItemSearchList from './ItemSearchList'

const Dashboard = () => {

    const [modal,setModal] = useState(false)
    const [user,setUser] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const searchTermHandler = async (e) => {
        setSearchTerm(e.target.value)
        try {
            const res = await axios({ url: `/api/${user.type}/search?term=${e.target.value}`, baseURL: 'http://localhost:5000' })
            setSearchResults([...res.data])
        } catch (e) {

        }
    }

    const modalHandler = (val) => {
        setModal(val)
        console.log(modal)
    }

    useEffect( async () => {
        let authToken = localStorage.getItem("customer-auth") || localStorage.getItem("retailer-auth") || localStorage.getItem("wholesaler-auth") || localStorage.getItem("delivery-auth")
        
        if(authToken){
            let userDecoded = jwt_decode(JSON.parse(authToken).token)
            let buyerId = userDecoded.user.id
    
            let user = await axios({ url: `/api/getuser/${buyerId}`, baseURL: 'http://localhost:5000' })
            setUser(user.data)
        }
        
    }, [])
    

    if(user){
        return (
            <div>           
            {modal && <ProductModal modalHandler = {modalHandler} modal = {modal}/>}
            <Navbar user={user} searchTermHandler={searchTermHandler} searchTerm={searchTerm} />
            {!searchTerm && 
                <>
                <div style={{marginTop:'-62px'}}>
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
                </>
            }
            {searchTerm && <ItemSearchList searchResults = {searchResults} modalHandler = {modalHandler} />}
            {/* {searchTerm && console.log(searchResults)} */}
            
        </div>
    )
    }
    else
        return <div></div>
}

export default Dashboard
