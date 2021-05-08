const path = require('path')
const express = require('express') // Express library exposes just a single function as opposed to something like an object
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')


// Express is just a function and we call it to create a new express application
const app = express() 
const port = process.env.PORT || 3000

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, './'))
console.log(path.join(__dirname, '../'))


//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//console the values
console.log(publicDirectoryPath)
console.log(viewsPath)
console.log(partialsPath)

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (request, response) => {
    response.render('index', {
        title : 'Weather',
        name : 'Neha Saraf'
    }) // render allows us to render one of our views

})

app.get('/about', (request, response) => {
    response.render('about', {
        title : 'About Me',
        name : 'Neha Saraf'
    })
})

app.get('/help', (request, response) => {

    response.render('help', {
        helptext : 'This is some helpful text',
        title : 'Help Page',
        name : 'Neha Saraf'
    })
})

// express() function does not take any arguments 
// instead we configure our server by using various methods provided on the application itself.
// Now we can start to tell our express application what exactly it should do

//app.get() 
// this lets us conigure what the server should do when someone tries to get the resource at a speciic URL.
//may be we should be sending back HTML or may be we should be sending back JSON.
//get() method take the 2 arguments -- 1st the route
//2nd function -- it would get execute when someone will visit that page

// app.get('', (request, response)=> {
//     response.send('<h1> Hello Express!!! </h1>')
// })

// app.get('/help', (request, response)=> {
//     response.send('<h1> Help </h1>')
// })

// app.get('/about', (request, response)=> {
//     response.send('<h1> About </h1>')
// })

app.get('/weather', (request, response)=> {
    if(!request.query.address){
        return response.send({
            error : 'Please provide the address'
        })
    }
    geoCode(request.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error)
        return response.send({error})
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
            return response.send({error})
            }
            response.send({
                location, 
                address : request.query.address, 
                forecast : forecastData  
            })
        })
    })
})

app.get('/products', (request, response) => {
    if (!request.query.search) {
        return response.send({
            error : 'Provide some search'
        })
    }
    console.log(request.query)
    console.log(request.query.search)
    response.send({
        products : []
    })
})

app.get('/help/*', (request, response) => {
    response.render('404', {
        title : 'Error - 404',
        errorMessage : 'Help article not found',
        name : 'Neha Saraf'
    }

    )
})

app.get('*', (request, response) => {
    response.render('404', {
        title : 'Error - 404',
        errorMessage : 'Page not found',
        name : 'Neha Saraf'
    })
})


// start the server at the end
app.listen(port, ()=> console.log(`Congrats!!!! Server is up on port ${port}`))











