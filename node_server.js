// ---------- Requires ---------- //

var http = require('http');
var fs = require('fs');


// ---------- Setup ---------- //

// The port to run the server on.
var PORT = 8080;

// Dummy test data.
var TEST_DATA = "Hello World.";

// HTTP error codes.
var err_codes = {
	200: "OK",
	404: "Not Found",
	405: "Method Not Allowed"
}


// ---------- Main ---------- //

// Gets an HTML file from a corresponding url.
function getFile(request_url) {

	var data = fs.readFileSync("urls.json", "utf8");
	var urls = JSON.parse(data);

	for (item in urls) {
		if (urls[item].url == request_url) {
			return urls[item].file;
		};
	}

	return null;

}


// Returns an error response.
function error(code, response) {

	response.writeHead(code, {"Content-Type": "text/plain"});
	response.write(code + ", " + err_codes[code]);
	response.end();

}


// Sends either the response or an error.
function generateResponse(request, response) {

	var file = getFile(request.url);

	if (file != null) {
		fs.readFile(file, "utf8", function(error, data) {
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(data);
			response.end();
		});
	} else {
		error(404, response);
	}

}


// Returns a response based upon the request method.
function handleRequest(request, response) {

	switch (request.method) {
		case "GET":
			generateResponse(request, response);
			break;
		default:
			error(405, response);
	}

}


// Creates a server object.
var server = http.createServer( function (request, response) {

	handleRequest(request, response);

});

server.listen(PORT);
console.log("Server active on localhost:" + PORT);
