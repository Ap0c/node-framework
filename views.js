// ---------- Requires ---------- //

var responses = require('./server/response.js');


// ---------- View Functions ---------- //

exports.index = function (response) {

	responses.plain(response, "Homepage");

}


exports.test = function (response) {

	var contents = {var_one: "World", var_two: "Tres."};

	responses.render(response, "test.html", contents);

}


exports.testTwo = function (response) {

	var contents = {var_one: "World"};

	responses.render(response, "testTwo.html", contents);

}


exports.testThree = function (response) {

	var contents = {var_one: "cheese"};

	responses.render(response, "testThree.html", contents);

}
