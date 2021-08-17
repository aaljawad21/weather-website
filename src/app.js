const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./forecast.js')


const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const static_content =path.join(__dirname,'..','/public')
const viewsPath =path.join(__dirname,'..','/templates/views')
const partials =path.join(__dirname,'..','/templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partials)
// setup static directory
app.use(express.static(static_content))

app.get('', (req, res)=>{
    res.render('index.hbs',{
        title: 'Weather',
        name: 'Ali'
    })
})

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        title: 'About me',
        name: 'Ali'
    })
})

app.get('/help', (req, res)=>{
    res.render('help.hbs', {
        title: 'Help',
        name: 'Ali'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address)
    {
       return res.send({
            error: "Please provide an address",
        })
    }

    const coor = forecast.getCoordinates(req.query.address, (error,lat,lon)=>{
        
        if(error)
        {
            return res.send({
                error: error,
                source: 'getCoordinates'
            })
        }
        coordinates=lat + ', ' + lon   
        forecast.getTemp(coordinates,(error,{current})=>{
            return res.send({
                city: req.query.address,
                temperature: JSON.stringify(current.temperature)  
            })
        })   
    })


})

app.get('*', (req, res)=>{
    res.render('404.hbs', {
        title: '404',
        summary: 'Page Not Found'
    })
})


app.listen(port, () =>{
    console.log('Web Server started. Listening on port '+port)
})