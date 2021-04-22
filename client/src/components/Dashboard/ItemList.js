import React, { useState, useEffect, Fragment } from 'react'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";
import axios from 'axios'
import Item from './Item'
import './Item.css'

const ItemList = ({ type, category, modalHandler, color }) => {

  const [products, setProducts] = useState([])

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 3
    }
  }

  useEffect(async () => {
    let productList = await axios({ url: `/api/${type}/products?category=${category}&&unique=true`, baseURL: 'http://localhost:5000' })

    setProducts([...productList.data])
  }, [])
  
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '100px 0'
      }}>
      <Fragment>
        <Carousel
          partialVisbile
          containerClass='item-list-container' 
          responsive={responsive} 
          itemClass='carousel-item-container'>
          {
            products.map((product) => {
            return (
              <Item 
                product={product} 
                modalHandler = {modalHandler}
                color={color} 
                type={type}/>
              )
            })
          }
        </Carousel>
      </Fragment>
    </div>
  )

}

export default ItemList
