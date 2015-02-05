// ---------- Requires ---------- //

var http = require('http');
var fs = require('fs');
var urls = require('./urls.js');


// ---------- Setup ---------- //

// The port to run the server on.
var PORT = 8080;

// The server configuration file.
var CONFIG = JSON.parse(fs.readFileSync("config.json", "utf8"));

// An object containing all possible urls.
var URLS = urls();

// The length of the static url string.
var staticUrlLen = CONFIG.staticUrl.length;

// MIME types for files.
var MIME = {
	"html": "text/html",
	"css": "text/css",
	"js": "application/javascript",
	"png": "image/png",
	"jpeg": "image/jpeg",
	"gif": "image/gif"
}


// ---------- Functions ---------- //

// Returns an error response.
function error(code, response) {

	response.writeHead(code, {"Content-Type": "text/plain"});
	response.write(code + ", " + http.STATUS_CODES[code]);
	response.end();
	console.log("< " + code);

}


// Sends the contents of a static file back to the user.
function serveStatic(path, response) {

	// Gets file MIME type.
	var extension = path.split(".").pop();
	var type = MIME[extension];

	fs.readFile(path, "utf8", function(err, data) {

		if (err) {
			error(404, response);
		} else {
			response.writeHead(200, {"Content-Type": type});
			response.write(data);
			response.end();
		}

	});

}


// Returns the contents of the requested page to the client.
function pageResponse(url, response) {

	if (url in URLS) {
		URLS[url]["view"](response);
	} else {
		error(404, response);
	}

}


// Responds with either a static file or a full page.
function generateResponse(request, response) {

	var url = request.url;

	if (url.substring(0, staticUrlLen) == CONFIG.staticUrl) {

		path = CONFIG.staticRoot + url.substring(staticUrlLen);
		serveStatic(path, response);

	} else {

		pageResponse(url, response);

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
