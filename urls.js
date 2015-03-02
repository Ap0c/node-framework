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

	"/docs/": {
		"shortName": "docs",
		"view": views.docs
	},

	"/test/": {
		"shortName": "test",
		"view": views.test
	},

	"/testTwo/": {
		"shortName": "testTwo",
		"view": views.testTwo
	},

	"/testThree/": {
		"shortName": "testThree",
		"view": views.testThree
	},

	"/testFour/": {
		"shortName": "testFour",
		"view": views.testFour
	}

};


// ---------- Module Exports ---------- //

module.exports = function() {
	return urls;
};
