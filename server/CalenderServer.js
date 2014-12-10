'use strict';
var express=require('express');
var bodyParser = require('body-parser');
var server=express();
var fs=require('fs');
var cors = require('cors');
server.use(cors());

server.use( bodyParser.json() );       // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));
//server.use(express.json());       // to support JSON-encoded bodies
//server.use(express.urlencoded());


//server.use(express.logger('dev'));

server.post('/calenderSave',onSave);
server.get('/calenderLoad',onLoad);

server.listen(3000,function()
{
	console.log("Server Ready");
});

function onSave(req,res)
{
	var fileName="calenders/"+req.query.name+".calender";
	console.log("onSave");
	console.log(req.body);
	fs.writeFileSync(fileName,JSON.stringify(req.body))
}

function onLoad(req,res)
{
	var fileName="calenders/"+req.query.name+".calender";

	var data=fs.readFileSync(fileName);
	console.log(data.toString());
	res.json(200, JSON.parse(data.toString()));
}
