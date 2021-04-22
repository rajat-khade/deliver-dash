import React from 'react'
import EditModal from '../EditModal'
import StockItem from './StockItem'

const StockList = ({ products, editModal, setEditModal }) => {
  return (
    <div>
      {editModal && <EditModal setEditModal = {setEditModal} editModal = {editModal}/>}

      {products.map((product, index) => {
        return <StockItem key={index} product={product} setEditModal = {setEditModal} editModal = {editModal}/>
      })}
    </div>
  )
}

export default StockList
