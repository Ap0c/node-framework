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


// If all queries and callbacks are done, run the finish function.
var checkFinish = function (lock, onFinish) {

	lock--;
	if (lock === 0 && onFinish !== undefined) {
		onFinish();
	}

};


// Runs a specific query, depending on its type.
var runQuery = function (db, query, lock, onFinish) {

	var succes = true;

	if (query.type === "GET") {

		db.get(query.sql, function (err, data) {
			if (err) {
				success = false;
			} else {
				query.callback(data);
				checkFinish(lock, onFinish);
			}
		});

	} else if (query.type === "RUN") {
		db.run(query.sql);
	}

	return success;

};


// Runs a query on the database, calls an optional callback when done.
var runQueries = function (queries, onFinish) {

	var noQueries = queries.length;
	var lock = noQueries;
	var success = true;

	var db = connect("mydb.db");

	if (db === null) {
		return false;
	}

	db.serialize(function() {

		var i = 0;
		while (i < noQueries && success === true) {
			var query = queries[i];
			success = runQuery(db, query, lock, onFinish);
			i++;
		}

	});

	db.close();

	return success;

};


// ---------- Module Exports ---------- //

module.exports = {
	runQueries: runQueries
};
