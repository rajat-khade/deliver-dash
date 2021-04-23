import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode"
import axios from "axios"

import DeliveryAuth from '../../../containers/DeliveryAuth';
import Navbar from '../../Navbar'
import Map from "../../Map"
import OrderList from './OrderList'

const DeliveryPrivate = () => {
    const auth = DeliveryAuth.useContainer();
    const [deliveryId, setDeliveryId] = useState(null)
    const [orders, setOrders] = useState([])
    const [user, setUser] = useState()
    const [markerLocs, setMarkerLocs] = useState([])
    const [forceRender, setForceRender] = useState(false)
    const [directionRoutes, setDirectionRoutes] = useState([])

    const genRoute = async (lat1,long1,lat2,long2) => {
    
        console.log(lat1,lat2,long1,long2)
        // console.log(loc1.getLngLat().lat, loc1.getLngLat().lng)
        let data = await axios({ url: `/routing/1/calculateRoute/${lat1}%2C${long1}%3A${lat2}%2C${long2}/json?avoid=unpavedRoads&key=VymSTXq7CYyeq7mL4y8ejjdJNA4RXle0`, baseURL: 'https://api.tomtom.com' })
        // const points = data.data.routes.legs.points
        const points = data.data.routes[0].legs[0].points
        const routes = []
        points.forEach((point)=>{
            routes.push([point["longitude"],point["latitude"]])
          })
    
        return routes
    }


    const getOrders = async (id) => {
        const response = await axios({ url: `/api/${id}/orders`, baseURL: 'http://localhost:5000' })

        let dOrders = response.data
        let mLocs = []

        for(var i = 0; i<dOrders.length; i++){

            
            let dOrder = dOrders[i]
            
            if(dOrder.status === "delivered" || dOrder.status === "placed")
                continue

            const { data : seller } = await axios({ url: `/api/getuser/${dOrder.fromId}`, baseURL: 'http://localhost:5000' })

            let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(seller.location) + '.json?access_token=pk.eyJ1IjoiaG9wZS1zY290Y2giLCJhIjoiY2tiaHduYnRlMDlsOTJxbWJsMTg5aHlsOSJ9.S92DKT4JNJ8jkzD4KQdsGw&limit=1'

            const {data : coordinates1} = await axios({url: url})
            let lat1 = coordinates1.features[0].center[1]
            let long1 = coordinates1.features[0].center[0]
            let loc1 = coordinates1.features[0].place_name

            mLocs.push([long1,lat1,loc1,"red"])


            const { data : buyer } = await axios({ url: `/api/getuser/${dOrder.toId}`, baseURL: 'http://localhost:5000' })

            url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(buyer.location) + '.json?access_token=pk.eyJ1IjoiaG9wZS1zY290Y2giLCJhIjoiY2tiaHduYnRlMDlsOTJxbWJsMTg5aHlsOSJ9.S92DKT4JNJ8jkzD4KQdsGw&limit=1'

            const {data : coordinates2} = await axios({url: url})
            let lat2 = coordinates2.features[0].center[1]
            let long2 = coordinates2.features[0].center[0]
            let loc2 = coordinates2.features[0].place_name

            mLocs.push([long2,lat2,loc2,"#3FB1CE"])
            
            // let routes = await genRoute(lat1,long1,lat2,long2)
            // setDirectionRoutes([...directionRoutes,...routes])
        }

        setMarkerLocs(mLocs)

        setOrders([...response.data])
        console.log(orders,response.data)
    }

    useEffect( async () => {
        let authToken = localStorage.getItem("delivery-auth")
        let user = jwt_decode(JSON.parse(authToken).token)
        let id = user.user.id

        user = await axios({ url: `/api/getuser/${id}`, baseURL: 'http://localhost:5000' })

        setUser(user.data)
        setDeliveryId(id)
        getOrders(id)
    }, [forceRender])

    if(user)
    return ( 
        <>
        <Navbar user = {user}/>
        <div 
            style={{
                width: '100%',
                height: '80%',
                marginTop: '60px'
            }}>
            <div 
                style = {{
                    display: 'flex', 
                    height: '100%', 
                    width: '100%'
                }}>
                <div style = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '50%',
                    padding: '80px'
                }}>
                    <OrderList setForceRender = {setForceRender} forceRender = {forceRender} orders={orders.filter((order) => order.status !== 'placed')} />
                </div>
                <div style={{width:'50%',position:'fixed',right:'0px'}}>
                    <Map markerLocs = {markerLocs}/>
                </div>
            </div>
        </div>
        </>
    )
    return <></>
}

export default DeliveryPrivate
