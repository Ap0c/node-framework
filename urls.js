// ---------- Requires ---------- //

views = require('./views.js');


// ---------- URLs ---------- //

urls = {

	"/index/": {
		"shortName": "index",
		"view": views.index
	},

	"/": {
		"shortName": "index",
		"view": views.index
	},

	"/test/": {
		"shortName": "index",
		"view": views.test
	}

}


// ---------- Module Exports ---------- //

module.exports = function() {
	return urls;
}
