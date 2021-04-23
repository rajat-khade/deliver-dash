import React, { useEffect, useState } from 'react'
import axios from "axios"
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router';


const EditModal = ({editModal, setEditModal}) => {
    
    const [forceRerender, setForceRerender] = useState(true);
    const [price, setPrice] = useState(editModal.price)
    const [quantity, setQuantity] = useState(editModal.quantity)

    const history = useHistory()
    let authToken = localStorage.getItem("customer-auth") || localStorage.getItem("retailer-auth") || localStorage.getItem("wholesaler-auth")
    
    let user = jwt_decode(JSON.parse(authToken).token)
    let buyerId = user.user.id

    let buyerType
    if(editModal.ownerType === "Retailer")
        buyerType = "Customer"
    else    
        buyerType = "Retailer"

    const editProduct = async () => {
        const body = {
            price,
            quantity
        }
        const { data } = await axios({method: 'patch', url: `/api/products/${editModal._id}`,baseURL: 'http://localhost:5000', data: body})
        console.log(data)
    }


    return (
        <div className="container" style = {{display:'flex',justifyContent:'center',marginTop:'-150px'}}>
            <div className = "productModal-container">
                <button onClick = {()=>setEditModal(false)} style={{zIndex:2,position:'absolute',right:'0', width:'20px', height:'20px',cursor:'pointer',margin: '10px 10px 0 auto',border:'none', background:"url(/images/Group-11862.svg) no-repeat", backgroundSize:'100% auto'}}>
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
                            backgroundColor:'white', 
                            borderTopLeftRadius:'10px',
                            borderBottomLeftRadius:'10px',
                            borderRight:'2px solid black'}}>
                        <div style={{width:'100%',height:'60%',background: `url(${editModal.image}) no-repeat`, backgroundSize:"100% 100%", borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px'}}></div>
					</div>
                    <div style={{width:'50%',height:'100%',borderRadius:'10px',display:'flex',flexDirection:'column', padding: '5%'}}>
                        <h1>{editModal.name}</h1>
                        <h2>{editModal.description}</h2>    
                        
                        <div>Price </div>
                        <input type = "text" value = {price} onChange = {(e)=>setPrice(e.target.value)}/>
                         

                        <div>Quantity </div>
                        <input type = "text" value = {quantity} onChange = {(e)=>setQuantity(e.target.value)}/>
                        
                        <button className="view-cart-button" onClick = {editProduct}>Edit</button>
                    </div>
                        
                    

                </div>
                
            </div>
        </div>
    )
}

export default EditModal
