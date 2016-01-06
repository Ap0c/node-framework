// ---------- Requires ---------- //

var responses = require('./server/response.js');
var database = require('./server/database.js');


// ---------- View Functions ---------- //

// Index page.
exports.index = function (response) {

	responses.plain(response, "Homepage");

};

// First test.
exports.test = function (response) {

	var contents = {var_one: "World", var_two: "Tres."};

	responses.render(response, "test.html", contents);

};

// Second test.
exports.testTwo = function (response) {

	var contents = {var_one: "World"};

	responses.render(response, "testTwo.html", contents);

};

// Third test.
exports.testThree = function (response) {

	var contents = {var_one: "blah"};

	responses.render(response, "testThree.html", contents);

};

// Fourth test.
exports.testFour = function (response) {

	var contents = {var_one: "blah"};

	var queries = [

		{
			type: "GET",
			sql: "SELECT * FROM test",
			callback: function (row) {
				contents.surname = row.surname;
				contents.name = row.name;
			}
		}

	];

	responses.renderWithData(response, "testFour.html", contents, queries);

};
