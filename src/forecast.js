const request = require('request')

 
const getCoordinates = (city, callback)=>{

    const url_mapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(city)  + '.json?access_token=pk.eyJ1IjoiamF3YWRhcyIsImEiOiJja3M1czg4Nmsyajk5MndvOXliMHBscXFsIn0.NcgMyqZ7R611qBD9o_8zww'

    request({url: url_mapbox, json:true}, (error,{body}) => {

        if (error)
        { callback('There seems to be internet connection problem', null)}
        else if(!body.features[0])
        {
        {    callback('Unable to find location, please try again', null)}
        }
        else{
        const data = body
        const latitude = data.features[0].center[1]
        const longitude = data.features[0].center[0]
 //       console.log(latitude, ', ' + longitude)
        callback(null, latitude,longitude )
    }
    })

}



const getTemp = (coordinates,callback)=>{

 const url_weatherstack = 'http://api.weatherstack.com/current?access_key=1acd6d661eafb1778852f4ca4c657a3c&query='+coordinates


request({url: url_weatherstack, json:true}, (error,{body}) => {

    if (error)
    { callback('Unable to connect to Weather Service', 'undefinedx')}
    else if(body.error)
    {
        callback('Unable to find location', 'undefinedxx')
    }
    else{
    const temp = body
  //  const temp = data.current.temperature
    
    
       callback('undefinedxxx',temp)

}
})
}





     module.exports = {
        getTemp: getTemp,
        getCoordinates: getCoordinates
    }
 