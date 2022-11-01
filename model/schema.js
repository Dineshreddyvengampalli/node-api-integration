const mongoose =require('mongoose')

const WeatherData = mongoose.Schema({
        temperature : Number,
        feels_like : Number,
        temp_min : Number,
        temp_max : Number,
        pressure : Number,
        humidity : Number,
        sea_level : Number,
        grnd_level : Number,
        speed : Number,
        deg : Number,
        gust : Number
    
})

module.exports = mongoose.model('WeatherData',WeatherData)