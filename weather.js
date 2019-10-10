

const credentials = require('./credentials.js')

const request = require('request')

const mapBoxCity = function (){

	//usé una variable porque no supe bien como manejar el input, pero así es un poco más fácil cambiar de ciudad y probar
	var ciudad = 'Acapulco'

	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + ciudad + '.json?access_token=' + credentials.MAPBOX_TOKEN

	request({url, json: true}, function(error, response){
		const data = response.body
		const info = {
			features : []
		}
		info.features.push(data.features[0].center)
		var variable = info.features.pop().toString()
		var datos = variable.split(',');
		var longitud = datos[0]
		var latitud = datos[1]
		//console.log(longitud)
		//console.log(latitud)

		//Aprovechando que tenía como variable la ciduad, aproveché para pasarla como parámetro y mostrarla al final
		weatherCity(latitud, longitud,ciudad)
	})
}

const weatherCity = function(latitud,longitud, ciudad) {
	//console.log('https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + latitud + ',' + longitud)
	const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + latitud + ',' + longitud
	request({url, json: true}, function(error, response) {
		const data = response.body
		const info = {
			Currently: data.currently
		}
		//info.features.push(data.features[0].center)
		var summary = info.Currently.summary
		var temperature = info.Currently.temperature
		var precipProbability = info.Currently.precipProbability
		temperature = (temperature - 32) * (5/9)
		precipProbability = precipProbability * 100
		//console.log(summary)
		//console.log(temperature)
		//console.log(precipProbability)

		//Muestro la ciudad, latitud y longitud de donde se está tomando la temperatura para una información más completa
		console.log('The weather in ' + ciudad + ' (latitude: ' + latitud + ', longitude: ' + longitud + ') is : ' + summary + '. The current temperature is ' + temperature + 'ºC. There is ' + precipProbability + '% chance of rain.')
		
		//console.log(info)
	})
}

module.exports = {
	mapBoxCity : mapBoxCity,
	weatherCity : weatherCity
}

