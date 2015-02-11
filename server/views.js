// ---------- Requires ---------- //

var responses = require('./response.js');


// ---------- View Functions ---------- //

exports.index = function (response) {

	responses.plain(response, "Homepage");

}


exports.test = function (response) {

	responses.render(response, "test.html", null);

}
