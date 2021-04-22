import React from 'react'

import './StockItem.css'

const StockItem = ({ product, editModal, setEditModal }) => {
  return (
    <div className='stock-item-container' onClick = {()=>{
      setEditModal(false)
      console.log(editModal)
      setEditModal(product)
    }}>
      <div className='stock-image'>
        <div style={{
          background: `url(${product.image}) no-repeat`,
          backgroundSize: '100% 100%',
          height: '100%',
          width: '100%',
          borderRadius: '15px'
        }}></div>
      </div>
      <div className='stock-details'>
        <div className='stock-item-name'>{product.name}</div>
        <div className='stock-item-quantity'>{product.quantity}</div>
        <div className='stock-item-price'>{product.price}</div>
        <div style={{maxWidth: '150px',textOverflow: 'ellipsis'}} className='stock-item-description'>{product.description}</div>
        <div className='stock-item-category'>{product.category}</div>
      </div>
    </div>
  )
}

export default StockItem
