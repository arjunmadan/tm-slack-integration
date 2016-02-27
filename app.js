var express = require('express');
var app = express();

app.get('/',function(req, res){
    console.log(req)
    var request = {
        text: req.query.text
    };
    console.log("About to send the response");
    res.send("I got this: "+request.text);
});

app.listen(process.env.PORT || 3000);