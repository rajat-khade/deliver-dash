import React, {useState, useEffect} from "react";
import Cart from "./Cart";
import Navbar from "./Navbar"
import jwt_decode from "jwt-decode"
import axios from "axios"

import './Cart.css'

const CartSplash = () => {

    // console.log("welcome to cart",props.location.state.cart)
  const [forceRerender, setForceRerender] = React.useState(true);
  const [cartTotal, setCartTotal] = useState(0)
  const [user,setUser] = useState(null)

// ...put this line where you want to force a rerender

  const [products, setProducts] = useState([]);
  let buyerId

// useEffect(async () => {
//   const productList = await axios({url: `/api/${type}/cart/${id}`, baseURL: 'http://localhost:5000'})
//   setProducts(...productList.data)
//   console.log(productList.data)
// }, [])

  function handleIncreaseQty(product){
    const index = products.indexOf(product);
    products[index].qty += 1;
    setProducts(products);
    console.log(product);
    setForceRerender(!forceRerender);
  }
  function handleDecreaseQty(product){
    const index = products.indexOf(product);
    if(products[index].qty===0){
        return;
    }
    products[index].qty -= 1;
    return (
      setProducts(()=>{return products})
    );
    
    console.log(product);
  }
  function handleDeleteProduct(id){
    const items = products.filter((item)=> item.id !== id);
    setProducts(()=>items);
  }
  function getCount(){
    let counter =0;
    products.forEach((product)=>{
      counter += product.qty;
    })
    console.log(counter);
    return counter;
  }
  function getPrice(){
    let price =0;
    products.forEach((product)=>{
      price += parseInt(product.price)*(product.qty);
    })
    console.log(price);
    return price;
  }

  useEffect( async () => {
    let authToken = localStorage.getItem("customer-auth") || localStorage.getItem("retailer-auth") || localStorage.getItem("wholesaler-auth")
    let userDecoded = jwt_decode(JSON.parse(authToken).token)
    buyerId = userDecoded.user.id
    
    let user = await axios({ url: `/api/getuser/${buyerId}`, baseURL: 'http://localhost:5000' })
    setUser(user.data)
  }, [])

  if(user)
  return (
    <div className="cart-main-container">
      <Navbar cartTotal = {cartTotal}/>
      <Cart 
        type = {user.type}
        id={user._id}
        cartTotal = {cartTotal}
        setCartTotal = {setCartTotal}
        handleIncreaseQty={handleIncreaseQty}
        handleDecreaseQty={handleDecreaseQty}
        handleDeleteProduct={handleDeleteProduct}
      />
    </div>
  );

  return <div></div>
}

export default CartSplash;
