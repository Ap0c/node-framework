views = require('./views.js');

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

module.exports = function() {
	return urls;
}
