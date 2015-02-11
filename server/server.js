// ---------- Requires ---------- //

var http = require('http');
var fs = require('fs');
var responses = require('./response.js');
var urls = require('./urls.js');


// ---------- Setup ---------- //

// The port to run the server on.
var PORT = 8080;

// The server configuration file.
var CONFIG = JSON.parse(fs.readFileSync("server/config.json", "utf8"));

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

// Sends the contents of a static file back to the user.
var serveStatic = function (path, response) {

	// Gets file MIME type.
	var extension = path.split(".").pop();
	var type = MIME[extension];

	fs.readFile(path, "utf8", function(err, data) {

		if (err) {
			responses.error(response, 404);
		} else {
			responses.writeResponse(200, response, type, data);
		}

	});

}


// Returns the contents of the requested page to the client.
var servePage = function (url, response) {

	if (url in URLS) {
		URLS[url]["view"](response);
	} else {
		responses.error(response, 404);
	}

}


// Responds with either a static file or a full page.
var generateResponse = function (request, response) {

	var url = request.url;

	if (url.substring(0, staticUrlLen) == CONFIG.staticUrl) {

		path = CONFIG.staticRoot + url.substring(staticUrlLen);
		serveStatic(path, response);

	} else {

		servePage(url, response);

	}

}


// Returns a response based upon the request method.
var handleRequest = function (request, response) {

	switch (request.method) {
		case "GET":
			generateResponse(request, response);
			break;
		default:
			responses.error(response, 405);
	}

}


// Launches the server in a loop.
var launch = function (PORT) {

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

}


// ---------- Module Exports ---------- //

module.exports = {
	launch: launch
}
