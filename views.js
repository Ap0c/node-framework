// ---------- Requires ---------- //

var responses = require('./server/response.js');
var database = require('./server/database.js');


// ---------- View Functions ---------- //

exports.index = function (response) {

	responses.plain(response, "Homepage");

};


exports.test = function (response) {

	var contents = {var_one: "World", var_two: "Tres."};

	responses.render(response, "test.html", contents);

};


exports.testTwo = function (response) {

	var contents = {var_one: "World"};

	responses.render(response, "testTwo.html", contents);

};


exports.testThree = function (response) {

	var contents = {var_one: "cheese"};

	responses.render(response, "testThree.html", contents);

};


exports.testFour = function (response) {

	var contents = {var_one: "cheese"};

	var db = database.connect("mydb.db");

	var query = function() {
		db.get("SELECT * FROM test", function (err, row) {
			contents.name = row.name;
		});
	};

	responses.renderWithData(response, "testFour.html", contents, db, query);

};
