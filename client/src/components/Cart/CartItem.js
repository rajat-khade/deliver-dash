import React, { useState } from "react";
import axios from 'axios'
import './CartItem.css'

const CartItem = ({ product, type, id, forceRenderCart, setForceRenderCart, cartTotal, setCartTotal}) => {

  const [reRender, setReRender] = useState(false)

  const onIncrease = async () => {
      product.quantity++
    const body = {
      quantity: product.quantity,
      productId: product._id
    }

    try {
      let res = await axios({method: 'patch', url: `/api/${type}/cart/${id}`, baseURL: 'http://localhost:5000', data: body })
    //   console.log(res)
      cartTotal++
      setCartTotal(cartTotal)
      setReRender(!reRender)
        //   setQuantity(quantity + 1)
    } catch (error) {
      console.log(error)
    }
  }

  const onDecrease = async () => {
    if(product.quantity <= 1)
        return

    product.quantity--
    const body = {
      quantity: product.quantity,
      productId: product._id
    }

    try {
      let res = await axios({method: 'patch', url: `/api/${type}/cart/${id}`, baseURL: 'http://localhost:5000', data: body })
    //   setQuantity(quantity - 1)
      cartTotal--
      setCartTotal(cartTotal)
      setReRender(!reRender)
    } catch (error) {
      console.log(error)
    }
  }

  const onDelete = async () => {
    cartTotal -= product.quantity
    product.quantity = 0
    let body = {
        productId : product._id
    }
    try {
        let res = await axios({method: 'delete', url: `/api/${type}/cart/${id}`, baseURL: 'http://localhost:5000',data: body})
        // setQuantity(0)
        setCartTotal(cartTotal)
        setForceRenderCart(!forceRenderCart)
    }
    catch (error) {
        console.log(error)
    }


  }

//   console.log(quantity)

    return ( 
    <div className='cart-item-container'>
        <div className='cart-item-image-container'>
            <div 
              style={{
                background: `url("${product.image}") no-repeat`, 
                backgroundSize: '100% 100%', 
                height: '100%', 
                width: '100%',
                borderRadius: '15px'
              }} 
              className='cart-item-image' />
        </div>
        <div className='cart-item-details'>
            <div className='cart-item-name'>{product.name}</div>
            <div className='cart-item-divider' />
            <div className='cart-item-price'>&#8377; {product.price}</div>
            <div className='cart-item-divider' />
            <div className='cart-item-quantity-container'>
            <i  style={{color:'white'}}  
                alt="increase" 
                className="action-icons" 
                onClick={() => onIncrease()}
                class="fas fa-plus-circle"></i>
              
              <div className='cart-item-quantity'>{product.quantity}</div>
              
              <i style={{color:'white'}}  
                alt="decrease" 
                className="action-icons" 
                onClick={() => onDecrease()}
                class="fas fa-minus-circle"></i>
                
              
              <i style={{color:'white'}} 
                alt="delete" 
                className="action-icons" 
                onClick={() => onDelete()}
                class="far fa-trash-alt"></i>
                
            </div>
        </div>
    </div>
        
    );

}
const styles ={
    image: {
        height: 120,
        width: 120
    }
}
export default CartItem;