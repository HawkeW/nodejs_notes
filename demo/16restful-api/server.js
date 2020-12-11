const express = require('express');
const app = express();
var router = express.Router()
const fs = require("fs");

route();

const server = app.listen(8081, ()=>{
	var host = server.address().address
	var port = server.address().port
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})


exports.start = start;