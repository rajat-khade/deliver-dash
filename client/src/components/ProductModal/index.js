import React, { useEffect, useState } from 'react'
import axios from "axios"
import jwt_decode from "jwt-decode";
import "./ProductModal.css"


const ProductModal = ({modalHandler,modal}) => {
    
    const [retailerInfo, setRetailerInfo] = useState([])
    const [itemsInCart, setItemsInCart] = useState({})
    let authToken

    authToken = localStorage.getItem("customer-auth") || localStorage.getItem("retailer-auth") || localStorage.getItem("wholesaler-auth")
    
    // console.log(jwt_decode(authToken.token))
    let user = jwt_decode(JSON.parse(authToken).token)
    let customerId = user.user.id

    let buyerType
    if(modal.ownerType === "Retailer")
        buyerType = "Customer"
    else    
        buyerType = "Retailer"

    useEffect(async () => {
        // let data = await axios({ url: `/api/${modal.ownerType}/products?category=${modal.category}`, baseURL: 'http://localhost:5000' })
        
        let data = await axios({ url: `/api/${buyerType}/products?category=${modal.category}`, baseURL: 'http://localhost:5000' })

        console.log("data =",data)
        let retArray = []
        let incart = {}
        data.data.forEach((product)=>{
            let retData = {}
            retData.name = product.ownerName
            retData.price = product.price
            retData.quantity = product.quantity
            incart[product.ownerName] = 0
            retArray.push(retData)
        })
        setRetailerInfo(retArray)
        setItemsInCart(incart)
        console.log(retArray)
      }, [])

    return (
        <div className="container" style = {{display:'flex',justifyContent:'center'}}>
            <div className = "productModal-container">
                <div onClick = {()=>modalHandler(false)} style={{width:'20px',height:'20px',backgroundColor:'black',cursor:'pointer',marginLeft:'auto'}}></div>

                <div style={{width:'100%',height:'93%',display:'flex'}}>
                    <div style={{width:'50%',height:'100%',display:'flex',alignItems:'center',backgroundColor:'white'}}>
                        <div style={{width:'100%',height:'60%',background: `url(${modal.image}) no-repeat`, backgroundSize:"100% 100%"}}></div>
                    </div>
                    <div style={{width:'50%',height:'100%',borderRadius:'10px',display:'flex',flexDirection:'column'}}>
                        <h1>{modal.name}</h1>
                        <h2>{modal.description}</h2>
                        <div>{modal.price}</div>

                        <table>
                            <tr>
                                <th>Retailer Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>

                            {
                                retailerInfo.map((retailer)=>{
                                    return (
                                        <tr>
                                            <td>{retailer.name}</td>
                                            <td>{retailer.price}</td>
                                            <td>{retailer.quantity}</td>
                                            
                                            <img alt="decrease" className="action-icons" src="https://t3.ftcdn.net/jpg/03/73/49/86/240_F_373498649_nBxauQ0ipBSVrVcMpWWVmTpXu3BLvRyY.jpg" height = "20px"/>
                                            
                                            <td>{itemsInCart[retailer.name]}</td>

                                            <img onClick = { async ()=>{
                                                await axios({ url: `/api/${buyerType}/cart/${customerId}`, baseURL: 'http://localhost:5000' })
                                                itemsInCart[retailer.name]++
                                                setItemsInCart(itemsInCart)
                                            }} alt="increase" className="action-icons" src="https://t4.ftcdn.net/jpg/01/07/62/07/240_F_107620769_UwNVSoXnKS4VNcOKoZjPohlEPn83oE38.jpg" height = "20px"/>


                                        </tr>
                                    )
                                })
                            }
                        </table>
                        
                    </div>

                    

                </div>
                
            </div>
        </div>
    )
}

export default ProductModal
