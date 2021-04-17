import React, { useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import axios from "axios"
import { geocode } from './geocode.js'

const Map = () => {  

  const genRoute = async (loc1, loc2) => {
    let lat1 = loc1.getLngLat().lat
    let long1 = loc1.getLngLat().lng
    let lat2 = loc2.getLngLat().lat
    let long2 = loc2.getLngLat().lng

    // console.log(lat1,lat2,long1,long2)
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

  useEffect(async () => {
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiaG9wZS1zY290Y2giLCJhIjoiY2tiaHduYnRlMDlsOTJxbWJsMTg5aHlsOSJ9.S92DKT4JNJ8jkzD4KQdsGw';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/dark-v10', // style URL
      center: [73.0297,19.0330 ], // starting position
      zoom: 13 // starting zoom
    });
    
    
    let productList = await axios({ url: `/api/Customer/products`, baseURL: 'http://localhost:5000' })

    for(var i = 0; i < productList.data.length; i++) {
        let owner = await axios({ url: `/api/getuser/${productList.data[i].owner}`, baseURL: 'http://localhost:5000' })

        geocode(owner.data.location, (error, { latitude, longitude, location }) => {
            console.log(location, latitude, longitude)
            let marker = new mapboxgl.Marker({
                scale: 0.8
            })
            .setLngLat([longitude,latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`<h6 style='color:#818181;padding:5px'>${owner.data.name}</h6>`))
            .addTo(map);
        })
    }

    
    var seaWoodsMall = new mapboxgl.Marker({
        scale: 0.8
    })
    .setLngLat([73.01832995312378,19.02141076598357])
    .setPopup(new mapboxgl.Popup().setHTML("<h6 style='color:#818181;padding:5px'>SeaWoods Mall</h6>"))
    .addTo(map);
    var mcDonalds = new mapboxgl.Marker({
        scale: 0.8
    })
    .setLngLat([73.022456477622,19.02464620334787])
    .setPopup(new mapboxgl.Popup().setHTML("<h6 style='color:#818181;padding:5px'>McDonalds</h6>"))
    .addTo(map);
    var bakerBliss = new mapboxgl.Marker({
        scale: 0.8
    })
    .setLngLat([73.02314595100137,19.0279139183061])
    .setPopup(new mapboxgl.Popup().setHTML("<h6 style='color:#818181;padding:5px'>Baker Bliss</h6>"))
    .addTo(map);
    var Dominos = new mapboxgl.Marker({
        scale: 0.8
    })
    .setLngLat([73.00864055013385,19.0439967694349])
    .setPopup(new mapboxgl.Popup().setHTML("<h6 style='color:#818181;padding:5px'>Dominos</h6>"))
    .addTo(map);
    var PrimeMall = new mapboxgl.Marker({
        scale: 0.8
    })
    .setLngLat([73.06371562837627,19.039812599821804])
    .setPopup(new mapboxgl.Popup().setHTML("<h6 style='color:#818181;padding:5px'>Prime Mall</h6>"))
    .addTo(map);
    var littleWorld = new mapboxgl.Marker({
        scale: 0.8
    })
    .setLngLat([73.06624029085143,19.030856912826778])
    .setPopup(new mapboxgl.Popup().setHTML("<h6 style='color:#818181;padding:5px'>Little World</h6>"))
    .addTo(map);
    var shoppingPlaza = new mapboxgl.Marker({
        scale: 0.8
    })
    .setLngLat([73.04165723601213,19.02404242610254])
    .setPopup(new mapboxgl.Popup().setHTML("<h6 style='color:#818181;padding:5px'>Shopping Plaza</h6>"))
    .addTo(map);
    

    const route = await genRoute(PrimeMall, bakerBliss)

    map.on('load', function () {
        map.addSource('route', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        'coordinates': route
        }
        }
        });
        map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#888',
        'line-width': 8
        }
        });
        });
  }, [])

  // extra part
  
  
  return (
    <div id='map' style={{height: '400px', width: '100%'}}>
    </div>
  )
}

export default Map;