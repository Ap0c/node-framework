// ---------- Requires ---------- //

var sqlite3 = require("sqlite3").verbose();


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

