const request = require('request')

const geoCodeAccessToken = 'pk.eyJ1IjoidmlrYXN3YXJrYXIiLCJhIjoiY2toZmFjdGFrMGNjaDJ5bWdseGw3aWg3aSJ9.ZpCUN2QtJ47Q-tcaQcD8-A'

const geoCode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token='+geoCodeAccessToken;
    
    request({url, json:true}, (error, {body})=>{
        console.log('URL==>' + url)
        if (error){
            callback('Unable to find location. Try another search.')
        } else if (body.features.length == 0 ){
            callback('Unable to find location. Try another search.')
        }else {
            callback(error, {
                latitude: body.features[0].center[0],            
                longitude: body.features[0].center[1],
                place_name: body.features[0].place_name
            })     
        }   
    })
}

module.exports = geoCode
