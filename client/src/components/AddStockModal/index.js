import React, { useEffect, useState } from 'react'
import axios from "axios"
import jwt_decode from "jwt-decode";
import "../ProductModal/ProductModal.css"

const AddStockModal = ({ modalHandler }) => {
    
    const [retailerInfo, setRetailerInfo] = useState([])
    const [itemsInCart, setItemsInCart] = useState({})
    const [markerLocs, setMarkerLocs] = useState([])
    const [user, setUser] = useState('')
    const [forceRerender, setForceRerender] = useState(false)
    const [formValues, setFormValues] = useState({
      name: "",
      price: "",
      quantity: "",
      description: "",
      category: "",
      image: "",
      quantity: ""
    })

    useEffect(async () => {
      let authToken = localStorage.getItem("customer-auth") || localStorage.getItem("retailer-auth") || localStorage.getItem("wholesaler-auth")
      
      let userDecoded = jwt_decode(JSON.parse(authToken).token)
      let buyerId = userDecoded.user.id
    
      let user = await axios({ url: `/api/getuser/${buyerId}`, baseURL: 'http://localhost:5000' })
      setUser(user.data)
      setForceRerender(!forceRerender)
    }, [])

    const addStock = async () => {
      const body = {
        name,
        description,
        price,
        quantity,
        category,
        image,
        quantity
      }
      
      const { data } = await axios({ method: 'post', url: `/api/${user.type}/stock/${user._id}`, baseURL: 'http://localhost:5000', data: body})
      modalHandler(false)
    }

    const onChangeHandler = (e) => {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }
    
    const { name, description, price, category, image, quantity } = formValues

    if(user)
    return (
      <div 
        className="container" 
        style={{
          display: 'flex',
          position:'relative',
          justifyContent: 'center',
          marginTop: '60px',
          width: '100vw',
          height: '100vh',
          // backgroundColor:'black'
        }}>
        <div className = "productModal-container" style={{width: '500px'}}>
          {/* <div onClick = {()=>modalHandler(false)} style={{width:'20px',height:'20px',backgroundColor:'black',cursor:'pointer',marginLeft:'auto'}}></div> */}
          <button onClick = {()=>modalHandler(false)} style={{zIndex:2,position:'absolute',right:'0', width:'20px', height:'20px',cursor:'pointer',margin: '10px 10px 0 auto',border:'none', background:"url(/images/Group-11862.svg) no-repeat", backgroundSize:'100% auto'}}>
            <span aria-hidden="true"></span>
          </button>
          <div style={{marginTop: '50px', width:'100%',height:'100%',borderRadius:'10px',display:'flex',flexDirection:'column', padding: '0 40px'}}>    
            
            <div>Name </div>
            <input type = "text" value ={name} name='name' onChange = {e => onChangeHandler(e)}/>
            
            <div>Description </div>
            <input type = "text" value ={description} name='description' onChange = {e => onChangeHandler(e)}/>

            <div>Price </div>
            <input type = "text" value={price} name='price' onChange = {(e) => onChangeHandler(e)}/>
              
            <div>Category </div>
            <input type = "text" value ={category} name='category' onChange = {e => onChangeHandler(e)}/>
            

            
            <div>Image </div>
            <input type = "text" name='image' value ={image} onChange = {e => onChangeHandler(e)}/>

            <div>Quantity </div>
            <input type = "text" name='quantity' value ={quantity} onChange = {e => onChangeHandler(e)}/>

            
            <button className="view-cart-button" onClick={() => addStock()}>Add to Stock</button>
          </div>
        </div>
      </div>
    )

    return <></>
}

export default AddStockModal
