import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Item.css'

const Item = ({ product, modalHandler, color, type, margin = 0 }) => {

  const [noOfSellers, setNoOfSellers] = useState(0)

  useEffect( async () => {
    const response = await axios({ url: `/api/${type}/products`, baseURL: 'http://localhost:5000' })

    const sellers = response.data.filter(item => item.name === product.name)
    setNoOfSellers(sellers.length)
  }, [])

  return (
    <div onClick={() => {
      modalHandler(false)
      modalHandler(product)
      }} className={`item-container ${color}`} style={{cursor:'pointer', marginTop: `${margin}px`}}>
      <div className='item-contents'>
        <div className='item-image'>
          <div className='item-image-details' style={{
            background: `url(${product.image}) no-repeat`}} 
             />
        </div>
        <div className='item-details'>
          <div className='item-name'>
            {product.name}
          </div>
          <div className='divider' />
          <div className='item-price'>
            &#8377;  {product.price}
          </div>
          <div className='divider' />
          <div className='item-delivery'>
            {!margin?`Available from ${noOfSellers} sellers`: `${product.description}`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
