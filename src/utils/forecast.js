const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const forecastURL = `http://api.weatherstack.com/current?access_key=92821c882a83a3c90d48e3ef4e49f255&query=${latitude},${longitude}`
    request({url : forecastURL, json:true}, (error, response)=> {
        if(error){
            callback('Unable to connect to weather services', undefined)
        }
        else if (response.body.error){
            callback('Error!!!! Unable to find location', undefined)
        }
        else{
            const data = response.body.current
            callback(undefined, `It is currently ${data.temperature} degress out. It feels like ${data.feelslike} degress out`)
        }
        
    })
}

module.exports = forecast




// const url = 'http://api.weatherstack.com/current?access_key=92821c882a83a3c90d48e3ef4e49f255&query=19.450168,72.801506'


// request({url, json:true}, (error, response)=> {
//     if(error){
//         console.log('Unable to connect to weather services')
//     }
//     else if (response.body.error){
//         console.log('Error!!!! Unable to find location')
//     }
//     else{
//         const data = response.body.current
//         console.log(`It is currently ${data.temperature} degress out. It feels like ${data.feelslike} degress out`)
//     }
    
// })



