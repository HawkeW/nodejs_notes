var http = require("http");
var url = require("url");

function start(route){
	function onRequest(req, res){
		var pathname = url.parse(req.url).pathname;
		if(pathname == '/favicon.ico') return; 
		console.log("Request for " + pathname + " received");

		route(pathname);
		
		res.writeHead(200, {"Content-type": "text/plain"});
		res.write("Hello world!");
		res.end();
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started");
}

exports.start = start;