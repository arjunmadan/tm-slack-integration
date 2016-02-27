var express = require('express');
var request = require('request');

var app = express();

app.get('/',function(req, res){

    var parameter;
    var resp;
    var slackRequest = {
        text: req.query.text
    };

    if(request.text) {
    	parameter = slackRequest.text.split(" ");
    }
    var url = 'https://app.ticketmaster.com/discovery/v1/events.json?postalCode=' + parameter[1] + '&apikey=' + process.env.TM_API_KEY + '&keyword=' + parameter[2];
    request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(body);
			//format response (resp)
		}
		else {
			//send back a string with an error
			console.log(error);
		}
	});


    res.send("I got this: "+slackRequest.text);
});

app.listen(process.env.PORT || 3000);