// ---------- Requires ---------- //

var sqlite3 = require("sqlite3").verbose();
var DB_NAME = "mydb.db";


// ---------- Functions ---------- //

// Creates and returns a database object.
var connect = function (name) {

	var database = new sqlite3.Database(name);

	if ('error' in database) {
		return null;
	} else {
		return database;
	}

};


// Closes the database.
var close = function (database) {

	var closed = database.close();

	if ('error' in closed) {
		return false;
	} else {
		return true;
	}

};


var checkFinish = function (lock, onFinish) {

	lock--;
	if (lock === 0) {
		onFinish();
	}

};


// Runs a query on the database, calls an optional callback when done.
var runQueries = function (queries, onFinish) {

	var noQueries = queries.length;
	var lock = noQueries;

	var db = connect("mydb.db");

	db.serialize(function() {

		for (var i = 0; i < noQueries; i++) {
			var query = queries[i];
			if (query.type === "GET") {
				db.get(query.sql, function (err, data) {
					query.callback(data);
					checkFinish(lock, onFinish);
				});
			} else if (query.type === "RUN") {
				db.run(query.sql);
			}
		}

	});

	db.close();

};


// ---------- Module Exports ---------- //

module.exports = {
	runQueries: runQueries
};
