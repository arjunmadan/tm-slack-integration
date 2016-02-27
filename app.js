var express = require('express');
var request = require('request');

var app = express();

app.get('/',function(req, res){

	var parameter;
	var tempEvent = {};
	var resp = [];
	var slackRequest = {
		text: req.query.text,
		response_url: req.query.response_url
	};

	if(slackRequest.text) {
		parameter = slackRequest.text.split(" ");
	}
	var url = 'https://app.ticketmaster.com/discovery/v1/events.json?postalCode=' + parameter[1] + '&apikey=' + process.env.TM_API_KEY + '&keyword=' + parameter[2];
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var result = JSON.parse(body);
			for (var it in result._embedded.events) {
				tempEvent.title = result._embedded.events[it].name;
				tempEvent.title_link = 'http://www.ticketmaster.com/event/' + result._embedded.events[it].id;
				tempEvent.text = result._embedded.events[it]._embedded.venue[0].name + ' on ' + result._embedded.events[it].dates.start.localDate + '\n'
				resp.push(tempEvent);
			}
			resultJSON = {
				text: 'List of events:',
				attachments: resp
			}
			console.log(JSON.stringify(resultJSON));
			request.post({
				url: slackRequest.response_url,
				headers: 'Content-type: application/json',
				body: JSON.stringify(resultJSON) 
			}, function (error, response, body) {
				if(!error && response.statusCode == 200) {
					console.log("Success!");
				}
				else if(error){
					console.log(error);
				}
				else {
					console.log(body);
					console.log(response.statusCode);
				}
			});
		}
		else {
			//send back a string with an error
			console.log(error);
		}
	});
	res.send("Processing");
});

app.listen(process.env.PORT || 3000);