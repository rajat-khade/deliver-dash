import React from 'react'
import Item from './Item'

const ItemSearchList = ({ searchResults, modalHandler }) => {

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop:'100px'
      }}>
      {searchResults.map((product) => {
        return <Item product={product} modalHandler = {modalHandler} margin='50' />
      })}
    </div>
  )
}

export default ItemSearchList