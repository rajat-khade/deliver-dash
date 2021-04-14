import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import CartItem from "./CartItem";
import axios from 'axios'

function Cart ({ type, id, handleIncreaseQty, handleDecreaseQty, handleDeleteProduct }) {
    const [products, setProducts] = useState([]);

    useEffect(async () => {
        const productList = await axios({ url: `/api/${type}/cart/${id}`, baseURL: 'http://localhost:5000' })
        console.log(typeof(JSON.parse(productList.data)))
        // setProducts([...productList.data])
    }, [])

    const getProduct = async (id) => {
        const product = await axios({ url: `/api/products/${id}`, baseURL: 'http://localhost:5000' })
        return product
    }

    return (
        <div className="cart">
            <h1>Cart</h1>
            {products.map(async (product, index) => {
                // const cartItem = await getProduct(product.productId)

                return <CartItem 
                    product={product}
                    key={index}
                    handleIncreaseQty={()=>handleIncreaseQty(product)}
                    handleDecreaseQty={()=>handleDecreaseQty(product)}
                    handleDeleteProduct={()=>handleDeleteProduct(product.id)}
                />
            })}
        </div>);
}
export default Cart;