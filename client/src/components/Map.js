import React, { useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import axios from "axios"
import { geocode } from './geocode.js'

const Map = ({markerLocs, directionRoutes = [], height = '800px', width = '100%'}) => {  

  useEffect(() => {
    
    const genMarker = async () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaG9wZS1zY290Y2giLCJhIjoiY2tiaHduYnRlMDlsOTJxbWJsMTg5aHlsOSJ9.S92DKT4JNJ8jkzD4KQdsGw';
        const map = new mapboxgl.Map({
          container: 'map', // container ID
          style: 'mapbox://styles/mapbox/dark-v10', // style URL
          center: [73.0297,19.0330 ], // starting position
          zoom: 12 // starting zoom
        });

         // var seaWoodsMall = new mapboxgl.Marker({
        //     scale: 0.8
        // })
        // .setLngLat([73.01832995312378,19.02141076598357])
        // .setPopup(new mapboxgl.Popup().setHTML("<h6 style='color:#818181;padding:5px'>SeaWoods Mall</h6>"))
        // .addTo(map);
        // var mcDonalds = new mapboxgl.Marker({
        //     scale: 0.8
        // })
        // .setLngLat([73.022456477622,19.02464620334787])
        // .setPopup(new mapboxgl.Popup().setHTML("<h6 style='color:#818181;padding:5px'>McDonalds</h6>"))
        // .addTo(map);
        // var bakerBliss = new mapboxgl.Marker({
        //     scale: 0.8
        // })
        // .setLngLat([73.02314595100137,19.0279139183061])
        // .setPopup(new mapboxgl.Popup().setHTML("<h6 style='color:#818181;padding:5px'>Baker Bliss</h6>"))
        // .addTo(map);
        // var Dominos = new mapboxgl.Marker({
        //     scale: 0.8
        // })
        // .setLngLat([73.00864055013385,19.0439967694349])
        // .setPopup(new mapboxgl.Popup().setHTML("<h6 style='color:#818181;padding:5px'>Dominos</h6>"))
        // .addTo(map);
        // var PrimeMall = new mapboxgl.Marker({
        //     scale: 0.8
        // })
        // .setLngLat([73.06371562837627,19.039812599821804])
        // .setPopup(new mapboxgl.Popup().setHTML("<h6 style='color:#818181;padding:5px'>Prime Mall</h6>"))
        // .addTo(map);
        // var littleWorld = new mapboxgl.Marker({
        //     scale: 0.8
        // })
        // .setLngLat([73.06624029085143,19.030856912826778])
        // .setPopup(new mapboxgl.Popup().setHTML("<h6 style='color:#818181;padding:5px'>Little World</h6>"))
        // .addTo(map);
    
        // var shoppingPlaza = new mapboxgl.Marker({
        //     scale: 0.8
        // })
        // .setLngLat([73.04165723601213,19.02404242610254])
        // .setPopup(new mapboxgl.Popup().setHTML("<h6 style='color:#818181;padding:5px'>Shopping Plaza</h6>"))
        // .addTo(map);
        
        markerLocs.forEach((loc)=>{
            let t = new mapboxgl.Marker({
                scale: 0.8,
                color: loc[3]
            })
            .setLngLat([loc[0],loc[1]])
            .setPopup(new mapboxgl.Popup().setHTML(`<h6 style='color:#818181;padding:5px'>${loc[2]}</h6>`))
            .addTo(map);
        })

        let productList = await axios({ url: `/api/Customer/products?category=Fruits`, baseURL: 'http://localhost:5000' })
        let retailerList = []
    
        for(var i = 0; i < productList.data.length; i++) {
            let owner = await axios({ url: `/api/getuser/${productList.data[i].owner}`, baseURL: 'http://localhost:5000' })
    
            let invalidLocation = retailerList.some((retailerLocation) => owner.data.location === retailerLocation)
            
            if (invalidLocation) {
                continue
            }
    
            retailerList.push(owner.data.location)
            geocode(owner.data.location, (error, { latitude, longitude, location }) => {
                console.log(location)
            })
        }
    

        let dRoutes = []
        for(var i = 0; i<directionRoutes.length ; i += 10)
          dRoutes.push(directionRoutes[i])

        console.log(dRoutes)
        if(directionRoutes.length){
          map.on('load', function () {
              map.addSource('route', {
              'type': 'geojson',
              'data': {
              'type': 'Feature',
              'properties': {},
              'geometry': {
              'type': 'LineString',
              'coordinates': dRoutes
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
        }

    }    

    genMarker()

    
  }, [markerLocs])

  // extra part
  
  
  return (
    <div id='map' style={{height: `${height}`, width: `${width}`, borderBottomLeftRadius: '10px'}}>
    </div>
  )
}

export default Map;