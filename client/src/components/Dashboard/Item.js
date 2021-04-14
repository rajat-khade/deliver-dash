import React from 'react'
import './Item.css'

const Item = ({ product, modalHandler }) => {

  return (
    <div onClick={() => modalHandler(product)} className='item-container' style={{cursor:'pointer'}}>
      <div className='item-contents'>
        <div className='item-image'>
          <div style={{background: `url(${product.image}) no-repeat`, backgroundSize: '100% 100%', width: '100%', height: '100%', borderRadius: '10px'}} />
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
