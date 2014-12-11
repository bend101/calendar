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
	fs.writeFileSync(fileName,JSON.stringify(req.body));
	res.json(200, {});
	console.log("end of save");

}

function onLoad(req,res)
{
	// Disable caching for content files
	console.log("start of load");

	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.setHeader('Content-Type', 'application/json');
	res.header("Pragma", "no-cache");
	res.header("Expires", 0);
	var fileName="calenders/"+req.query.name+".calender";

	try
	{
		var data = fs.readFileSync(fileName);
		console.log(data.toString());
		res.json(200, JSON.parse(data.toString()));
	}
	catch (err)
	{
		res.json(200, {});
	}
	console.log("end of load");

}
