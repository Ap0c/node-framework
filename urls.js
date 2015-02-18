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
		"shortName": "test",
		"view": views.test
	},

	"/testTwo/": {
		"shortName": "testTwo",
		"view": views.testTwo
	}

}


// ---------- Module Exports ---------- //

module.exports = function() {
	return urls;
}
