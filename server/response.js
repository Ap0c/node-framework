// ---------- Requires ---------- //

var http = require('http');
var fs = require('fs');
var templates = require('./template.js');


// ---------- Setup ---------- //

var TEMPLATE_DIR = "templates/"


// ---------- Functions ---------- //

// Returns an error response.
var error = function (response, code) {

	response.writeHead(code, {"Content-Type": "text/plain"});
	response.write(code + ", " + http.STATUS_CODES[code]);
	response.end();
	console.log("< " + code);

}


// Passes the response data back to the user.
var writeResponse = function (response, code, type, data) {

	if (String(code).charAt(0) == '4' || String(code).charAt(0) == '5') {
		error(code, response);
	} else {
		response.writeHead(code, {"Content-Type": type});
		response.write(data);
		response.end();
	}

}


// Returns response data for simple plain text
var plain = function (response, words) {

	writeResponse(response, 200, "text/plain", words);

}


// Passes a template through the rendering engine.
var returnTemplate = function (response, template, variables) {

	page = templates.renderTemplate(template, variables);

	if (page.success) {
		writeResponse(response, 200, "text/html", page.data);
	} else {
		error(response, 500);
	}

}


// Renders a template and returns page.
var render = function (response, name, variables) {

	name = TEMPLATE_DIR + name;

	fs.readFile(name, "utf8", function(err, template) {

		if (err) {
			error(response, 500);
		} else {
			returnTemplate(response, template, variables);
		}

	});


}


// ---------- Module Exports ---------- //

module.exports = {
	error: error,
	writeResponse: writeResponse,
	plain: plain,
	render: render
}

