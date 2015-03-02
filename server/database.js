// ---------- Requires ---------- //

var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");


// ---------- Setup ---------- //

var CONFIG = JSON.parse(fs.readFileSync("config.json", "utf8"));
var DB_NAME = CONFIG.databaseName;


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


// Handles the situation where data is retrieved.
var processData = function (db, query, lock, onFinish, success) {

	db.get(query.sql, function (err, data) {

		if (err) {
			success = false;
		} else {
			query.callback(data);
			checkFinish(lock, onFinish);
		}

	});

};


// Runs a specific query, depending on its type.
var runQuery = function (db, query, lock, onFinish) {

	var success = true;

	if (query.type === "GET") {
		processData(db, query, lock, onFinish, success);
	} else if (query.type === "RUN") {
		db.run(query.sql);
	}

	return success;

};


// Runs a set of queries on the database.
var processQueries = function (db, queries, noQueries, lock, onFinish) {

	var success = true;

	db.serialize(function() {

		var i = 0;

		while (i < noQueries && success === true) {
			var query = queries[i];
			success = runQuery(db, query, lock, onFinish);
			i++;
		}

	});

	return success;

};


// Opens up a database connection and runs queries.
var runQueries = function (queries, onFinish) {

	var noQueries = queries.length;
	var lock = noQueries;

	var db = connect("mydb.db");

	if (db === null) {
		return false;
	}

	var success = processQueries(db, queries, noQueries, lock, onFinish);

	db.close();

	return success;

};


// ---------- Module Exports ---------- //

module.exports = {
	runQueries: runQueries
};
