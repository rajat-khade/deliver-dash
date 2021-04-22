import React, { useState, useEffect } from 'react'
import axios from 'axios'

import StockList from './StockList'

import './Stock.css'

const Stock = ({ type, id }) => {

  const [editModal,setEditModal] = useState(false)
  const [products, setProducts] = useState([])

  const getStockItems = async () => {
    try {
      const stockItems = await axios({ url: `/api/${type}/stock/${id}`, baseURL: 'http://localhost:5000' })
      setProducts([...stockItems.data])
    } catch (error) {
      
    }
  }

  useEffect(() => {
    console.log('Stock')
    getStockItems()
  }, [])

  return (
    <div className='stock-container'>
      <h1 style={{marginBottom: '20px', fontWeight: '600', textAlign: 'center'}}>Stock</h1>
      <StockList products={products} setEditModal = {setEditModal} editModal = {editModal}/>
    </div>
  )
}

export default Stock;
