import axios from 'axios'

const geocode = async (address, callback) => {

    // encode the special characters including ' ', '?', etc.
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaG9wZS1zY290Y2giLCJhIjoiY2tiaHduYnRlMDlsOTJxbWJsMTg5aHlsOSJ9.S92DKT4JNJ8jkzD4KQdsGw&limit=1'

    try {
      const {data} = await axios({url})
    //   console.log(res)
      const { features: feature } = data
        
    //   if (error)
    //       callback('Unable to connect to Location Services!', undefined)
    //   else if (feature.length === 0) {
    //       callback('Unable to find location! Try another search.', undefined)
      
    //   else {
          // define the response
          // return an object
          callback(undefined, {
              latitude: feature[0].center[1],
              longitude: feature[0].center[0],
              location: feature[0].place_name
          })
    //   }
    } catch (e) {
        console.log("Errorrr")
    }
}

export { geocode }