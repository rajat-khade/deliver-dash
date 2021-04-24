import React, { useEffect, useState } from 'react'
import axios from "axios"
import jwt_decode from "jwt-decode";
import "./ProductModal.css"
import { useHistory } from 'react-router';

import Map from '../Map'


const ProductModal = ({modalHandler,modal}) => {
    
    const [retailerInfo, setRetailerInfo] = useState([])
    const [itemsInCart, setItemsInCart] = useState({})
    const [forceRerender, setForceRerender] = useState(true);
    const [markerLocs, setMarkerLocs] = useState([])
    const [user, setUser] = useState('')

    const history = useHistory()
    let authToken = localStorage.getItem("customer-auth") || localStorage.getItem("retailer-auth") || localStorage.getItem("wholesaler-auth")
    
    let userDecoded = jwt_decode(JSON.parse(authToken).token)
    let buyerId = userDecoded.user.id
    // let buyerId = "234320"

    let buyerType
    if(modal.ownerType === "Retailer")
        buyerType = "Customer"
    else    
        buyerType = "Retailer"

    useEffect(async () => {
        let user = await axios({ url: `/api/getuser/${buyerId}`, baseURL: 'http://localhost:5000' })
        
        let products = await axios({ url: `/api/${buyerType}/products`, baseURL: 'http://localhost:5000' })
        let cart = await axios({ url: `/api/${buyerType}/cart/${buyerId}`, baseURL: 'http://localhost:5000' })
        let incart = {}
        let mlocs = []
        let sellerList = []

        let cartQuantity = {}
        cart.data.forEach((item)=>{
            cart[item.productId] = item.quantity
        })

        for (let i = 0; i < products.data.length; i++) {
					
            let product = products.data[i]
            if(product.name !== modal.name)
                continue

            let sellerData = {}
            sellerData.name = product.ownerName
            sellerData.price = product.price
            sellerData.quantity = product.quantity
            sellerData.productId = product._id
            
            const { data : seller } = await axios({ url: `/api/getuser/${product.owner}`, baseURL: 'http://localhost:5000' })
            const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(seller.location) + '.json?access_token=pk.eyJ1IjoiaG9wZS1zY290Y2giLCJhIjoiY2tiaHduYnRlMDlsOTJxbWJsMTg5aHlsOSJ9.S92DKT4JNJ8jkzD4KQdsGw&limit=1'

            const {data : coordinates} = await axios({ url: url })
            let lat = coordinates.features[0].center[1]
            let long = coordinates.features[0].center[0]
            let loc = coordinates.features[0].place_name
            
            // console.log(markerLocs)
            mlocs.push([long,lat,loc])
            
            incart[product.ownerName] = cart[product._id] || 0
            sellerList.push(sellerData)
        }

        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(user.data.location) + '.json?access_token=pk.eyJ1IjoiaG9wZS1zY290Y2giLCJhIjoiY2tiaHduYnRlMDlsOTJxbWJsMTg5aHlsOSJ9.S92DKT4JNJ8jkzD4KQdsGw&limit=1'

        const {data : coordinates} = await axios({ url: url })
        let lat = coordinates.features[0].center[1]
        let long = coordinates.features[0].center[0]
        let loc = coordinates.features[0].place_name
        
        // console.log(markerLocs)
        mlocs.push([long,lat,loc, "#aa2ee6"])
        
        setMarkerLocs(mlocs)
        setRetailerInfo(sellerList)
        setItemsInCart(incart)
        console.log(sellerList)
      }, [modal])

    return (
        <div className="container" style = {{display:'flex',justifyContent:'center',marginTop: '60px'}}>
            <div className = "productModal-container">
                {/* <div onClick = {()=>modalHandler(false)} style={{width:'20px',height:'20px',backgroundColor:'black',cursor:'pointer',marginLeft:'auto'}}></div> */}
                <button onClick = {()=>modalHandler(false)} style={{zIndex:2,position:'absolute',right:'0', width:'20px', height:'20px',cursor:'pointer',margin: '10px 10px 0 auto',border:'none', background:"url(/images/Group-11862.svg) no-repeat", backgroundSize:'100% auto'}}>
                <span aria-hidden="true"></span>
                </button>

                <div style={{width:'100%',height:'100%',display:'flex'}}>
                    <div 
                        style={{
                            width:'50%',
                            height:'100%',
                            display:'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems:'center',
                            backgroundColor:'#555555', 
                            borderTopLeftRadius:'10px',
                            borderBottomLeftRadius:'10px',
                            borderRight:'2px solid black'}}
                        >
                        <div 
                            style={{
                                width:'100%',
                                height:'55%',
                                background: `url(${modal.image}) no-repeat`, 
                                backgroundSize:"cover", 
                                borderTopLeftRadius:'10px'}} 
                        />
				
                        <Map markerLocs = {markerLocs} height='45%' />
					</div>
                    <div style={{width:'50%',height:'100%',padding:'10%',borderRadius:'10px',display:'flex',flexDirection:'column'}}>
                        <h1>{modal.name}</h1>
                        <h2>{modal.description}</h2>

                        <table>
                            <tr>
                                <th>{modal.ownerType} Name</th>
                                <th>Price</th>
                                <th style={{width: '100%', display: 'flex', justifyContent: 'center'}}>Items in Cart</th>
                            </tr>

                            {
                                retailerInfo.map((retailer)=>{
                                    return (
                                        <tr>
                                            <td style={{width: '100%', display: 'flex', justifyContent: 'center'}}>{retailer.name}</td>
                                            <td>{retailer.price}</td>
                                            <td style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                                            <i class="fas fa-minus-circle" 
                                                onClick = { async ()=>{
                                                let temp = itemsInCart

                                                if(temp[retailer.name]==0)
                                                    return
                                                
                                                temp[retailer.name]--
                                                
                                                let body = {
                                                    productId : retailer.productId,
                                                    quantity : temp[retailer.name]
                                                }

                                                try {
                                                    let res
                                                    if(temp[retailer.name]===0){
                                                        res = await axios({method: 'delete', url: `/api/${buyerType}/cart/${buyerId}`, baseURL: 'http://localhost:5000',data: body})
                                                    }
                                                    else{
                                                        res = await axios({method: 'patch', url: `/api/${buyerType}/cart/${buyerId}`, baseURL: 'http://localhost:5000',data: body })
                                                    }
                                                    
                                                    setItemsInCart(temp)
                                                    console.log(res)
                                                    setForceRerender(!forceRerender);
                                                }
                                                catch(e){
                                                    console.log(e,"Error")
                                                }
                                                
                                            }} 
                                            alt="decrease"></i>
                                            
                                            <span style={{margin:'0 10px'}}>{itemsInCart[retailer.name]}</span>

                                            <i class="fas fa-plus-circle" 
                                            onClick = { async ()=>{
                                                let temp = itemsInCart
                                                temp[retailer.name]++

                                                let body = {
                                                    productId : retailer.productId,
                                                    quantity : temp[retailer.name]
                                                }

                                                try {
                                                    let res
                                                    if(temp[retailer.name]===1){
                                                        res = await axios({method: 'post', url: `/api/${buyerType}/cart/${buyerId}`, baseURL: 'http://localhost:5000',data: body})
                                                    }
                                                    else{
                                                        res = await axios({method: 'patch', url: `/api/${buyerType}/cart/${buyerId}`, baseURL: 'http://localhost:5000',data: body })
                                                    }
                                                    
                                                    console.log(res)
                                                    setItemsInCart(temp)
                                                    setForceRerender(!forceRerender);
                                                }
                                                catch(e){
                                                    console.log(e,"Error")
                                                }
                                                
                                            }} alt="increase"></i>

                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </table>
                        
                        <button className="view-cart-button" onClick = {()=>history.push(`./cart`)}>Cart</button>
                    </div>
                        
                    

                </div>
                
            </div>
        </div>
    )
}

export default ProductModal
