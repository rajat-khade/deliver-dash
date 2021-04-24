import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import Advertise from './Advertise'
import ItemList from './ItemList'
import Features from './Features'
import ProductModal from '../ProductModal'
import axios from "axios"
import jwt_decode from "jwt-decode"
import ItemSearchList from './ItemSearchList'
import Loader from 'react-loader-spinner'

const Dashboard = () => {

    const [modal,setModal] = useState(false)
    const [user,setUser] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)

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
        setLoading(true)
        let authToken = localStorage.getItem("customer-auth") || localStorage.getItem("retailer-auth") || localStorage.getItem("wholesaler-auth") || localStorage.getItem("delivery-auth")
        
        if(authToken){
            let userDecoded = jwt_decode(JSON.parse(authToken).token)
            let buyerId = userDecoded.user.id
    
            let user = await axios({ url: `/api/getuser/${buyerId}`, baseURL: 'http://localhost:5000' })
            setUser(user.data)
        }
        setLoading(false)
        
    }, [])
    

    if(user){
        return (
            <div>
            {loading && 
                <>
                <div style={{position: 'absolute', marginLeft: '50%', marginTop: '50%', zIndex: '30', background: 'none'}}>
                  <Loader 
                    type="TailSpin"
                    color="#00BFFF"
                    height={50}
                    width={50}
                    timeout={30000}
                  />
                </div>
                <div style={{position: 'fixed', width: '100vw', height: '100vh', backgroundColor: 'black', opacity: '0.5', position: 'fixed', top: '0px'}} />
                </>
              }           
            {modal && <ProductModal modalHandler = {modalHandler} modal = {modal}/>}
            <Navbar user={user} searchTermHandler={searchTermHandler} searchTerm={searchTerm} />
            {!searchTerm && 
                <>
                <div style={{marginTop: '-35px'}}>
                <Advertise image={'/images/1.png'} color='pink-bg'/>
                </div>
                <ItemList 
                    type = {user.type} 
                    category={'Fruits'} 
                    modalHandler={modalHandler}
                    color='pink'
                />
                <Features />
                <Advertise image={'/images/veggies.png'} color='green-bg'/>
                <ItemList 
                    type = {user.type} 
                    category={'Vegetables'} 
                    modalHandler = {modalHandler}
                    color='green'
                />
                <Advertise image={'/images/groceries.png'} color='brown-bg' />
                <ItemList 
                    type = {user.type} 
                    category={'Groceries'} 
                    modalHandler = {modalHandler}
                    color='brown'/>
                <Advertise image={'/images/beverages.png'} color='blue-bg'/>
                <ItemList 
                    type = {user.type} 
                    category={'Beverages'} 
                    modalHandler = {modalHandler}
                    color='blue'/>
                <Advertise image={'/images/meat.png'} color='red-brown-bg'/>
                <ItemList 
                    type = {user.type} 
                    category={'Processed foods'} 
                    modalHandler = {modalHandler}
                    color='red-brown'/>
                <Advertise image={'/images/snacks.jpg'} color='yellow-bg'/>
                <ItemList 
                    type = {user.type} 
                    category={'Snacks'} 
                    modalHandler = {modalHandler}
                    color='yellow'/>
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
