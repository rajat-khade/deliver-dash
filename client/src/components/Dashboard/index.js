import React, { useState } from 'react'
import Navbar from './Navbar'
import Advertise from './Advertise'
import ItemList from './ItemList'
import Features from './Features'
import ProductModal from '../ProductModal'

const Dashboard = ({cart,setCart}) => {

    const [modal,setModal] = useState(false)

    const modalHandler = (val) => {
        setModal(val)
        console.log(modal)
    }

    return (
        <div>           
            {modal && <ProductModal modalHandler = {modalHandler} modal = {modal}/>}
            <Navbar cart = {cart}/>
            <Advertise />
            <ItemList type={'Customer'} category={'Batsman'} modalHandler = {modalHandler}/>
            <Features />
        </div>
    )
}

export default Dashboard
