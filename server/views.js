exports.index = function (response) {

	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Homepage.");
	response.end();

}


exports.test = function (response) {

	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Test page.");
	response.end();

}
