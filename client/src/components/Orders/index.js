import React, { useState, useEffect } from 'react'
import PendingOrderList from './PendingOrderList'
import CompletedOrderList from './CompletedOrderList'
import InTransitOrderList from './InTransitOrderList'
import axios from 'axios'
import jwt_decode from "jwt-decode"
import Navbar from '../Navbar'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Orders = () => {

  const [orderList, setOrderList] = useState([])  
  const [forceRender, setForceRender] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState('')

  useEffect(async () => {
    let authToken = localStorage.getItem("customer-auth") || localStorage.getItem("retailer-auth") || localStorage.getItem("wholesaler-auth") || localStorage.getItem("delivery-auth")
        
    if(authToken) {
      let userDecoded = jwt_decode(JSON.parse(authToken).token)
      let buyerId = userDecoded.user.id

      let user = await axios({ url: `/api/getuser/${buyerId}`, baseURL: 'http://localhost:5000' })
      setUser(user.data)

      const response = await axios({ url: `/api/${user.data.type}/orders/${user.data._id}`, baseURL: 'http://localhost:5000' })
      setOrderList([...response.data])
    }
    setLoaded(true)

  }, [forceRender])

  if(loaded)
  return (
    <div style={{width: '100vw', height: '100vh', paddingTop: '50px'}}>
      <Navbar user={user}/>
      <div style={{width: '100%', height: 'auto', padding: '80px'}}>
        <Tabs>
          <TabList>
            <Tab>Pending Orders</Tab>
            <Tab>Orders In Transit</Tab>
            <Tab>Completed Orders</Tab>
          </TabList>

          <TabPanel>
            <PendingOrderList setForceRender = {setForceRender} forceRender = {forceRender} orders={orderList.filter((order) => order.status === 'placed' || order.status === 'dispatch')} />
          </TabPanel>

          <TabPanel>
            <PendingOrderList setForceRender = {setForceRender} forceRender = {forceRender} orders={orderList.filter((order) => order.status === 'transit')} />
          </TabPanel>

          <TabPanel>
            <PendingOrderList setForceRender = {setForceRender} forceRender = {forceRender} orders={orderList.filter((order) => order.status === 'delivered')} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )

  return <></>
}

export default Orders
