const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const public_path = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const views_path = path.join(__dirname, '../template/views')
const partials_path = path.join(__dirname, '../template/partials')
hbs.registerPartials(partials_path)

// This sets the templating engine to hbs
app.set('view engine', 'hbs')
app.set('views', views_path)

// paths are matched in the order they are defined. 

// This is used to setup static scontent
app.use(express.static(public_path))

app.get('/weather', (request, response) => {
    if(!request.query.address){
        return response.render('index', {
            message: 'Please provide address'
        } )
    }

    geocode(request.query.address, (geoCodeError, {latitude, longitude, place_name } = {})=>{

        if (geoCodeError)
        return response.send( {
            forecast: 'Error getting data from Geocode service.',
            location: '',
            address: request.query.address,
            appName: 'Weather App',
            developer :'Vikas Warkar'            
        })

        forecast(latitude, longitude, (weatherError, temperature)=>{
            if (weatherError)
            return response.send( {
                forcast:'Erorr getting data from weather service',
                location: '',
                address: request.query.address,    
                appName: 'Weather App',
                developer :'Vikas Warkar'                
            })

            return response.send( {
                forecast: 'Current temperature in ' + place_name + ' is ' + temperature + ' degree celsius.',
                location: '',
                address: request.query.address,    
                appName: 'Weather App',
                developer :'Vikas Warkar'                
            })
        })

    })

})

app.get('', (request, response)=>{
    response.render('index', {
        helpText:'This is all the help you will ever need.',
        appName: 'Weather App',
        developer :'Vikas Warkar'        
    })
})

app.get('/help', (request, response)=>{
    response.render('help', {
        helpText:'This is all the help you will ever need.',
        appName: 'Weather App',
        developer :'Vikas Warkar'        
    })
})

app.get('/about', (req, resp)=>{
    resp.render('about',{
        appName:'Weather App',
        developer : 'Vikas Warkar'
    })
});

app.get('/help/*', (request, response)=>{
    response.render('404', {        
        helpText:'This is all the help you will ever need.',
        appName: 'Weather App',
        developer :'Vikas Warkar',
        errorMessage : 'help article not found'                        
    })
})


app.get('*', (request, response)=>{
    response.render('404', {        
            helpText:'This is all the help you will ever need.',
            appName: 'Weather App',
            developer :'Vikas Warkar',
            errorMessage : 'Page not found'                        
    })
})

app.listen(port, ()=>{
    console.log('Server started at ' + port)
})
