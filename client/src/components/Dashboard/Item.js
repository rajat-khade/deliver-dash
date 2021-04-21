import React from 'react'
import './Item.css'

const Item = ({ product, modalHandler }) => {

  return (
    <div onClick={() => {
      modalHandler(false)
      modalHandler(product)
      }} className='item-container' style={{cursor:'pointer'}}>
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
            {'Delivery in 2 days'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
