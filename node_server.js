// ---------- Requires ---------- //

var http = require('http');
var fs = require('fs');


// ---------- Setup ---------- //

// The port to run the server on.
var PORT = 8080;

// An object containing all possible urls.
var URLS = JSON.parse(fs.readFileSync("urls.json", "utf8"));

// MIME types for files.
var MIME = {
	"html": "text/html",
	"css": "text/css"
}

// Dummy test data.
var TEST_DATA = "Hello World.";


// ---------- Functions ---------- //

// Gets a file from a corresponding url.
function getFile(request_url) {

	for (item in URLS) {
		if (URLS[item].url == request_url) {
			return URLS[item].file;
		};
	}

	return null;

}


// Returns an error response.
function error(code, response) {

	response.writeHead(code, {"Content-Type": "text/plain"});
	response.write(code + ", " + http.STATUS_CODES[code]);
	response.end();
	console.log("< " + code);

}


// Returns the contents of the requested file to the client.
function fileResponse(file, response) {

	// Gets file MIME type.
	var extension = file.split(".").pop();
	var type = MIME[extension];

	fs.readFile(file, "utf8", function(err, data) {

		if (err) {
			error(500, response);
		} else {
			response.writeHead(200, {"Content-Type": type});
			response.write(data);
			response.end();
		}

	});

}


// Responds with either the requested file, or a Not Found error.
function generateResponse(request, response) {

	var file = getFile(request.url);

	if (file != null) {
		fileResponse(file, response);
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


// ---------- Main ---------- //

// Creates a server object.
var server = http.createServer( function (request, response) {

	// Logs requests.
	console.log("> " + request.method + " " + request.url + " HTTP/" +
		request.httpVersion);
	// Handles requests.
	handleRequest(request, response);

});

// Loop listens on specified port.
server.listen(PORT);
console.log("\n** Server active on localhost:" + PORT);
