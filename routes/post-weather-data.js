var express = require('express');
var router = express.Router();
const axios = require('axios')
const config = require('../config/config')

var WeatherData = require('../model/schema')

router.post('/',async(req,res)=>{
    let latitude = req.query.lat
    let longitude = req.query.lon
    console.log(latitude,longitude)
    let response = await axios.get(`${config.open_api_url}`,{params:{
        appid : config.api_key,
        lat : latitude,
        lon : longitude
        }
    })
    let resData = response.data
    let weatherData = new WeatherData({
        temperature : resData.main.temp,
        feels_like : resData.main.feels_like,
        temp_min : resData.main.temp_max,
        temp_max : resData.main.temp_max,
        pressure : resData.main.pressure,
        humidity : resData.main.humidity,
        sea_level : resData.main.sea_level,
        grnd_level : resData.main.grnd_level,
        speed : resData.wind.speed,
        deg : resData.wind.deg,
        gust : resData.wind.gust
    })
    return weatherData.save(function (err) {
		if (!err) {
			return res.json({
				stausCode : 200,
				weatherData : weatherData
			});
		} else {
			return res.json({
				statusCode : 500,
				error : 'API Server error'
			});
		}
	});
})


module.exports = router