
const request = require('request')

const geoCode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoibm5zYXJhZjkxMiIsImEiOiJja2ZydWk4em4wMHduMnd0OHRvcHEwcmw3In0.k4MvIngwIO5_Y3CJX9JWyQ&limit=1`
    request({url : geocodeURL, json : true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        }
        else if (response.body.features.length === 0){
            callback('Unable to find location ! Please try another search', undefined)
        }
        else{
            const data = response.body.features[0]
            const latitude = data.center[1]
            const longitude = data.center[0]
            const location = data.place_name
            callback(undefined, {latitude, longitude, location})
        }

    })

}

module.exports = geoCode

// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/virar%20west.json?access_token=pk.eyJ1Ijoibm5zYXJhZjkxMiIsImEiOiJja2ZydWk4em4wMHduMnd0OHRvcHEwcmw3In0.k4MvIngwIO5_Y3CJX9JWyQ&limit=1'
// request({url : geocodeURL, json:true}, (error, response)=> {
//     if(error){
//         console.log('Unable to connect to location services')
//     }
//     else if (response.body.features.length ===0){
//         console.log('Error!!!! Please enter valid address')
//     }
//     else{
//         const data = response.body.features[0].center
//         const latitude = data[1]
//         const longitude = data[0]
//         console.log(data)
//         console.log(latitude, longitude)
//     }
// })
