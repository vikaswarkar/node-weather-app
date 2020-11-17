const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    console.log('lat' + latitude)
    console.log('Long' + longitude)
    const url = 'http://api.weatherstack.com/current?access_key=f1de3bee172001e93325357a5800928a&query='+ longitude +',' + latitude
    
    console.log(url)

    request({ url, json:true}, (error, {body})=> {
        if (error){
            callback('Could not retrive Weather info')
        }else {
            callback(error, body.current.temperature)
        }
    })
}

module.exports = forecast