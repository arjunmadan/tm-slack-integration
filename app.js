var express = require('express');
var app = express();

app.get('/',function(req, res){
    var request = {
        text: req.body.text,
    };
    res.send("I got this: "+request.text);
});

app.listen(process.env.PORT || 3000);