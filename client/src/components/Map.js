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
          zoom: 13 // starting zoom
        });
        
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