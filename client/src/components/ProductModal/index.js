import React, { useEffect, useState } from 'react'
import axios from "axios"
import jwt_decode from "jwt-decode";
import "./ProductModal.css"
import { useHistory } from 'react-router';


const ProductModal = ({modalHandler,modal}) => {
    
    const [retailerInfo, setRetailerInfo] = useState([])
    const [itemsInCart, setItemsInCart] = useState({})
    const [forceRerender, setForceRerender] = useState(true);

    const history = useHistory()
    let authToken = localStorage.getItem("customer-auth") || localStorage.getItem("retailer-auth") || localStorage.getItem("wholesaler-auth")
    
    // console.log(jwt_decode(authToken.token))
    // console.log(typeof authToken,"yeh hai")
    let user = jwt_decode(JSON.parse(authToken).token)
    let buyerId = user.user.id
    // let buyerId = "234320"

    let buyerType
    if(modal.ownerType === "Retailer")
        buyerType = "Customer"
    else    
        buyerType = "Retailer"

    console.log(buyerType, buyerId)
    useEffect(async () => {
        
        let data = await axios({ url: `/api/${buyerType}/products`, baseURL: 'http://localhost:5000' })
        let cart = await axios({ url: `/api/${buyerType}/cart/${buyerId}`, baseURL: 'http://localhost:5000' })
        let incart = {}
        let retArray = []


        console.log("data =",data)
        console.log("CART",cart)

        let cartQuantity = {}
        cart.data.forEach((item)=>{
            cart[item.productId] = item.quantity
        })


        data.data.forEach((product)=>{
            if(product.name !== modal.name)
                return

            let retData = {}
            retData.name = product.ownerName
            retData.price = product.price
            retData.quantity = product.quantity
            retData.productId = product._id
            
            incart[product.ownerName] = cart[product._id] || 0
            retArray.push(retData)
        })

        setRetailerInfo(retArray)
        setItemsInCart(incart)
        console.log(retArray)
      }, [modal])

    return (
        <div className="container" style = {{display:'flex',justifyContent:'center'}}>
            <div className = "productModal-container">
                {/* <div onClick = {()=>modalHandler(false)} style={{width:'20px',height:'20px',backgroundColor:'black',cursor:'pointer',marginLeft:'auto'}}></div> */}
                <button onClick = {()=>modalHandler(false)} style={{zIndex:2,position:'absolute',right:'0', width:'20px', height:'20px',cursor:'pointer',margin: '10px 10px 0 auto',border:'none', background:"url(/images/Group-11862.svg) no-repeat", backgroundSize:'100% auto'}}>
                <span aria-hidden="true"></span>
                </button>

                <div style={{width:'100%',height:'100%',display:'flex'}}>
                    <div style={{width:'50%',height:'100%',display:'flex',alignItems:'center',backgroundColor:'white', borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px',borderRight:'2px solid black'}}>
                        <div style={{width:'100%',height:'60%',background: `url(${modal.image}) no-repeat`, backgroundSize:"100% 100%", borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px'}}></div>
                    </div>
                    <div className="modal-content" style={{width:'50%',height:'100%',borderRadius:'10px',display:'flex',flexDirection:'column'}}>
                        <h1>{modal.name}</h1>
                        <h2>{modal.description}</h2>
                        <div>{modal.price}</div>

                        <table>
                            <tr>
                                <th>{modal.ownerType} Name</th>
                                <th>Price</th>
                                <th>Items in Cart</th>
                            </tr>

                            {
                                retailerInfo.map((retailer)=>{
                                    return (
                                        <tr>
                                            <td>{retailer.name}</td>
                                            <td>{retailer.price}</td>
                                            <td>

                                            <img onClick = { async ()=>{
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
                                            alt="decrease" className="action-icons" src="https://t3.ftcdn.net/jpg/03/73/49/86/240_F_373498649_nBxauQ0ipBSVrVcMpWWVmTpXu3BLvRyY.jpg" height = "20px"/>
                                            
                                            <span style={{margin:'0 10px'}}>{itemsInCart[retailer.name]}</span>

                                            <img onClick = { async ()=>{
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
                                                
                                            }} alt="increase" className="action-icons" src="https://t4.ftcdn.net/jpg/01/07/62/07/240_F_107620769_UwNVSoXnKS4VNcOKoZjPohlEPn83oE38.jpg" height = "20px"/>

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
