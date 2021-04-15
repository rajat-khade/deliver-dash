import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CartItem from './CartItem'

const Cart = ({ type, id, cartTotal, setCartTotal }) => {
    console.log(type,id)
  const [products, setProducts] = useState([])
  const [forceRenderCart, setForceRenderCart] = useState(true);
  const [loaded, setLoaded] = useState(false)

  const getCartItems = async () => {
    try {
      const cartItems = await axios({ url: `/api/${type}/cart/${id}`, baseURL: 'http://localhost:5000' })

      let cartProducts = []
      cartTotal = 0
      for(var i = 0; i < cartItems.data.length; i++){
        let item = cartItems.data[i]
        const { data } = await axios({ url: `/api/products/${item.productId}`, baseURL: 'http://localhost:5000' })
        cartProducts.push({...data, quantity: item.quantity})
        cartTotal += item.quantity
        setCartTotal(cartTotal)
        console.log(cartProducts)
      }
      setProducts(cartProducts)
      setLoaded(true)

    } catch (error) {
      console.log("Error",error)
    }
  }

  useEffect(() => {
    getCartItems()
  }, [forceRenderCart])

  
  return (
    <div 
        style={{
            display: 'flex', 
            flexDirection: 'column',
        }}>
        {console.log("Sayantan",products.length)}
      {loaded && products.map((product, index) =>{
              console.log(product)
              return <CartItem
              product={product}
              key={index}
              type={type}
              id={id}
              cartTotal = {cartTotal}
              setCartTotal = {setCartTotal}
              forceRenderCart = {forceRenderCart}
              setForceRenderCart = {setForceRenderCart}
              />
            }
            )
        }
    </div>
  )
}

export default Cart
