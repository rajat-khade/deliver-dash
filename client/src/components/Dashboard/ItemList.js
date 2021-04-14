import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Item from './Item'

const ItemList = ({ type, category, modalHandler }) => {

  const [products, setProducts] = useState([])

  useEffect(async () => {
    let productList = await axios({ url: `/api/${type}/products?category=${category}`, baseURL: 'http://localhost:5000' })

    setProducts([...productList.data])
  }, [])

  
  return (
    <div style={{display: 'flex'}}>
      {products.map((product) => {
        return <Item product={product} modalHandler = {modalHandler}/>
      })}
    </div>
  )

}

export default ItemList
