const { json } = require('express');
const express = require('express');
const https = require("https");
const bodyPaser = require("body-parser");

const app = express();
app.use(bodyPaser.urlencoded({extended:true}));

const api = {
    key: "insertkeyhere",
    base: "https://api.openweathermap.org/data/2.5/weather?q=",
    imageUrl: "http://openweathermap.org/img/wn/"
}

app.get("/",function(req,res){
res.sendFile(__dirname +"/index.html");
})

app.post("/",function(req,res){
    const query = req.body.cityName;
    const unit = "metric";
    https.get(`${api.base}${query}&appid=${api.key}&units=${unit}`, function (response) {
    console.log(response);
    response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = Math.round(weatherData.main.temp);
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = `${api.imageUrl}${icon}@2x.png`;
        res.write(`<p>The weather is currently ${weatherDescription}</p>`);
        res.write(`<h1>The Tempature in ${query} is ${temp} degrees celcuis</h1>`)
        res.write(`<img src="${imageUrl}">`);
        res.send;
        res.end();
    })
});
})



app.listen(3000,function(){
     
})