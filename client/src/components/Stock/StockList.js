import React from 'react'
import StockItem from './StockItem'

const StockList = ({ products }) => {
  return (
    <div>
      {products.map((product, index) => {
        return <StockItem key={index} product={product} />
      })}
    </div>
  )
}

export default StockList
