// ---------- Requires ---------- //

var http = require('http');
var templates = require('./template.js');
var database = require('./database.js');


// ---------- Functions ---------- //

// Returns an error response.
var error = function (response, code) {

	response.writeHead(code, {"Content-Type": "text/plain"});
	response.write(code + ", " + http.STATUS_CODES[code]);
	response.end();
	console.log("< " + code);

};


// Passes the response data back to the user.
var writeResponse = function (response, code, type, data) {

	if (String(code).charAt(0) == '4' || String(code).charAt(0) == '5') {
		error(code, response);
	} else {
		response.writeHead(code, {"Content-Type": type});
		response.write(data);
		response.end();
	}

};


// Returns response data for simple plain text
var plain = function (response, words) {

	writeResponse(response, 200, "text/plain", words);

};


// Renders a template and returns page.
var render = function (response, name, variables) {

	templates.renderTemplate(name, variables, function(page) {

		if (page.success) {
			writeResponse(response, 200, "text/html", page.data);
		} else {
			error(response, 500);
		}

	});

};


// Renders a template with data taken from a database.
var renderWithData = function (response, name, variables, queries) {

	var onFinish = function () {
		render(response, name, variables);
	};

	database.runQueries(queries, onFinish);

};


// ---------- Module Exports ---------- //

module.exports = {
	error: error,
	writeResponse: writeResponse,
	plain: plain,
	render: render,
	renderWithData: renderWithData
};
