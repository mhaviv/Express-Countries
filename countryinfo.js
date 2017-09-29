let fs = require('fs');

function readJSONFile(filepath, callback){
	fs.readFile(filepath, 'utf-8', function(err, data){

		if (err) throw err; 

		let parsed = JSON.parse(data);

		//after parsing is finished execute callback - function that is called once something triggers it (inside other function)
		callback(parsed);
	});

}

module.exports = readJSONFile;