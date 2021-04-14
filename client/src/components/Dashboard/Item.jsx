import React, { useState } from "react";
import axios from 'axios'

import { Link } from "react-router-dom";
import "./Item.css"

function Item ({ cart, setCart }) {

    const addToCart = (item) => {
      var data = {
        price: item.price,
        title: item.title,
        qty: item.qty,
        img: item.image,
        id: item.id
      }

      item.qty++

      if(data.qty===0){
        data.qty = 1
        setCart([...cart,data])
      }
      else{
        console.log("repeat")
        var cartCopy = cart
        cartCopy.forEach((prod)=>{
          if(prod.id === item.id){
            prod.qty++
          }
          return
        })

        setCart(cartCopy)
      }
      
      console.log(cart)
    }

    const [allItems,setAllItems] = useState([
      {
        title: "Strawberry",
        id: 1,
        image: "/images/strawberry.jpg",
        text: "Have these strawberries",
        price: "400",
        location: "Hyderabad",
        eta: "Delivery: 2-3 business days",
        qty: 0
      },
      {
        title: "Apple",
        id: 2,
        image: "/images/apple.jpg",
        text: "Have these Apples",
        price: "600",
        location: "Delhi",
        eta: "Delivery: 4-5 business days",
        qty: 0
      },
      {
        title: "Peach",
        id: 3,
        image: "/images/mango.jpg",
        text: "Have these strawberries",
        price: "400",
        location: "Hyderabad",
        eta: "Delivery: 2-3 business days",
        qty: 0
      },
      {
        title: "Mango",
        id: 4,
        image: "/images/mango.jpg",
        text: "Have these strawberries",
        price: "400",
        location: "Hyderabad",
        eta: "Delivery: 2-3 business days",
        qty: 0
      }
    ])

     return (
      <>
      <div className="fruit-cards">
      <div className="row fruit-row">

        {allItems.map((item)=> 
          <>
          <div className="col-md-6 col-lg-3 col-custom">
            <div className="card" style={{width: "15rem"}}>
              <img src= {item.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.text}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Price: {item.price}</li>
                <li className="list-group-item">{item.location}</li>
                <li className="list-group-item">{item.eta}</li>
              </ul>
              <div className="card-body">
                <div className="card-link" id = "productModalHandler" type = "button" data-toggle="modal" data-target="#productModal" style={{cursor:"pointer"}}>View details</div>

                {/* <Link to = {{
                pathname: "/customer/cart",
                state: {
                  cart : cart
                }}}>

                  <span href="/customer/cart" style={{cursor:"pointer"}} className="card-link">Go to cart</span>
                </Link> */}
              </div>
            </div>
          </div>
          </>
        )}


      </div>
    </div>
    </>
    );
 }

 export default Item;