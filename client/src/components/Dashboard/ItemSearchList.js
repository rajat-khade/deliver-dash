import React from 'react'
import Item from './Item'

const ItemSearchList = ({ searchResults, modalHandler }) => {

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
      {searchResults.map((product) => {
        return <Item product={product} modalHandler = {modalHandler}/>
      })}
    </div>
  )
}

export default ItemSearchList