const bodyParser = require("body-parser");

const express = require("express");
app = express();
       request = require("request");
       


       app.set("view engine", "ejs");
       app.use(bodyParser.urlencoded({extended: true}));
       app.use(express.static("public"));


app.get("/results", (req, res) => {
    const city = req.query.city;
    
    request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=859fe2b3199587f4d4f464aa4bb2c2db`, function (error,response , body){
        if(error){
            console.log(error)
        } else {
            const weatherData = JSON.parse(body);
            const temp =  weatherData.main.temp;
            const icon =  weatherData.weather[0].icon;
            const country =  weatherData.sys.country;
            const status =  weatherData.wind.speed;
            const elements =  weatherData.weather[0].description;
            const humidity =  weatherData.main.humidity;
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            res.render("results", {
                city: city,
                temp: temp,
                icon: imageURL,
               country: country,
               elements: elements,
               status: status,
               humidity: humidity,

            })
            console.log(weatherData)
           
        }
    })
    
})


app.get("/", (req, res) => {
  res.render("weather")
})






       app.listen(process.env.PORT || 3000, () => {
        console.log("server has atarted")
       })