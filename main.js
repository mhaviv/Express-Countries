var express = require('express');

var app = express();

var fs = require('fs');

var parser = require('body-parser');

const readJSONFile = require('./countryInfo.js');

app.use(parser.json());

app.set('view engine','pug');

app.set('views','./my-views');

app.use(express.static(__dirname)) // tells express to send static files in order to read files like style.css

app.get('/', function(request, response) {
	response.send('hello');
})

app.get('/:name', function(request, response) {
	var userInput = request.params.name;
  	// response.send(userInput);


  	readJSONFile('./files/countries.json', function(parsedCountries) {

  		var countryObject;

  		for (var key in parsedCountries) {
  			countryObject = parsedCountries[key];
			if(countryObject.name.toLowerCase() === userInput.toLowerCase()) {
				console.log(countryObject);
				// response.send(`Country ${userInput} found!`)
				response.render('list', countryObject);
			} 
  		}
		console.log(`Country ${userInput} logged`);

  	})

});

app.listen(3000, function() {
  console.log('Example app is listening on port 3000!');
});

app.get('*', function(request, response){
	response.status(404).send('uh oh! page not found!');
})