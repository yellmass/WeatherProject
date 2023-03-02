const express = require('express')
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({extended:true}))
const https = require('https')

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html")})

app.post("/", function(req,res){

    var cityentered = req.body.cityName
    var unitentered = req.body.unitName

    if(unitentered=="standard"){var unitSymbol="K" }
    else if(unitentered=="imperial"){var unitSymbol="F" }
    else if(unitentered=="metric"){var unitSymbol="C" }


    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityentered+"&appid=b1cc18b02843c8e96d8d30a67ef1c6a7&units="+unitentered
    https.get(url, function(response){

        response.on('data', function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = 'http://openweathermap.org/img/wn/'+weatherData.weather[0].icon+'@2x.png'
            
            res.setHeader("Content-Type", "text/html");
            res.write('<h1>The temprature in '+weatherData.name+' is '+temp+' '+unitSymbol+'.</h1>')
            res.write('<p>The weather description: '+description+'.</p>')
            res.write('<img src='+icon+'>')
            res.send()
        })
    })


    })


app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000")
})